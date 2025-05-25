"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Profile } from "@/lib/supabase/database.types"
import { Upload } from "lucide-react"

interface ProfileFormProps {
  profile: Profile
  updateProfile: (formData: FormData) => Promise<{ error?: string; success?: boolean }>
  uploadAvatar: (file: File) => Promise<{ error?: string; url?: string }>
}

export function ProfileForm({ profile, updateProfile, uploadAvatar }: ProfileFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile?.avatar_url)

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

    const result = await updateProfile(formData)

    if (result?.error) {
      setError(result.error)
    } else if (result?.success) {
      setSuccess(true)
    }

    setIsLoading(false)
  }

  async function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }

    const file = event.target.files[0]
    setIsLoading(true)

    const result = await uploadAvatar(file)

    if (result?.error) {
      setError(result.error)
    } else if (result?.url) {
      setAvatarUrl(result.url)
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={avatarUrl || undefined} alt={profile?.username || "Avatar"} />
          <AvatarFallback>{profile?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
        </Avatar>

        <div className="relative">
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
            className="flex items-center justify-center px-4 py-2 text-sm border rounded-md cursor-pointer hover:bg-accent"
          >
            <Upload className="w-4 h-4 mr-2" />
            Profilbild ändern
          </Label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Benutzername</Label>
          <Input id="username" name="username" defaultValue={profile?.username || ""} placeholder="dein_username" />
        </div>

        
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {success && <div className="text-green-500 text-sm">Profil erfolgreich aktualisiert!</div>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Wird gespeichert..." : "Profil speichern"}
      </Button>
    </form>
  )
}
