import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs"
import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"

export async function middleware(req: NextRequest) {
    // Erstelle eine Antwort und einen Supabase-Client
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({req, res})

    const {
        data: {user},
    } = await supabase.auth.getUser()

    // Definiere geschützte und öffentliche Routen
    const isAuthRoute = req.nextUrl.pathname.startsWith("/auth")
    const isImageRoute = req.nextUrl.pathname.startsWith("/images")
    const isIconRoute = req.nextUrl.pathname.startsWith("/icons")
    const isApiRoute = req.nextUrl.pathname.startsWith("/api")
    const isManifestRoute = req.nextUrl.pathname.startsWith("/manifest.json")
    const isPublicRoute = isAuthRoute || isApiRoute || isImageRoute || isIconRoute || isManifestRoute

    // Wenn der Benutzer nicht angemeldet ist und versucht, auf eine geschützte Route zuzugreifen
    if (!user && !isPublicRoute) {
        const redirectUrl = new URL("/auth/login", req.url)
        return NextResponse.redirect(redirectUrl)
    }

    // Wenn der Benutzer angemeldet ist und versucht, auf eine Auth-Route zuzugreifen
    if (user && isAuthRoute) {
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
