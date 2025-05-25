import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Pfad zur Quelldatei
    const sourcePath = path.join(process.cwd(), "extract-timetable.js")

    // Pfad zum Zielverzeichnis
    const publicDir = path.join(process.cwd(), "public")
    const targetPath = path.join(publicDir, "extract-timetable.js")

    // Prüfen, ob das Zielverzeichnis existiert, andernfalls erstellen
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // Datei kopieren
    fs.copyFileSync(sourcePath, targetPath)

    return NextResponse.json({ success: true, message: "Datei erfolgreich kopiert" })
  } catch (error: any) {
    console.error("Fehler beim Kopieren der Datei:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
