"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Act, Day, Stage } from "@/lib/festival-data"
import { toggleFavorite } from "@/actions/favorites"
import { Heart } from "lucide-react"
import {cn} from "@/lib/utils";

interface TimetableViewProps {
  days: Day[]
  stages: Stage[]
  acts: Act[]
  favorites: number[]
}

export function TimetableView({ days, stages, acts, favorites: initialFavorites }: TimetableViewProps) {
  const [activeDay, setActiveDay] = useState(days[0].name)
  const [activeStages, setActiveStages] = useState<number[]>([])
  const [favorites, setFavorites] = useState<number[]>(initialFavorites)

  // Helper to toggle a stage in the filter
  const toggleStage = (stageId: number) => {
    setActiveStages((prev) =>
      prev.includes(stageId) ? prev.filter((id) => id !== stageId) : [...prev, stageId],
    )
  }

  // Acts filtered by day and selected stages (multi-stage)
  const filteredActs = acts.filter(
    (act) =>
      act.day === activeDay &&
      (activeStages.length === 0 || activeStages.includes(stages.find((s) => s.name === act.stage)?.id!)),
  )

  // Favorites filtered by day and selected stages
  const filteredFavoriteActs = acts.filter(
    (act) =>
      favorites.includes(act.id) &&
      act.day === activeDay &&
      (activeStages.length === 0 || activeStages.includes(stages.find((s) => s.name === act.stage)?.id!)),
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
            <div className="flex flex-wrap gap-x-4 gap-y-2 pb-2">
              <Button
                variant={activeStages.length === 0 ? "outline" : "tab"}
                size="sm"
                onClick={() => setActiveStages([])}
              >
                Alle
              </Button>

              {stages
                .filter((stage) => stage.name.toLowerCase() !== "campingplatz")
                .map((stage) => (
                  <Button
                    key={stage.id}
                    variant={activeStages.includes(stage.id) ? "outline" : "tab"}
                    size="sm"
                    onClick={() => toggleStage(stage.id)}
                  >
                    {stage.name}
                  </Button>
                ))}
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-bold mb-4">Meine Favoriten</h2>
              {filteredFavoriteActs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFavoriteActs
                    .sort((a, b) => {
                      // Sortiere nach Tag und dann nach Zeit
                      const dayOrder = { Freitag: 0, Samstag: 1, Sonntag: 2 }
                      if (a.day !== b.day) {
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

            <h2 className="text-xl font-bold mb-4">Acts</h2>
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
                <p className="text-center text-muted-foreground">
                  Keine Acts gefunden für diesen Tag und diese Stage.
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
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
          <div className="flex justify-between items-center">
            <div>
              <div>{act.artist}</div>
              <div className="text-sm text-muted-foreground">
                {act.time} • {act.stage}
                {showDay && ` • ${act.day}`}
              </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={onToggleFavorite}
                className={cn(
                    "bg-transparent hover:bg-transparent flex-shrink-0",
                    isFavorite ? "text-foreground" : "text-muted-foreground"
                )}
            >
              <Heart className={isFavorite ? "fill-current" : ""} width={32} height={32} />
            </Button>
          </div>
        </CardContent>
      </Card>
  )
}
