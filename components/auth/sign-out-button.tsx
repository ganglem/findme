"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Abmeldefehler:", error)
      return
    }

    router.push("/auth/login")
    router.refresh()
  }

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Abmelden
    </Button>
  )
}
