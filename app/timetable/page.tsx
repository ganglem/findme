import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { TimetableView } from "@/components/timetable/timetable-view"
import { days, stages, acts } from "@/lib/festival-data"
import { getFavorites } from "@/actions/favorites"

export default async function TimetablePage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

    if (!session) {
    redirect("/auth/login")
  }

  const { favorites } = await getFavorites()

  return (
    <div className="space-y-6 flex-col flex">
      <h1 className="text-2xl font-bold">Timetable</h1>
      <TimetableView days={days} stages={stages} acts={acts} favorites={favorites} />
    </div>
  )
}
