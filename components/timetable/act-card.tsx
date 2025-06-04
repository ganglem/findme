"use client"

import type {Act} from "@/lib/festival-data";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Heart} from "lucide-react";
import React, {useEffect} from "react";
import {getUsersWhoFavoritedAct} from "@/actions/favorites";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

interface ActCardProps {
    act: Act
    isFavorite: boolean
    onToggleFavorite: () => void
    showDay?: boolean
}

export default function ActCard({ act, isFavorite, onToggleFavorite, showDay = false }: ActCardProps) {

    const [usersWhoFavorited, setUsersWhoFavorited] = React.useState<{ id: string; username: string; avatarUrl: string}[]>([]);

    useEffect(() => {
        getUsersWhoFavoritedAct(act.id).then((users) => {
            setUsersWhoFavorited(users);
        })
    }, []);

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex flex-col">
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
                            <Heart className={isFavorite ? "fill-current" : ""} width={32} height={32}/>
                        </Button>
                    </div>
                    <div className="flex flex-row flex-wrap gap-2 w-full justify-start">
                        {usersWhoFavorited.length > 0 && usersWhoFavorited.map((user) => (
                            <Avatar key={user.id}>
                                <Popover>
                                    <PopoverTrigger><AvatarImage
                                        src={user.avatarUrl || undefined}
                                        alt={user.username || "User"}/>
                                    </PopoverTrigger>
                                    <PopoverContent side="top">
                                        <div className="text-xs text-muted-foreground">
                                            {user.username}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                <AvatarFallback>
                                    {user.username?.[0]?.toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}