import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { categoryLabels, costLabels, placeLabels } from "../labels"
import type { Activity } from "../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteActivity, approveActivity } from "../api/activities"


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
    return (
        <div>
            <h3>{activity.title}</h3>
            <p>תיאור: {activity.description}</p>
            <p>קטגוריה: {categoryLabels[activity.category]}</p>
            <p>גילאים: {activity.minAge} - {activity.maxAge}</p>
            <p>משך זמן: {activity.durationMinutes} דקות</p>
            <p>מקום פעילות: {placeLabels[activity.location]}</p>
            <p>מחיר: {costLabels[activity.cost]}</p>

            {activity.status === 'PENDING' && (
                <p> ממתין לאישור, הוצע על ידי {activity.createdBy.displayName}</p>
            )}

            {canEdit && <Link to={`/activities/${activity.id}/edit`}>ערוך</Link>}
            {canEdit && <button onClick={handleDelete}>מחק</button>}
            {canApprove && (
                <>
                    <button onClick={() => approveMutation.mutate(false)}>אשר למשפחה</button>
                    <button onClick={() => approveMutation.mutate(true)}>אשר כציבורי</button>
                </>
            )}
        </div>
    )
}
