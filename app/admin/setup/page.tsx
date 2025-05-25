"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { festivalData } from "@/lib/festival-data"
import { Loader2, CheckCircle, XCircle, Database } from "lucide-react"

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
      const { data: tablesData, error: tablesError } = await supabase.from("profiles").select("count").limit(1)
      const { data: stagesData, error: stagesError } = await supabase.from("stages").select("count").limit(1)
      const { data: actsData, error: actsError } = await supabase.from("acts").select("count").limit(1)

      const status = {
        profiles: !tablesError,
        stages: !stagesError,
        acts: !actsError,
        profilesCount: tablesData?.length || 0,
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

  async function createTables() {
    setIsCreatingTables(true)
    setError(null)

    try {
      // Erstelle profiles Tabelle
      const { error: profilesError } = await supabase.rpc("create_tables")

      if (profilesError) {
        throw new Error(`Fehler beim Erstellen der Tabellen: ${profilesError.message}`)
      }

      setTablesCreated(true)
      await checkDatabaseStatus()
    } catch (err: any) {
      console.error("Fehler beim Erstellen der Tabellen:", err)
      setError(err.message || "Fehler beim Erstellen der Tabellen")
      setTablesCreated(false)
    } finally {
      setIsCreatingTables(false)
    }
  }

  async function importData() {
    setIsImportingData(true)
    setError(null)

    try {
      // Importiere Stages
      for (const stage of festivalData.stages) {
        const { error: stageError } = await supabase
          .from("stages")
          .insert({ name: stage.name, description: stage.description })

        if (stageError) {
          throw new Error(`Fehler beim Importieren der Bühne ${stage.name}: ${stageError.message}`)
        }
      }

      // Hole alle Bühnen, um die IDs zu bekommen
      const { data: stagesData, error: stagesError } = await supabase.from("stages").select("id, name")

      if (stagesError) {
        throw new Error(`Fehler beim Abrufen der Bühnen: ${stagesError.message}`)
      }

      // Importiere Acts
      for (const act of festivalData.acts) {
        const stage = stagesData.find((s) => s.name === act.stage)

        if (!stage) {
          console.warn(`Bühne ${act.stage} nicht gefunden für Act ${act.artist}`)
          continue
        }

        // Berechne die Endzeit (1 Stunde nach Startzeit)
        const startTime = act.time
        const [startHour, startMinute] = startTime.split(":").map(Number)
        const endHour = (startHour + 1) % 24
        const endTime = `${endHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`

        const { error: actError } = await supabase.from("acts").insert({
          stage_id: stage.id,
          artist: act.artist,
          day: act.day,
          start_time: startTime,
          end_time: endTime,
        })

        if (actError) {
          throw new Error(`Fehler beim Importieren des Acts ${act.artist}: ${actError.message}`)
        }
      }

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
  useState(() => {
    checkDatabaseStatus()
  })

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
                  {dbStatus.profiles ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  Profiles Tabelle
                </li>
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
          <Button className="w-full" onClick={createTables} disabled={isCreatingTables || tablesCreated === true}>
            {isCreatingTables && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {tablesCreated === true ? "Tabellen erstellt" : "Tabellen erstellen"}
          </Button>

          <Button
            className="w-full"
            onClick={importData}
            disabled={isImportingData || dataImported === true || tablesCreated !== true}
          >
            {isImportingData && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {dataImported === true ? "Daten importiert" : "Daten importieren"}
          </Button>

          <Button variant="outline" className="w-full" onClick={checkDatabaseStatus}>
            Status aktualisieren
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
