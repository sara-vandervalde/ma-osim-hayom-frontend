export type Role = 'PARENT' | 'CHILD'
export type Category = 'GAME' | 'THINKING' | 'KITCHEN' | 'MOVEMENT' | 'CRAFT'
export type Place = 'HOME' | 'OUTDOOR'
export type Cost = 'FREE' | 'PAID'
export type Status = 'PENDING' | 'APPROVED'

export type User = {
    id: number,
    username: string,
    displayName: string,
    role: Role,
    parentId: number | null
}

export type Activity = {
    id: number,
    title: string,
    description: string,
    category: Category,
    location: Place,
    minAge: number,
    maxAge: number,
    durationMinutes: number,
    cost: Cost,
    isPublic: boolean,
    status: Status,
    familyId: number,
    createdBy: { id: number, displayName: string, role: Role },
    createdAt: string,
    updatedAt: string
}

export type ActivityInput = {
    title: string,
    description: string,
    category: Category,
    location: Place,
    minAge: number,
    maxAge: number,
    durationMinutes: number,
    cost: Cost,
    isPublic?: boolean
}