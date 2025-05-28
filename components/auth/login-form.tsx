"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function signInAnonymously() {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInAnonymously()
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
      console.log("Anonym angemeldet:", data)
      router.push("/")
      router.refresh()
    } catch (err: any) {
      console.error("Anonyme Anmeldung fehlgeschlagen:", err)
      setError(err.message || "Ein Fehler ist aufgetreten")
      setIsLoading(false)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const identifier = formData.get("email") as string // can be email or username
    const password = formData.get("password") as string

    let email = identifier
    try {
      // If identifier is not an email, look up email by username
      if (!identifier.includes("@")) {
        // Get email from profiles by username
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("email")
          .eq("username", identifier)
          .single()
        if (profileError || !profile?.email) {
          setError("Benutzername oder E-Mail nicht gefunden")
          setIsLoading(false)
          return
        }
        email = profile.email
      }

      // Direkte Anmeldung mit Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }

      // Erfolgreich angemeldet, zur Startseite weiterleiten
      console.log("Erfolgreich angemeldet, leite weiter...")
      router.push("/")
      router.refresh()
    } catch (err: any) {
      console.error("Anmeldefehler:", err)
      setError(err.message || "Ein Fehler ist aufgetreten")
      setIsLoading(false)
    }
  }

  return <>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-Mail</Label>
        <Input className="placeholder:opacity-70" id="email" name="email" type="email" placeholder="deine@email.de oder Nutzername" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Passwort</Label>
        <Input className="placeholder:opacity-70" id="password" name="password" type="password" placeholder="••••••••" required />
      </div>

      {error && <div className="text-destructive-foreground text-sm">{error}</div>}

      <div className="py-4 w-full flex justify-center">
        <Button type="submit" variant="outline" disabled={isLoading}>
          {isLoading ? "Wird angemeldet..." : "Jetzt anmelden"}
        </Button>
      </div>

      <div className="text-center text-sm">
        <p>
          Noch kein Konto?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Registrieren
          </Link>
        </p>
      </div>
    </form>
    { process.env.NEXT_PUBLIC_ENABLE_ANONYMOUS_LOGIN && <div className="py-4 w-full flex justify-center">
        <Button onClick={signInAnonymously} variant="outline" disabled={isLoading}>
            {isLoading ? "Wird angemeldet..." : "Anonym anmelden"}
        </Button>
    </div>}
  </>
}
