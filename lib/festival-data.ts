export interface Act {
  id: number
  artist: string
  time: string
  stage: string
  day: string
}

export interface Stage {
  id: number
  name: string
  description?: string
}

export interface Day {
  name: string
  date: string
}

export const days: Day[] = [
  { name: "Freitag", date: "2023-05-26" },
  { name: "Samstag", date: "2023-05-27" },
  { name: "Sonntag", date: "2023-05-28" },
]

export const stages: Stage[] = [
  { id: 1, name: "Olymp Stage", description: "Hauptbühne" },
  { id: 2, name: "Minos Tent", description: "Hosted by Cosmic Festival" },
  { id: 3, name: "Nox Stage", description: "Hosted by Hardshift Festival" },
  { id: 4, name: "Forest Stage", description: "Open Air Dance Records" },
  { id: 5, name: "Hade Cage", description: "Hosted by Neosignal" },
  { id: 6, name: "Onos Stage", description: "Hosted by Recordings" },
  { id: 7, name: "Medusa Jungle", description: "Spirit Test" },
  { id: 8, name: "Campingplatz", description: "Campierung" },
]


export const acts: Act[] = [
  // Samstag - Olymp Stage
  { id: 1, artist: "BEACHBAG", time: "16:00", stage: "Olymp Stage", day: "Samstag" },
  { id: 2, artist: "REWI", time: "18:00", stage: "Olymp Stage", day: "Samstag" },
  { id: 3, artist: "BENNETT", time: "19:00", stage: "Olymp Stage", day: "Samstag" },
  { id: 4, artist: "SCOOTER LIVE", time: "21:00", stage: "Olymp Stage", day: "Samstag" },
  { id: 5, artist: "HBZ", time: "23:00", stage: "Olymp Stage", day: "Samstag" },
  { id: 6, artist: "VINI VICI", time: "00:00", stage: "Olymp Stage", day: "Samstag" },
  { id: 7, artist: "MANDY", time: "01:00", stage: "Olymp Stage", day: "Samstag" },
  { id: 8, artist: "SUB ZERO PROJECT", time: "02:00", stage: "Olymp Stage", day: "Samstag" },

  // Samstag - Minos Tent
  { id: 9, artist: "T78", time: "19:00", stage: "Minos Tent", day: "Samstag" },
  { id: 10, artist: "I HATE MODELS", time: "20:00", stage: "Minos Tent", day: "Samstag" },
  { id: 11, artist: "STELLA BOSSI", time: "23:00", stage: "Minos Tent", day: "Samstag" },
  { id: 12, artist: "CHARLIE SPARKS", time: "00:00", stage: "Minos Tent", day: "Samstag" },

  // Samstag - Nox Stage
  { id: 13, artist: "VILLAIN", time: "14:00", stage: "Nox Stage", day: "Samstag" },
  { id: 14, artist: "NOTHING BUT LOVE", time: "15:00", stage: "Nox Stage", day: "Samstag" },
  { id: 15, artist: "ALFRED HEINRICHS", time: "16:00", stage: "Nox Stage", day: "Samstag" },
  { id: 16, artist: "FRONTLINER", time: "18:00", stage: "Nox Stage", day: "Samstag" },
  { id: 17, artist: "THE PURGE", time: "19:00", stage: "Nox Stage", day: "Samstag" },
  { id: 18, artist: "VERTILE", time: "20:00", stage: "Nox Stage", day: "Samstag" },
  { id: 19, artist: "MAXTREME: OPSM MAXIM", time: "21:00", stage: "Nox Stage", day: "Samstag" },
  { id: 20, artist: "ROOLER", time: "22:00", stage: "Nox Stage", day: "Samstag" },
  { id: 21, artist: "RIOT SHIFT VS TOZA", time: "23:00", stage: "Nox Stage", day: "Samstag" },
  { id: 22, artist: "MUTILATOR", time: "00:00", stage: "Nox Stage", day: "Samstag" },
  { id: 23, artist: "MORTIS VS THE SMILER", time: "01:00", stage: "Nox Stage", day: "Samstag" },
  { id: 24, artist: "NOISEFLOW", time: "02:00", stage: "Nox Stage", day: "Samstag" },

  // Freitag - Olymp Stage
  { id: 25, artist: "DOMENICO RONDINELLI", time: "17:00", stage: "Olymp Stage", day: "Freitag" },
  { id: 26, artist: "LOVRA", time: "19:00", stage: "Olymp Stage", day: "Freitag" },
  { id: 27, artist: "BORIS BREJCHA", time: "20:00", stage: "Olymp Stage", day: "Freitag" },
  { id: 28, artist: "FISHER LIVE", time: "22:00", stage: "Olymp Stage", day: "Freitag" },
  { id: 29, artist: "DEBORAH DE LUCA", time: "23:00", stage: "Olymp Stage", day: "Freitag" },
  { id: 30, artist: "ARMIN VAN BUUREN", time: "01:00", stage: "Olymp Stage", day: "Freitag" },
  { id: 31, artist: "KEVIN DE VRIES", time: "02:00", stage: "Olymp Stage", day: "Freitag" },

  // Sonntag - Olymp Stage
  { id: 32, artist: "DJ TEA", time: "15:00", stage: "Olymp Stage", day: "Sonntag" },
  { id: 33, artist: "KAY C", time: "16:00", stage: "Olymp Stage", day: "Sonntag" },
  { id: 34, artist: "NOEL HOLLER", time: "17:00", stage: "Olymp Stage", day: "Sonntag" },
  { id: 35, artist: "DIE GEBRÜDER BRETT", time: "18:00", stage: "Olymp Stage", day: "Sonntag" },
  { id: 36, artist: "FINCH LIVE", time: "20:00", stage: "Olymp Stage", day: "Sonntag" },
  { id: 37, artist: "ALLE FARBEN", time: "22:00", stage: "Olymp Stage", day: "Sonntag" },
  { id: 38, artist: "MAUSIO", time: "23:00", stage: "Olymp Stage", day: "Sonntag" },
  { id: 39, artist: "NEELIX", time: "00:00", stage: "Olymp Stage", day: "Sonntag" },
  { id: 40, artist: "DA TWEEKAZ", time: "01:00", stage: "Olymp Stage", day: "Sonntag" },
  { id: 41, artist: "MAXTREME", time: "02:00", stage: "Olymp Stage", day: "Sonntag" },

  // Weitere Acts für andere Stages und Tage...
  // Dies ist eine gekürzte Liste, in einer echten Anwendung würden alle Acts aus den Bildern extrahiert werden
]

// Konvertiere die Daten aus extract-timetable.js in das richtige Format für die Datenbank
export const festivalData = {
  stages,
  acts: acts
    .map((act) => {
      // Finde die stage_id basierend auf dem Namen
      const stage = stages.find((s) => s.name === act.stage)
      if (!stage) {
        throw new Error(`Stage ${act.stage} nicht gefunden`)
      }

      // Berechne die Endzeit (1 Stunde nach Startzeit)
      const [startHour, startMinute] = act.time.split(":").map(Number)
      const endHour = (startHour + 1) % 24
      const endTime = `${endHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`

      return {
        stage_id: stage.id,
        artist: act.artist,
        day: act.day,
        start_time: act.time,
        end_time: endTime,
      }
    })
    .filter((act) => act.artist !== ""), // Leere Acts filtern
}
