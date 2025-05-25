import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Erstelle eine Antwort und einen Supabase-Client
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Hole die aktuelle Session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Definiere geschützte und öffentliche Routen
  const isAuthRoute = req.nextUrl.pathname.startsWith("/auth")
  const isSetupRoute = req.nextUrl.pathname.startsWith("/setup")
  const isApiRoute = req.nextUrl.pathname.startsWith("/api")
  const isPublicRoute = isAuthRoute || isSetupRoute || isApiRoute || req.nextUrl.pathname === "/"

  // Debugging-Informationen
  console.log("Middleware:", {
    path: req.nextUrl.pathname,
    isAuthRoute,
    hasSession: !!session,
  })

  // Wenn der Benutzer nicht angemeldet ist und versucht, auf eine geschützte Route zuzugreifen
  if (!session && !isPublicRoute) {
    const redirectUrl = new URL("/auth/login", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Wenn der Benutzer angemeldet ist und versucht, auf eine Auth-Route zuzugreifen
  if (session && isAuthRoute) {
    const redirectUrl = new URL("/", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Middleware nur für bestimmte Pfade ausführen
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
