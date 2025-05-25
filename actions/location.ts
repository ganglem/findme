"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateLocation(stageId: number) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  // Vorherige Standorte löschen
  await supabase.from("user_locations").delete().eq("user_id", user.id)

  // Neuen Standort hinzufügen
  const { error } = await supabase.from("user_locations").insert({
    user_id: user.id,
    stage_id: stageId,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/live")
  return { success: true }
}

export async function getUserLocations() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("user_locations")
    .select(`
      user_id,
      stage_id,
      profiles:user_id (
        username,
        avatar_url
      ),
      stages:stage_id (
        name
      )
    `)
    .order("timestamp", { ascending: false })

  if (error) {
    console.error("Error fetching user locations:", error)
    return { locations: [] }
  }

  return { locations: data }
}
