import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function DebugPage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  let profile = null
  if (session) {
    const { data } = await supabase.from("profiles").select().eq("id", session.user.id).single()
    profile = data
  }

  return (
    <div className="container max-w-md mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Debug-Informationen</CardTitle>
          <CardDescription>Aktuelle Authentifizierungs- und Datenbankstatus</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Authentifizierungsstatus:</h3>
            <pre className="bg-muted p-2 rounded text-xs overflow-auto">
              {JSON.stringify({ session: session ? "Angemeldet" : "Nicht angemeldet" }, null, 2)}
            </pre>
          </div>

          {session && (
            <div>
              <h3 className="font-medium mb-2">Benutzer-Informationen:</h3>
              <pre className="bg-muted p-2 rounded text-xs overflow-auto">
                {JSON.stringify(
                  {
                    id: session.user.id,
                    email: session.user.email,
                    role: session.user.role,
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          )}

          {profile && (
            <div>
              <h3 className="font-medium mb-2">Profil-Informationen:</h3>
              <pre className="bg-muted p-2 rounded text-xs overflow-auto">{JSON.stringify(profile, null, 2)}</pre>
            </div>
          )}

          <div className="flex flex-col space-y-2 pt-4">
            <Link href="/">
              <Button variant="outline" className="w-full">
                Zurück zur App
              </Button>
            </Link>
            <Link href="/setup">
              <Button variant="outline" className="w-full">
                Zum Setup
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
