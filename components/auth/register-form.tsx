"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {generateAvatarBase64} from "@/util/avatar-utils";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const username = formData.get("username") as string

    try {
      // Direkte Registrierung mit Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            username,
          },
        },
      })

      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }

      // Prüfen, ob der Benutzer bereits existiert
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError("Diese E-Mail-Adresse wird bereits verwendet")
        setIsLoading(false)
        return
      }

      // Username in die Profile-Tabelle einfügen
      if (data.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([{
            id: data.user.id,
            username: username,
            avatar_url: generateAvatarBase64(username),
            email: email
          }])

        if (profileError) {
          setError("Profil konnte nicht gespeichert werden: " + profileError.message)
          setIsLoading(false)
          return
        }
      }

      setSuccess("Konto erstellt!")
      setIsLoading(false)

      // Für Entwicklungszwecke: Automatisch anmelden und weiterleiten
      if (process.env.NODE_ENV === "development") {
        // Warte kurz, damit der Benutzer die Erfolgsmeldung sehen kann
        setTimeout(() => {
          router.push("/auth/login?message=" + encodeURIComponent("Konto erstellt! Du kannst dich jetzt anmelden."))
        }, 2000)
      }
    } catch (err: any) {
      console.error("Registrierungsfehler:", err)
      setError(err.message || "Ein Fehler ist aufgetreten")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Benutzername</Label>
        <Input id="username" name="username" type="text" placeholder="dein_username" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">E-Mail</Label>
        <Input id="email" name="email" type="email" placeholder="deine@email.de" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Passwort</Label>
        <Input id="password" name="password" type="password" placeholder="••••••••" required minLength={6} />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">{success}</div>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Wird registriert..." : "Registrieren"}
      </Button>

      <div className="text-center text-sm">
        <p>
          Bereits ein Konto?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Anmelden
          </Link>
        </p>
      </div>
    </form>
  )
}
