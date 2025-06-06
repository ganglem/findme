import {createClient} from "@/lib/supabase/server"
import {redirect} from "next/navigation"
import {ProfileForm} from "@/components/profile/profile-form"
import {updateProfile} from "@/actions/profile"
import {Profile} from "@/lib/supabase/database.types";

export default async function ProfilePage() {
    const supabase = await createClient()
    const {
        data: {user},
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    const {data: profile} = await supabase.from("profiles").select().eq("id", user.id).single<Profile>()

    return <ProfileForm profile={profile} updateProfile={updateProfile}/>
}
