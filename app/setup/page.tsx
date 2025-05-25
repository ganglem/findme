"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { Loader2, CheckCircle, XCircle, Database } from "lucide-react"
import Link from "next/link"

export default function SetupPage() {
  const [isCreatingTables, setIsCreatingTables] = useState(false)
  const [isImportingData, setIsImportingData] = useState(false)
  const [tablesCreated, setTablesCreated] = useState<boolean | null>(null)
  const [dataImported, setDataImported] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dbStatus, setDbStatus] = useState<any>(null)

  const supabase = createClient()

  async function checkDatabaseStatus() {
    setError(null)

    try {
      // Prüfe, ob die Tabellen existieren
      const { data: stagesData, error: stagesError } = await supabase.from("stages").select("count").limit(1)
      const { data: actsData, error: actsError } = await supabase.from("acts").select("count").limit(1)

      const status = {
        stages: !stagesError,
        acts: !actsError,
        stagesCount: stagesData?.length || 0,
        actsCount: actsData?.length || 0,
      }

      setDbStatus(status)
      return status
    } catch (err) {
      console.error("Fehler beim Prüfen des Datenbankstatus:", err)
      setError("Fehler beim Prüfen des Datenbankstatus")
      return null
    }
  }

  async function importData() {
    setIsImportingData(true)
    setError(null)

    try {
      // Wir verwenden die Daten aus der extract-timetable.js Datei
      // @ts-ignore
      const festivalData = window.festivalData

      if (!festivalData || !festivalData.days) {
        throw new Error("Festival-Daten nicht gefunden")
      }

      // Stages extrahieren und importieren
      const uniqueStages = new Set()
      festivalData.days.forEach((day: any) => {
        day.stages.forEach((stage: any) => {
          if (!uniqueStages.has(stage.name)) {
            uniqueStages.add(stage.name)
          }
        })
      })

      // Stages importieren
      for (const stageName of uniqueStages) {
        const { error: stageError } = await supabase.from("stages").insert({
          name: stageName,
          description: null,
        })

        if (stageError && !stageError.message.includes("duplicate key")) {
          throw new Error(`Fehler beim Importieren der Bühne ${stageName}: ${stageError.message}`)
        }
      }

      // Stages abrufen, um die IDs zu bekommen
      const { data: stagesData, error: stagesError } = await supabase.from("stages").select("id, name")

      if (stagesError) {
        throw new Error(`Fehler beim Abrufen der Bühnen: ${stagesError.message}`)
      }

      // Acts importieren
      let importedCount = 0
      let errorCount = 0

      for (const day of festivalData.days) {
        for (const stage of day.stages) {
          const stageData = stagesData.find((s) => s.name === stage.name)
          if (!stageData) {
            console.warn(`Bühne ${stage.name} nicht gefunden`)
            continue
          }

          for (const act of stage.acts) {
            if (!act.artist || act.artist.trim() === "") continue

            // Berechne die Endzeit (1 Stunde nach Startzeit)
            const [startHour, startMinute] = act.time.split(":").map(Number)
            const endHour = (startHour + 1) % 24
            const endTime = `${endHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`

            const { error: actError } = await supabase.from("acts").insert({
              stage_id: stageData.id,
              artist: act.artist,
              day: day.name,
              start_time: act.time,
              end_time: endTime,
            })

            if (actError && !actError.message.includes("duplicate key")) {
              console.error(`Fehler beim Importieren des Acts ${act.artist}:`, actError)
              errorCount++
            } else if (!actError) {
              importedCount++
            }
          }
        }
      }

      console.log(`Import abgeschlossen: ${importedCount} Acts importiert, ${errorCount} Fehler`)

      setDataImported(true)
      await checkDatabaseStatus()
    } catch (err: any) {
      console.error("Fehler beim Importieren der Daten:", err)
      setError(err.message || "Fehler beim Importieren der Daten")
      setDataImported(false)
    } finally {
      setIsImportingData(false)
    }
  }

  // Prüfe den Datenbankstatus beim Laden der Seite
  useEffect(() => {
    checkDatabaseStatus()
  }, [])

  return (
    <div className="container max-w-md mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            Datenbank-Setup
          </CardTitle>
          <CardDescription>Initialisiere die Datenbank für die Ikarus Festival App</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Fehler</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <h3 className="font-medium">Datenbankstatus:</h3>
            {dbStatus ? (
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  {dbStatus.stages ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  Stages Tabelle
                </li>
                <li className="flex items-center gap-2">
                  {dbStatus.acts ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  Acts Tabelle
                </li>
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Datenbankstatus wird geladen...</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            className="w-full"
            onClick={importData}
            disabled={isImportingData || dataImported === true || !dbStatus?.stages}
          >
            {isImportingData && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {dataImported === true ? "Daten importiert" : "Daten importieren"}
          </Button>

          <Button variant="outline" className="w-full" onClick={checkDatabaseStatus}>
            Status aktualisieren
          </Button>

          {dataImported === true && (
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                Zur App
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
