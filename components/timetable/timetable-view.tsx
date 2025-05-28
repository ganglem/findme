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
  const [activeStage, setActiveStage] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>(initialFavorites)

  const filteredActs = acts.filter(
      (act) =>
          act.day === activeDay && (activeStage === null || act.stage === stages.find((s) => s.id === activeStage)?.name),
  )

  const handleToggleFavorite = async (actId: number) => {
    await toggleFavorite(actId)

    setFavorites((prev) =>
        prev.includes(actId) ? prev.filter((id) => id !== actId) : [...prev, actId]
    )
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
                      variant={activeStage === null ? "outline" : "tab"}
                      size="sm"
                      onClick={() => setActiveStage(null)}
                  >
                    Alle
                  </Button>

                  {stages.map((stage) => (
                      <Button
                          key={stage.id}
                          variant={activeStage === stage.id ? "outline" : "tab"}
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
                      <p className="text-center text-muted-foreground">
                        Keine Acts gefunden für diesen Tag und diese Stage.
                      </p>
                  )}
                </div>
              </TabsContent>
          ))}
        </Tabs>

        <div className="pt-4">
          <h2 className="text-xl mb-4">Meine Favoriten</h2>

          {favorites.length > 0 ? (
              <div className="space-y-4">
                {acts
                    .filter((act) => favorites.includes(act.id))
                    .sort((a, b) => {
                      const dayOrder = { Freitag: 0, Samstag: 1, Sonntag: 2 }
                      return a.day !== b.day
                          ? dayOrder[a.day as keyof typeof dayOrder] - dayOrder[b.day as keyof typeof dayOrder]
                          : a.time.localeCompare(b.time)
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
              <p className="text-center text-muted-foreground py-8">
                Du hast noch keine Favoriten ausgewählt.
              </p>
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
                    "bg-transparent hover:bg-transparent",
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
