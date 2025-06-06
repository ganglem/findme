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

export async function getAllFavoritesForDay(day: string): Promise<Record<number, { id: string; username: string; avatarUrl: string}[]>> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from("acts")
    .select("id")
    .eq("day", day)

  if (error) {
    console.error("Error fetching acts for day:", error)
    return []
  }

  if (!data || data.length === 0) {
    console.warn("No acts found for the specified day.")
    return []
  }

  const actIds = data.map((act) => act.id)

  const { data: favoritesData, error: favoritesError } = await supabase
    .from("user_favorites")
    .select("user_id, act_id")
    .in("act_id", actIds)
    .neq("user_id", user.id)

  if (favoritesError) {
    console.error("Error fetching favorites for day:", favoritesError)
    return []
  }

  if (!favoritesData || favoritesData.length === 0) {
      console.warn("No favorites found for the specified day.")
      return []
  }

  const userIds = favoritesData.map((fav) => fav.user_id)

  const { data: usersData, error: usersError } = await supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .in("id", userIds)

  if (usersError) {
      console.error("Error fetching users for favorites:", usersError)
      return []
  }

  const favoritesByAct: Record<number, { id: string; username: string; avatarUrl: string}[]> = {}

  favoritesData.forEach((fav) => {
      if (!favoritesByAct[fav.act_id]) {
        favoritesByAct[fav.act_id] = []
      }
      const user = usersData.find((u) => u.id === fav.user_id)
      if (user) {
        favoritesByAct[fav.act_id].push({
            id: user.id,
            username: user.username,
            avatarUrl: user.avatar_url || "",
        })
      }
  })

  return favoritesByAct
}
