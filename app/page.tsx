import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Radio, User } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function Home() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Debugging-Informationen
  console.log("Home Page - Session:", !!session)

  if (!session) {
    console.log("Keine Session gefunden, leite zum Login weiter...")
    redirect("/auth/login")
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 pt-8">
      <div className="text-center">
        <Image
          src="/icon.svg?height=150&width=150&query=ikarus+festival+logo"
          alt="Ikarus Festival Logo"
          width={150}
          height={150}
          className="mx-auto mb-4"
        />
        <h1 className="text-8xl font-bold mb-2">Find.me</h1>
        <p className="text-muted-foreground text-lg">Dein Guide für das Ikarus Festival</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <Link href="/timetable" className="w-full">
          <Button variant="outline" className="w-full h-32 flex flex-col">
            <Calendar className="h-12 w-12 mb-2" />
            <span>Timetable</span>
          </Button>
        </Link>

        <Link href="/live" className="w-full">
          <Button variant="outline" className="w-full h-32 flex flex-col">
            <Radio className="h-12 w-12 mb-2" />
            <span>Live Tracker</span>
          </Button>
        </Link>

        <Link href="/profile" className="w-full col-span-2">
          <Button variant="outline" className="w-full h-24 flex flex-col">
            <User className="h-12 w-12 mb-2" />
            <span>Mein Profil</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
