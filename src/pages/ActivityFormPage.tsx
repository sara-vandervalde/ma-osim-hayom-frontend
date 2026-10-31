import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ActivityForm from "../components/ActivityForm"
import { useAuth } from "../context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import type { ActivityInput } from "../types"
import { addActivity, getActivity, updateActivity } from "../api/activities"
import { Loader2, AlertCircle } from "lucide-react"

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
    return <p className="flex flex-col items-center gap-3 bg-white rounded-2xl shadow-sm p-10 text-lg font-bold text-ink-soft"><Loader2 className="w-10 h-10 text-brand motion-safe:animate-spin" aria-hidden="true" />טוען...</p>
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-10">
      <div className="flex h-1.5 rounded-full overflow-hidden mb-8" aria-hidden="true">
        <span className="flex-1 bg-craft"></span>
        <span className="flex-1 bg-game"></span>
        <span className="flex-1 bg-move"></span>
        <span className="flex-1 bg-think"></span>
        <span className="flex-1 bg-kitchen"></span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-6">{isEdit ? 'עריכת פעילות' : 'הוספת פעילות'}</h1>
      {mutation.isPending && <p className="flex items-center gap-2 rounded-xl bg-mint text-brand font-bold px-4 py-3 mb-5"><Loader2 className="w-5 h-5 motion-safe:animate-spin" aria-hidden="true" />שומר...</p>}
      {mutation.error && <p className="flex items-center gap-2 rounded-xl bg-danger-bg text-danger font-bold px-4 py-3 mb-5"><AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />שגיאה: {mutation.error.message}</p>}
      <ActivityForm key={id ?? 'new'} onSubmit={(values) => mutation.mutate(values)} defaultValues={activity} />
    </div>
  )
}