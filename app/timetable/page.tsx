import {createClient} from "@/lib/supabase/server"
import {redirect} from "next/navigation"
import {TimetableView} from "@/components/timetable/timetable-view"
import {getFavorites} from "@/actions/favorites"
import Image from "next/image"

export default async function TimetablePage() {
    const supabase = await createClient()
    const {
        data: {user},
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    const {favorites} = await getFavorites()

    // Fetch acts and stages from Supabase
    const {data: actsData, error: actsError} = await supabase.from("acts").select("*")
    const {data: stagesData, error: stagesError} = await supabase.from("stages").select("*")

    // Fallback for errors
    const actsRaw = Array.isArray(actsData) ? actsData : []
    const stagesRaw = Array.isArray(stagesData) ? stagesData : []

    // Map stages to expected format for TimetableView
    const stages = stagesRaw.map((stage) => ({
        id:          stage.id,
        name:        stage.name,
        description: stage.description || undefined,
    }))

    // Map acts to expected format for TimetableView
    const acts = actsRaw.map((act) => {
        const stageObj = stages.find((s) => s.id === act.stage_id)
        const start = act.start_time ? act.start_time.slice(0, 5) : ""
        const end = act.end_time ? act.end_time.slice(0, 5) : ""
        return {
            id:     act.id,
            artist: act.artist,
            time:   start && end ? `${start} - ${end}` : start || end,
            stage:  stageObj ? stageObj.name : "Unbekannte Stage",
            day:    act.day,
        }
    })

    const days = [
        {name: "Freitag", date: "2023-05-26"},
        {name: "Samstag", date: "2023-05-27"},
        {name: "Sonntag", date: "2023-05-28"},
    ]

    return (
        <div className="space-y-6 flex-col flex">
            <div className="flex items-center gap-3">
                <Image
                    src="/images/icon.svg"
                    alt="Ikarus Festival Logo"
                    width={36}
                    height={36}
                    className="h-[3em] w-auto align-middle"
                />
                <h1 className="text-2xl font-bold">Timetable</h1>
            </div>
            <TimetableView days={days} stages={stages} acts={acts} favorites={favorites}/>
        </div>
    )
}
