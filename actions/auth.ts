"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function signUp(formData: FormData) {
  const supabase = createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const username = formData.get("username") as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
      data: {
        username,
      },
    },
  })

  if (error) {
    console.error("Signup error:", error)
    return { error: error.message }
  }

  // Prüfen, ob der Benutzer bereits existiert
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return { error: "Diese E-Mail-Adresse wird bereits verwendet" }
  }

  // Für Entwicklungszwecke: Automatisch bestätigen
  if (process.env.NODE_ENV === "development") {
    try {
      // Manuell ein Profil erstellen, falls der Trigger nicht funktioniert
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user?.id,
        username,
        full_name: null,
        avatar_url: null,
      })

      if (profileError && !profileError.message.includes("duplicate key")) {
        console.error("Profile creation error:", profileError)
      }
    } catch (err) {
      console.error("Manual profile creation error:", err)
    }
  }

  revalidatePath("/")
  return { success: true, message: "Konto erstellt! Bitte überprüfe deine E-Mails zur Bestätigung." }
}

export async function signIn(formData: FormData) {
  const supabase = createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Signin error:", error)
    return { error: error.message }
  }

  revalidatePath("/")
  return { success: true }
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Signout error:", error)
    return { error: error.message }
  }

  revalidatePath("/")
  return { success: true }
}
