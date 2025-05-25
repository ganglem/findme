"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, Database } from "lucide-react"
import Link from "next/link"

export default function ImportPage() {
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  // Daten aus extract-timetable.js konvertieren
  function convertFestivalData() {
    // Wir verwenden die Daten aus der extract-timetable.js Datei
    // @ts-ignore
    const festivalData = window.festivalData

    if (!festivalData || !festivalData.days) {
      throw new Error("Festival-Daten nicht gefunden")
    }

    const stages = []
    const acts = []
    let actId = 1

    // Stages extrahieren
    const uniqueStages = new Set()
    festivalData.days.forEach((day: any) => {
      day.stages.forEach((stage: any) => {
        if (!uniqueStages.has(stage.name)) {
          uniqueStages.add(stage.name)
          stages.push({
            name: stage.name,
            description: null,
          })
        }
      })
    })

    // Acts extrahieren
    festivalData.days.forEach((day: any) => {
      day.stages.forEach((stage: any) => {
        stage.acts.forEach((act: any) => {
          if (act.artist && act.artist.trim() !== "") {
            acts.push({
              id: actId++,
              artist: act.artist,
              time: act.time,
              stage: stage.name,
              day: day.name,
            })
          }
        })
      })
    })

    return { stages, acts }
  }

  async function importData() {
    setIsImporting(true)
    setError(null)
    setImportStatus("loading")

    try {
      const data = convertFestivalData()

      const response = await fetch("/api/import-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Fehler beim Importieren der Daten")
      }

      setImportStatus("success")
    } catch (err: any) {
      console.error("Fehler beim Importieren der Daten:", err)
      setError(err.message || "Fehler beim Importieren der Daten")
      setImportStatus("error")
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            Daten importieren
          </CardTitle>
          <CardDescription>Importiere die Festival-Daten in die Datenbank</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Fehler</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {importStatus === "success" && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle>Erfolg</AlertTitle>
              <AlertDescription>Die Daten wurden erfolgreich importiert.</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <p className="text-sm">
              Dieses Tool importiert die Festival-Daten aus der extract-timetable.js Datei in die Datenbank. Stelle
              sicher, dass die Datei korrekt geladen wurde.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={importData} disabled={isImporting || importStatus === "success"}>
            {isImporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {importStatus === "success" ? "Daten importiert" : "Daten importieren"}
          </Button>

          {importStatus === "success" && (
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
