"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Act, Day, Stage } from "@/lib/festival-data"
import { toggleFavorite } from "@/actions/favorites"
import { Heart } from "lucide-react"

interface TimetableViewProps {
  days: Day[]
  stages: Stage[]
  acts: Act[]
  favorites: number[]
}

export function TimetableView({ days, stages, acts, favorites: initialFavorites }: TimetableViewProps) {
  const [activeDay, setActiveDay] = useState(days[0].name)
  const [activeStage, setActiveStage] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>(initialFavorites)

  const filteredActs = acts.filter(
    (act) =>
      act.day === activeDay && (activeStage === null || act.stage === stages.find((s) => s.id === activeStage)?.name),
  )

  const handleToggleFavorite = async (actId: number) => {
    await toggleFavorite(actId)

    if (favorites.includes(actId)) {
      setFavorites(favorites.filter((id) => id !== actId))
    } else {
      setFavorites([...favorites, actId])
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue={days[0].name} onValueChange={setActiveDay}>
        <TabsList className="grid grid-cols-3 w-full">
          {days.map((day) => (
            <TabsTrigger key={day.name} value={day.name}>
              {day.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map((day) => (
          <TabsContent key={day.name} value={day.name} className="space-y-4">
            <div className="flex overflow-x-auto pb-2 space-x-2">
              <Button
                variant={activeStage === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveStage(null)}
              >
                Alle
              </Button>

              {stages.map((stage) => (
                <Button
                  key={stage.id}
                  variant={activeStage === stage.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveStage(stage.id)}
                >
                  {stage.name}
                </Button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredActs.length > 0 ? (
                filteredActs.map((act) => (
                  <ActCard
                    key={act.id}
                    act={act}
                    isFavorite={favorites.includes(act.id)}
                    onToggleFavorite={() => handleToggleFavorite(act.id)}
                  />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Keine Acts gefunden für diesen Tag und diese Stage.
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="pt-4">
        <h2 className="text-xl font-bold mb-4">Meine Favoriten</h2>

        {favorites.length > 0 ? (
          <div className="space-y-4">
            {acts
              .filter((act) => favorites.includes(act.id))
              .sort((a, b) => {
                // Sortiere nach Tag und dann nach Zeit
                if (a.day !== b.day) {
                  const dayOrder = { Freitag: 0, Samstag: 1, Sonntag: 2 }
                  return dayOrder[a.day as keyof typeof dayOrder] - dayOrder[b.day as keyof typeof dayOrder]
                }
                return a.time.localeCompare(b.time)
              })
              .map((act) => (
                <ActCard
                  key={act.id}
                  act={act}
                  isFavorite={true}
                  onToggleFavorite={() => handleToggleFavorite(act.id)}
                  showDay
                />
              ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">Du hast noch keine Favoriten ausgewählt.</p>
        )}
      </div>
    </div>
  )
}

interface ActCardProps {
  act: Act
  isFavorite: boolean
  onToggleFavorite: () => void
  showDay?: boolean
}

function ActCard({ act, isFavorite, onToggleFavorite, showDay = false }: ActCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-bold">{act.artist}</div>
            <div className="text-sm text-muted-foreground">
              {act.time} • {act.stage}
              {showDay && ` • ${act.day}`}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            className={isFavorite ? "text-red-500" : "text-muted-foreground"}
          >
            <Heart className={isFavorite ? "fill-current" : ""} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
