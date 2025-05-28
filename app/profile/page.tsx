import {createClient} from "@/lib/supabase/server"
import {redirect} from "next/navigation"
import {ProfileForm} from "@/components/profile/profile-form"
import {updateProfile} from "@/actions/profile"
import {SignOutButton} from "@/components/auth/sign-out-button"
import {Profile} from "@/lib/supabase/database.types";
import Image from "next/image";

export default async function ProfilePage() {
    const supabase = createClient()
    const {
        data: {session},
    } = await supabase.auth.getSession()

    if (!session) {
        redirect("/auth/login")
    }

    const {data: profile} = await supabase.from("profiles").select().eq("id", session.user.id).single<Profile>()

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3">
                <Image
                    src="/images/icon.svg"
                    alt="Ikarus Festival Logo"
                    width={36}
                    height={36}
                    className="h-[3em] w-auto align-middle"
                />
                <h1 className="text-2xl font-bold">Mein Profil</h1>
                <SignOutButton/>
            </div>
            <div className="w-full flex flex-col justify-center pt-10">
                <ProfileForm profile={profile} updateProfile={updateProfile}/>
            </div>
        </div>
    )
}
