"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Profile } from "@/lib/supabase/database.types"
import { Upload } from "lucide-react"
import deleteUser from "@/actions/delete-user";
import {useRouter} from "next/navigation";
import {createClient} from "@/lib/supabase/client";

interface ProfileFormProps {
  profile: Profile
  updateProfile: (formData: FormData) => Promise<{ error?: string; success?: boolean }>
}

export function ProfileForm({ profile, updateProfile }: ProfileFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile?.avatar_url)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(event.currentTarget)

    // Füge die aktuelle Avatar-URL hinzu
    if (avatarUrl) {
      formData.append("avatarUrl", avatarUrl)
    }

    const result = await updateProfile(formData).catch((error) => {
      if (error.message.includes("Body exceeded 1 MB limit.")) {
        setError("Das hochgeladene Bild ist zu groß. Bitte wähle ein kleineres Bild.")
        setIsLoading(false)
      }
    })

    if (result?.error) {
      setError(result.error)
    } else if (result?.success) {
      setSuccess(true)
    }

    setIsLoading(false)
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-16 space-y-10">

      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={avatarUrl || undefined} alt={profile?.username || "Avatar"} />
          <AvatarFallback>{profile?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
        </Avatar>

        <div className="relative w-full">
          <Input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <Label
              htmlFor="avatar"
              className="flex items-center justify-center px-3 py-1.5 text-base border-4 rounded-none cursor-pointer hover:bg-transparent hover:opacity-70"
          >
            <Upload className="w-6 h-6 mr-2" />
            Profilbild ändern
          </Label>

        </div>
      </div>


        <div>
          <Label htmlFor="username">Benutzername</Label>
          <Input id="username" className="placeholder:opacity-70" name="username" defaultValue={profile?.username || ""} placeholder="dein_username" />
        </div>


      {error && <div className="bg-destructive text-sm">{error}</div>}

      {success && <div className="text-success-foreground text-sm">Profil erfolgreich aktualisiert!</div>}

      <div className="justify-center items-center flex flex-col space-y-6 py-4">
        <Button type="submit" className="w-full" variant="outline" disabled={isLoading}>
          {isLoading ? "Wird gespeichert..." : "Profil speichern"}
        </Button>

        <Button
          type="button"
          variant="destructive"
          className="w-full"
          onClick={async () => {
            if (window.confirm("Bitte bestätigen: Möchtest du dein Profil wirklich löschen?")) {
              setIsLoading(true)
              setError(null)
              try {
                const supabase = createClient()
                const { signOutError } = await supabase.auth.signOut()
                if (signOutError) {
                  throw new Error("Fehler beim Abmelden: " + signOutError.message)
                }
                deleteUser(profile.id).then(() => {
                  router.push("/auth/login?message=" + encodeURIComponent("Profil gelöscht."))
                  router.refresh()
                }).catch((error) => {
                  setError("Fehler beim Löschen des Profils: " + error.message)
                })
              } catch (err: any) {
                setError(err.message || "Unbekannter Fehler beim Löschen.")
              }
              setIsLoading(false)
            }
          }}
        >
          Profil löschen
        </Button>
      </div>

    </form>
  )
}
