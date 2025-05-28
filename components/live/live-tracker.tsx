"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Stage, Act } from "@/lib/festival-data"
import { updateLocation } from "@/actions/location"
import { createClient } from "@/lib/supabase/client"
import { MapPin, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExtendedStage extends Stage {
    currentAct: Act | null
    nextAct: Act | null
}

interface UserLocation {
    user_id: string
    stage_id: number
    profiles: {
        username: string | null
        avatar_url: string | null
    }
    stages: {
        name: string
    }
}

interface LiveTrackerProps {
    stages: ExtendedStage[]
    locations: UserLocation[]
    userId: string
}

export function LiveTracker({ stages, locations: initialLocations, userId }: LiveTrackerProps) {
    const [activeStage, setActiveStage] = useState<number | null>(null)
    const [locations, setLocations] = useState<UserLocation[]>(initialLocations)
    const [isUpdating, setIsUpdating] = useState(false)
    const campingStage = { id: 8, name: "Campingplatz" }

    const supabase = createClient()

    useEffect(() => {
        const channel = supabase
            .channel("user_locations_changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "user_locations",
                },
                async () => {
                    const { data } = await supabase
                        .from("user_locations")
                        .select(`
              user_id,
              stage_id,
              profiles:user_id (
                username,
                avatar_url
              ),
              stages:stage_id (
                name
              )
            `)
                        .order("timestamp", { ascending: false })

                    if (data) setLocations(data as UserLocation[])
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    const handleUpdateLocation = async (stageId: number) => {
        setIsUpdating(true)
        setActiveStage(stageId)
        await updateLocation(stageId)
        setIsUpdating(false)
    }

    const userLocation = locations.find((loc) => loc.user_id === userId)

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                {campingStage && (
                    <Card key={campingStage.id}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex justify-between">
                                <span>{campingStage.name}</span>
                                <Button
                                    variant={userLocation?.stage_id === campingStage.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleUpdateLocation(campingStage.id)}
                                    disabled={isUpdating}
                                    className={cn(
                                        userLocation?.stage_id === campingStage.id && "bg-transparent hover:bg-transparent"
                                    )}
                                >
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {userLocation?.stage_id === campingStage.id ? "Ich bin hier" : "Hier bin ich"}
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent />
                    </Card>
                )}

                <h2 className="text-xl font-semibold">Aktuelle Acts</h2>

                <div className="grid gap-4 items-start">
                    {stages.map((stage) => (
                        <Card key={stage.id}>
                            <div className="flex flex-row items-start p-4 gap-6">
                                <div className="flex flex-col flex-1 space-y-3">
                                    <CardHeader className="p-0">
                                        <CardTitle className="text-lg">{stage.name}</CardTitle>
                                    </CardHeader>

                                    <div>
                                        <div className="text-sm font-medium flex items-center">
                                            <Clock className="w-4 h-4 mr-1" /> Aktuell
                                        </div>
                                        {stage.currentAct ? (
                                            <div>
                                                <div className="font-bold">{stage.currentAct.artist}</div>
                                                <div className="text-xs text-muted-foreground">{stage.currentAct.time}</div>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-muted-foreground">Kein aktueller Act</div>
                                        )}
                                    </div>

                                    <div>
                                        <div className="text-sm font-medium flex items-center">
                                            <Clock className="w-4 h-4 mr-1" /> Als nächstes
                                        </div>
                                        {stage.nextAct ? (
                                            <div>
                                                <div className="font-bold">{stage.nextAct.artist}</div>
                                                <div className="text-xs text-muted-foreground">{stage.nextAct.time}</div>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-muted-foreground">Kein weiterer Act</div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-start min-w-[100px]">
                                    <Button
                                        variant={userLocation?.stage_id === stage.id ? "default" : "outline"}
                                        className={cn(
                                            "gap-1 p-1 flex flex-col items-center h-16",
                                            userLocation?.stage_id === stage.id && "bg-transparent hover:bg-transparent"
                                        )}
                                        size="sm"
                                        onClick={() => handleUpdateLocation(stage.id)}
                                        disabled={isUpdating}
                                    >
                                        <MapPin className="w-10 h-10 text-foreground" />
                                        <span className="text-xs">
                      {userLocation?.stage_id === stage.id ? "Hier" : "Let's go!"}
                    </span>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Wer ist wo?</h2>

                <div className="grid gap-4">
                    {stages.map((stage) => {
                        const usersAtStage = locations.filter((loc) => loc.stage_id === stage.id)

                        return (
                            <Card key={stage.id}>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">{stage.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {usersAtStage.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {usersAtStage.map((location) => (
                                                <Avatar key={location.user_id}>
                                                    <AvatarImage
                                                        src={location.profiles.avatar_url || undefined}
                                                        alt={location.profiles.username || "User"}
                                                    />
                                                    <AvatarFallback>
                                                        {location.profiles.username?.[0]?.toUpperCase() || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-sm text-muted-foreground">Niemand ist aktuell hier</div>
                                    )}
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
