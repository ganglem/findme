import {createClient} from "@/lib/supabase/server"
import {redirect} from "next/navigation"
import {RegisterForm} from "@/components/auth/register-form"
import Link from "next/link";
import Image from "next/image";

export default async function RegisterPage() {
    const supabase = await createClient()
    const {
        data: {user},
    } = await supabase.auth.getUser()

    if (user) {
        redirect("/")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 pt-8">
            <div className="text-center">
                <Link href="/" className="inline-block">
                    <Image
                        src="/images/icon.svg"
                        alt="Ikarus Festival Logo"
                        width={150}
                        height={150}
                        className="mx-auto mb-4 cursor-pointer"
                    />
                    <h1 className="text-7xl sm:text-8xl font-bold mb-2 cursor-pointer">Find.me</h1>
                </Link>
                <p className="text-foreground text-md sm:text-lg">Dein Guide für das Ikarus Festival</p>
            </div>
            <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-none border-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Registrieren</h1>
                    <p className="text-muted-foreground mt-2">Erstelle ein Konto bei Find.me</p>
                </div>
                <RegisterForm/>
            </div>
        </div>
    )
}
