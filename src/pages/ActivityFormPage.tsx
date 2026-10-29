import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ActivityForm from "../components/ActivityForm"
import { useAuth } from "../context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import type { ActivityInput } from "../types"
import { addActivity, getActivity, updateActivity } from "../api/activities"

export default function ActivityFormPage() {

  const auth = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = id !== undefined

  const { data: activity, isLoading } = useQuery({
    queryKey: ['activity', id],
    queryFn: () => getActivity(auth.token!, Number(id)),
    enabled: isEdit,
  })

  const mutation = useMutation({
    mutationFn: (values: ActivityInput) =>
  isEdit
    ? updateActivity(auth.token!, Number(id), values)
    : addActivity(auth.token!, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      queryClient.removeQueries({queryKey:['activity', id]})
      navigate('/activities')
    },
  })
  if (isEdit && isLoading) {
    return <p>טוען...</p>
  }

  return (
    <>
      <h1>{isEdit ? 'עריכת פעילות' : 'הוספת פעילות'}</h1>
      {mutation.isPending && <p>שומר...</p>}
      {mutation.error && <p>שגיאה: {mutation.error.message}</p>}
      <ActivityForm key={id ?? 'new'} onSubmit={(values) => mutation.mutate(values)} defaultValues={activity} />
    </>
  )
}