import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  try {
    // Daten aus der Anfrage extrahieren
    const { stages, acts } = await request.json()

    // Stages importieren
    for (const stage of stages) {
      const { error: stageError } = await supabase.from("stages").insert({
        name: stage.name,
        description: stage.description || null,
      })

      if (stageError) {
        return NextResponse.json(
          { error: `Fehler beim Importieren der Bühne ${stage.name}: ${stageError.message}` },
          { status: 500 },
        )
      }
    }

    // Stages abrufen, um die IDs zu bekommen
    const { data: stagesData, error: stagesError } = await supabase.from("stages").select("id, name")

    if (stagesError) {
      return NextResponse.json({ error: `Fehler beim Abrufen der Bühnen: ${stagesError.message}` }, { status: 500 })
    }

    // Acts importieren
    for (const act of acts) {
      if (!act.artist) continue // Leere Acts überspringen

      const stage = stagesData.find((s) => s.name === act.stage)
      if (!stage) {
        console.warn(`Bühne ${act.stage} nicht gefunden für Act ${act.artist}`)
        continue
      }

      // Berechne die Endzeit (1 Stunde nach Startzeit)
      const [startHour, startMinute] = act.time.split(":").map(Number)
      const endHour = (startHour + 1) % 24
      const endTime = `${endHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`

      const { error: actError } = await supabase.from("acts").insert({
        stage_id: stage.id,
        artist: act.artist,
        day: act.day,
        start_time: act.time,
        end_time: endTime,
      })

      if (actError) {
        console.error(`Fehler beim Importieren des Acts ${act.artist}:`, actError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Fehler beim Importieren der Daten:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
