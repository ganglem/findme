import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Find.me",
        short_name: "Find.me",
        description: "Web App zum Selbstorganisieren aufm Ikarus Festival 2025",
        display: "standalone",
        start_url: "/",
        icons: [
            {
                src: "logo.svg",
                type: "image/svg+xml",
                sizes: "any",
                purpose: "maskable"
            }
        ],
        background_color: "#292C33",
        theme_color: "#292C33",
        scope: "/"
    }
}