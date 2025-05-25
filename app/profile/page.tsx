import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/profile/profile-form"
import { updateProfile, uploadAvatar } from "@/actions/profile"
import { SignOutButton } from "@/components/auth/sign-out-button"

export default async function ProfilePage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select().eq("id", session.user.id).single()

  return (
    <div className="space-y-8 flex-col flex">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mein Profil</h1>
        <SignOutButton />
      </div>
      <div className="w-full lex flex-col justify-center pt-10">
        <ProfileForm profile={profile} updateProfile={updateProfile} uploadAvatar={uploadAvatar} />
      </div>
    </div>
  )
}
