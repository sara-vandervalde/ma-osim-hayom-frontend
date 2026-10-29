import type { Category, Cost, Place, Status } from "./types";

export const categoryLabels: Record<Category, string> = {
    GAME: 'משחק',
    THINKING: 'חשיבה',
    KITCHEN: 'מטבח',
    MOVEMENT: 'תנועה',
    CRAFT: 'יצירה'
}

export const placeLabels: Record<Place, string> = {
    HOME: 'בבית',
    OUTDOOR: 'בחוץ'
}

export const costLabels: Record<Cost, string> = {
    FREE: 'בחינם',
    PAID: 'בתשלום'
}

export const statusLabels: Record<Status, string> = {
    PENDING: 'ממתין לאישור',
    APPROVED: 'מאושר'
}

