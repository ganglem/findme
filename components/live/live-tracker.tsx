"use client"

import {useState, useEffect} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import type {Stage, Act} from "@/lib/festival-data"
import {updateLocation} from "@/actions/location"
import {createClient} from "@/lib/supabase/client"
import {MapPin, Clock} from "lucide-react"

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

export function LiveTracker({stages, locations: initialLocations, userId}: LiveTrackerProps) {
    const [activeStage, setActiveStage] = useState<number | null>(null)
    const [locations, setLocations] = useState<UserLocation[]>(initialLocations)
    const [isUpdating, setIsUpdating] = useState(false)
    const sortedStages = [
                        ...stages.filter((stage) => stage.name.toLowerCase() === "campingplatz"),
                        ...stages.filter((stage) => stage.name.toLowerCase() !== "campingplatz"),
                        ];
    const campingStage = {
        id: 8, // Make sure this ID does not conflict with real stage IDs
        name: "Campingplatz"
    };

    const supabase = createClient()

    useEffect(() => {
        // Abonniere Änderungen an der user_locations Tabelle
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
                    // Hole aktualisierte Standorte
                    const {data} = await supabase
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
                        .order("timestamp", {ascending: false})

                    if (data) {
                        setLocations(data as UserLocation[])
                    }
                },
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
                <div className="grid gap-4 items-start">
                    {sortedStages.map((stage) => {
                        const usersAtStage = locations.filter((loc) => loc.stage_id === stage.id);
                        const isCampingplatz = stage.name.toLowerCase() === "campingplatz";

                        return (
                            <Card key={stage.id}>
                                <div className="flex flex-row items-start p-4 gap-6">
                                    {/* Left column */}
                                    <div className="flex flex-col w-[200px] space-y-3 flex-shrink-0">
                                        <CardHeader className="p-0">
                                            <CardTitle className="text-lg">{stage.name}</CardTitle>
                                        </CardHeader>
                                        {/* Only show act info if not Campingplatz */}
                                        {!isCampingplatz && (
                                            <>
                                                {/* Current Act */}
                                                <div>
                                                    <div className="text-sm font-medium flex items-center">
                                                        <Clock className="w-4 h-4 mr-1"/> Aktuell
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
                                                {/* Next Act */}
                                                <div>
                                                    <div className="text-sm font-medium flex items-center">
                                                        <Clock className="w-4 h-4 mr-1"/> Als nächstes
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
                                            </>
                                        )}
                                    </div>
                                    {/* Right column: Button and avatars */}
                                    <div className="flex flex-col items-end justify-between min-w-[100px] h-full">
                                        <Button
                                            variant={userLocation?.stage_id === stage.id ? "default" : "outline"}
                                            className="gap-1 p-1 flex flex-col items-center h-16 mb-4"
                                            size="sm"
                                            onClick={() => handleUpdateLocation(stage.id)}
                                            disabled={isUpdating}
                                        >
                                            <MapPin className="w-10 h-10 text-foreground"/>
                                            <span className="text-xs">
                            {userLocation?.stage_id === stage.id ? "Hier" : "Let's go! "}
                        </span>
                                        </Button>
                                        {usersAtStage.length > 0 ? (
                                            <div className="flex flex-wrap gap-2 w-full justify-end">
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
                                            <div className="text-sm text-muted-foreground">Niemand ist hier</div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
