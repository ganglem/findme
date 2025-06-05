import {createClient} from "@/lib/supabase/server"
import {redirect} from "next/navigation"
import {LiveTracker} from "@/components/live/live-tracker"
import {stages, acts} from "@/lib/festival-data"
import {getUserLocations} from "@/actions/location"
import Image from "next/image";

export default async function LivePage() {
    const supabase = await createClient()
    const {
        data: {user},
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    const {locations} = await getUserLocations()

    // Aktuelle Zeit für die Demo
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinutes = now.getMinutes()

    // Aktueller Tag (für Demo-Zwecke)
    const currentDay = "Samstag" // In einer echten App würde dies dynamisch sein

    // Finde aktuelle und nächste Acts für jede Stage
    const stagesWithCurrentActs = stages.map((stage) => {
        const stageActs = acts.filter((act) => act.stage === stage.name && act.day === currentDay)

        // Sortiere Acts nach Zeit
        stageActs.sort((a, b) => a.time.localeCompare(b.time))

        // Finde aktuellen Act
        const currentAct = stageActs.find((act) => {
            const [actHour, actMinute] = act.time.split(":").map(Number)
            return (
                actHour === currentHour ||
                (actHour<currentHour && actHour + 1>currentHour) ||
                (actHour === currentHour - 1 && actMinute>currentMinutes)
            )
        })

        // Finde nächsten Act
        const currentActIndex = currentAct ? stageActs.indexOf(currentAct) : -1
        const nextAct =
            currentActIndex>=0 && currentActIndex<stageActs.length - 1 ? stageActs[currentActIndex + 1] : null

        return {
            ...stage,
            currentAct,
            nextAct,
        }
    })

    return <LiveTracker stages={stagesWithCurrentActs} locations={locations} userId={user.id}/>
}
