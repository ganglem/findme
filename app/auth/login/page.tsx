import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"

interface LoginPageProps {
  searchParams: { message?: string }
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-none border-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Anmelden</h1>
          <p className="text-muted-foreground mt-2">Melde dich bei Find.me an</p>
          {searchParams.message && <p className="text-green-500 mt-2">{searchParams.message}</p>}
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
