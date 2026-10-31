import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { getActivities } from '../api/activities'
import ActivityCard from '../components/ActivityCard'
import type { Category } from '../types'
import { useState } from 'react'
import FilterBar from '../components/FilterBar'
import { Loader2, AlertCircle, SearchX } from 'lucide-react'

export default function ActivitiesPage() {

  const auth = useAuth()
  const [category, setCategory] = useState<Category | ''>('')


  const { data, isLoading, error } = useQuery({
    queryKey: ['activities', category],
    queryFn: () => getActivities(auth.token!, category === '' ? undefined : category)
  })

  if (isLoading) {
    return <p className="flex flex-col items-center gap-3 bg-white rounded-2xl shadow-sm p-10 text-lg font-bold text-ink-soft"><Loader2 className="w-10 h-10 text-brand motion-safe:animate-spin" aria-hidden="true" />טוען פעילויות ...</p>
  }

  if (error) {
    return <p className="flex items-center gap-3 rounded-2xl bg-danger-bg text-danger font-bold p-5"><AlertCircle className="w-6 h-6 shrink-0" aria-hidden="true" />שגיאה: {error.message}</p>
  }

  return (
    <>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink">רשימת פעילויות</h1>
        <FilterBar value={category} onChange={setCategory} />
      </div>
      {data?.length === 0 && <p className="flex flex-col items-center gap-3 bg-white rounded-2xl border-2 border-dashed border-line p-10 text-xl font-bold text-ink"><SearchX className="w-12 h-12 text-ink-soft" aria-hidden="true" />אין פעילויות להצגה</p>}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </>
  )
}
