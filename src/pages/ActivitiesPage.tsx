import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { getActivities } from '../api/activities'
import ActivityCard from '../components/ActivityCard'
import type { Category } from '../types'
import { useState } from 'react'
import FilterBar from '../components/FilterBar'

export default function ActivitiesPage() {

  const auth = useAuth()
  const [category, setCategory] = useState<Category | ''>('')


  const { data, isLoading, error } = useQuery({
    queryKey: ['activities', category],
    queryFn: () => getActivities(auth.token!, category === '' ? undefined : category)
  })

  if (isLoading) {
    return <p>טוען פעילויות ...</p>
  }

  if (error) {
    return <p>שגיאה: {error.message}</p>
  }

  return (
    <>

      <h1>רשימת פעילויות</h1>
      <FilterBar value={category} onChange={setCategory} />
      {data?.length === 0 && <p>אין פעילויות להצגה</p>}
      <div>
        {data?.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </>
  )
}
