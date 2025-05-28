import {createClient} from "@/lib/supabase/server"
import {redirect} from "next/navigation"
import {LoginForm} from "@/components/auth/login-form"
import Image from "next/image";
import Link from "next/link";

interface LoginPageProps {
    searchParams: { message?: string }
}

export default async function LoginPage({searchParams}: LoginPageProps) {
    const supabase = createClient()
    const {
        data: {session},
    } = await supabase.auth.getSession()

    if (session) {
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
                    <h1 className="text-2xl font-bold">Anmelden</h1>
                    <p className="text-secondary-foreground mt-2">Melde dich bei Find.me an</p>
                    {searchParams.message && <p className="text-success-foreground mt-2">{searchParams.message}</p>}
                </div>
                <LoginForm/>
            </div>
        </div>
    )
}
