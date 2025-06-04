import type React from "react"
import "./globals.css"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import {ThemeProvider} from "@/components/theme-provider"
import {Navigation} from "@/components/navigation"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title:       "Find.me - Ikarus Festival",
    description: "Finde deine Freunde und Lieblingsacts auf dem Ikarus Festival",
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="de">
        <head>
            <link rel="manifest" href="/manifest.json"/>
            <link rel="stylesheet" href="https://use.typekit.net/exp6oyj.css"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </head>
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen z-10 relative">
                <main className="flex-1 container max-w-md mx-auto px-4 py-8 pb-[90px]">{children}</main>
                <Navigation/>
            </div>

            <div className="fixed -bottom-1/2 left-50 w-full h-full z-0 pointer-events-none flex flex-col">
                <img
                    src="/images/forest-light.svg"
                    alt="forest silhouette"
                    className="w-full object-cover block dark:hidden transition-transform"
                    style={{height: "auto", maxHeight: "100%"}}
                />
                <img
                    src="/images/forest-dark.svg"
                    alt="forest silhouette"
                    className="w-full object-cover hidden dark:block transition-transform"
                    style={{height: "auto", maxHeight: "100%"}}
                />

                <div className="flex-1 w-full bg-[hsl(24,95%,55%)] dark:bg-black" />

            </div>


        </ThemeProvider>
        </body>
        </html>
    )
}
