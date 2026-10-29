import { categoryLabels, costLabels, placeLabels } from "../labels"
import type { Activity } from "../types"


type Props = {
    activity: Activity
}

export default function ActivityCard({ activity }: Props) {
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
        </div>
    )
}
