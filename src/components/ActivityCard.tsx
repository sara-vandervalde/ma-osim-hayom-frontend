import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { categoryLabels, costLabels, placeLabels } from "../labels"
import type { Activity } from "../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteActivity, approveActivity } from "../api/activities"
import { categoryStyles } from "../categoryStyles"
import { Baby, Clock, MapPin, Wallet, Hourglass, Pencil, Trash2, Check, Globe, AlertCircle } from "lucide-react"


type Props = {
    activity: Activity
}

export default function ActivityCard({ activity }: Props) {
    const auth = useAuth()
    const queryClient = useQueryClient()
    const user = auth.user
    const canEdit =
        (user?.role === 'PARENT' && activity.familyId === user.id) ||
        (user?.role === 'CHILD' && activity.createdBy.id === user.id && activity.status === 'PENDING')

    const deleteMutation = useMutation({
        mutationFn: () => deleteActivity(auth.token!, activity.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] })
        },
    })

    function handleDelete() {
        if (window.confirm('למחוק את הפעילות?')) {
            deleteMutation.mutate()
        }
    }

    const canApprove = user?.role === 'PARENT' && activity.status === 'PENDING'

    const approveMutation = useMutation({
        mutationFn: (isPublic: boolean) => approveActivity(auth.token!, activity.id, isPublic),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] })
        },
    })
    // עיצוב בלבד: הצבע והאייקון של הקטגוריה
    const style = categoryStyles[activity.category]
    const CategoryIcon = style.icon

    return (
        <div className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition border-t-4 ${style.border} p-6 flex flex-col gap-4`}>
            <p className={`self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${style.chip}`}>
                <CategoryIcon className="w-4 h-4" aria-hidden="true" />
                {categoryLabels[activity.category]}
            </p>
            <h3 className="text-xl font-bold text-ink">{activity.title}</h3>
            <p className="text-base leading-relaxed text-ink-soft">{activity.description}</p>

            <div className="flex flex-col gap-2.5 text-sm font-medium text-ink-soft bg-mint/50 rounded-xl p-4">
                <p className="flex items-center gap-1.5"><Baby className="w-4 h-4 shrink-0" aria-hidden="true" />גילאים: {activity.minAge} - {activity.maxAge}</p>
                <p className="flex items-center gap-1.5"><Clock className="w-4 h-4 shrink-0" aria-hidden="true" />משך זמן: {activity.durationMinutes} דקות</p>
                <p className="flex items-center gap-1.5"><MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />מקום פעילות: {placeLabels[activity.location]}</p>
                <p className="flex items-center gap-1.5"><Wallet className="w-4 h-4 shrink-0" aria-hidden="true" />מחיר: {costLabels[activity.cost]}</p>
            </div>

            {activity.status === 'PENDING' && (
                <p className="flex items-center gap-2 rounded-xl bg-warn-bg text-warn text-sm font-bold px-3 py-2"><Hourglass className="w-4 h-4 shrink-0" aria-hidden="true" /> ממתין לאישור, הוצע על ידי {activity.createdBy.displayName}</p>
            )}

            {deleteMutation.error && (
                <p className="flex items-center gap-2 rounded-xl bg-danger-bg text-danger text-sm font-bold px-3 py-2"><AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />שגיאה במחיקה: {deleteMutation.error.message}</p>
            )}
            {approveMutation.error && (
                <p className="flex items-center gap-2 rounded-xl bg-danger-bg text-danger text-sm font-bold px-3 py-2"><AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />שגיאה באישור: {approveMutation.error.message}</p>
            )}

            {(canEdit || canApprove) && (
                <div className="flex flex-wrap gap-2 pt-3 mt-auto border-t border-line">
                    {canEdit && <Link to={`/activities/${activity.id}/edit`} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-line font-bold text-ink hover:border-brand hover:text-brand transition"><Pencil className="w-4 h-4" aria-hidden="true" />ערוך</Link>}
                    {canEdit && <button onClick={handleDelete} disabled={deleteMutation.isPending} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-danger hover:bg-danger-bg transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"><Trash2 className="w-4 h-4" aria-hidden="true" />{deleteMutation.isPending ? 'מוחק...' : 'מחק'}</button>}
                    {canApprove && (
                        <>
                            <button onClick={() => approveMutation.mutate(false)} disabled={approveMutation.isPending} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ok text-white font-bold hover:opacity-90 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"><Check className="w-4 h-4" aria-hidden="true" />{approveMutation.isPending ? 'מאשר...' : 'אשר למשפחה'}</button>
                            <button onClick={() => approveMutation.mutate(true)} disabled={approveMutation.isPending} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-ok text-ok font-bold hover:bg-ok-bg transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"><Globe className="w-4 h-4" aria-hidden="true" />{approveMutation.isPending ? 'מאשר...' : 'אשר כציבורי'}</button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
