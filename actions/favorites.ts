"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function toggleFavorite(actId: number) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  // Prüfen, ob der Act bereits ein Favorit ist
  const { data: existingFavorite } = await supabase
    .from("user_favorites")
    .select()
    .eq("user_id", user.id)
    .eq("act_id", actId)
    .single()

  if (existingFavorite) {
    // Favorit entfernen
    const { error } = await supabase.from("user_favorites").delete().eq("user_id", user.id).eq("act_id", actId)

    if (error) {
      return { error: error.message }
    }
  } else {
    // Favorit hinzufügen
    const { error } = await supabase.from("user_favorites").insert({
      user_id: user.id,
      act_id: actId,
    })

    if (error) {
      return { error: error.message }
    }
  }

  revalidatePath("/timetable")
  return { success: true }
}

export async function getFavorites() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { favorites: [] }

  const { data, error } = await supabase.from("user_favorites").select("act_id").eq("user_id", user.id)

  if (error) {
    console.error("Error fetching favorites:", error)
    return { favorites: [] }
  }

  return { favorites: data.map((fav) => fav.act_id) }
}

export async function getUsersWhoFavoritedAct(actId: number): Promise<{ id: string; username: string; avatarUrl: string}[]> {
  const supabase = await createClient()

  const {
      data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data: favoritedData, error } = await supabase
      .from("user_favorites")
      .select("user_id")
      .eq("act_id", actId)

  if (error) {
      console.error("Error fetching users who favorited act:", error)
      return []
  }

  const userIds = favoritedData.map((fav) => fav.user_id)

  const { data: usersData, error: usersError } = await supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .in("id", userIds)

  if (usersError) {
      console.error("Error fetching users:", usersError)
      return []
  }

  if (!usersData || usersData.length === 0) {
      console.warn("No users found who favorited this act.")
      return []
  }

  return usersData.map((user) => ({
    id: user.id,
    username: user.username,
    avatarUrl: user.avatar_url
  }))
}
