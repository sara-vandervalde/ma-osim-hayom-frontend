import { useForm } from "react-hook-form"
import type { ActivityInput } from "../types"
import { categoryLabels, costLabels, placeLabels } from "../labels"
import { useAuth } from "../context/AuthContext"

type Props = {
    onSubmit: (values: ActivityInput) => void
    defaultValues?: ActivityInput
}

export default function ActivityForm({ onSubmit ,defaultValues}: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<ActivityInput>({defaultValues})
    const auth = useAuth()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>שם הפעילות</label>
            <input {...register('title', {
                required: 'חובה למלא כותרת',
                minLength: { value: 2, message: 'מינמום 2 תווים' },
                maxLength: { value: 100, message: 'מקסימום 100 תווים' },
            })} />
            {errors.title && <p>{errors.title.message}</p>}

            <label>תיאור</label>
            <textarea {...register('description', {
                required: 'חובה למלא תאור',
                minLength: { value: 5, message: 'מינימום 5 תווים' },
                maxLength: { value: 2000, message: 'מקסימום 2000 תווים' },
            })} />
            {errors.description && <p>{errors.description.message}</p>}

            <label>קטגוריה</label>
            <select {...register('category')}>
                {Object.entries(categoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>

            <label>מיקום</label>
            <select {...register('location')}>
                {Object.entries(placeLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>

            <label>מגיל</label>
            <input type="number" {...register('minAge', {
                valueAsNumber: true,
                required: 'חובה',
                min: { value: 0, message: 'מינימום גיל 0' },
                max: { value: 18, message: 'מקסימום גיל 18' },
            })} />
            {errors.minAge && <p>{errors.minAge.message}</p>}


            <label>עד גיל</label>
            <input type="number" {...register('maxAge', {
                valueAsNumber: true,
                required: 'חובה',
                min: { value: 0, message: 'מינימום גיל 0' },
                max: { value: 18, message: '18 מקסימום גיל' },
                validate: (value, values) => value >= values.minAge || 'גיל מקסימלי גדול או שווה לגיל מינימלי',
            })} />
            {errors.maxAge && <p>{errors.maxAge.message}</p>}


            <label>משך זמן (בדקות)</label>
            <input type="number" {...register('durationMinutes', {
                valueAsNumber: true,
                required: 'חובה',
                min: { value: 1, message: 'מינמום 1 דקה' },
                max: { value: 600, message: 'מקסימום 600 דקות' },
            })} />
            {errors.durationMinutes && <p>{errors.durationMinutes.message}</p>}


            <label>עלות</label>
            <select {...register('cost')}>
                {Object.entries(costLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>

            {auth.user?.role === 'PARENT' && (
                <label>
                    <input type="checkbox" {...register('isPublic')} />
                    ציבורי
                </label>
            )}

            <button type="submit">שמירה</button>
        </form>
    )
}
