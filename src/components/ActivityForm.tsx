import { useForm } from "react-hook-form"
import type { ActivityInput } from "../types"
import { categoryLabels, costLabels, placeLabels } from "../labels"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { PenLine, FileText, Tag, MapPin, Wallet, Baby, Clock, Globe, ChevronDown, Save } from "lucide-react"

type Props = {
    onSubmit: (values: ActivityInput) => void
    defaultValues?: ActivityInput
    submitting?: boolean
}

export default function ActivityForm({ onSubmit ,defaultValues, submitting}: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<ActivityInput>({defaultValues})
    const auth = useAuth()
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <label className="font-bold">שם הפעילות</label>
                <div className="relative group">
                    <PenLine className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
                    <input {...register('title', {
                        required: 'חובה למלא כותרת',
                        minLength: { value: 2, message: 'מינימום 2 תווים' },
                        maxLength: { value: 100, message: 'מקסימום 100 תווים' },
                    })} className="w-full rounded-xl border-2 border-line bg-mint/40 ps-12 pe-4 py-3.5 text-base transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
                </div>
                {errors.title && <p className="text-sm text-danger font-medium">{errors.title.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-bold">תיאור</label>
                <div className="relative group">
                    <FileText className="absolute top-4 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
                    <textarea rows={4} {...register('description', {
                        required: 'חובה למלא תאור',
                        minLength: { value: 5, message: 'מינימום 5 תווים' },
                        maxLength: { value: 2000, message: 'מקסימום 2000 תווים' },
                    })} className="w-full rounded-xl border-2 border-line bg-mint/40 ps-12 pe-4 py-3.5 text-base leading-relaxed transition resize-y focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
                </div>
                {errors.description && <p className="text-sm text-danger font-medium">{errors.description.message}</p>}
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                    <label className="font-bold">קטגוריה</label>
                    <div className="relative group">
                        <Tag className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
                        <select {...register('category')} className="w-full appearance-none cursor-pointer rounded-xl border-2 border-line bg-mint/40 ps-12 pe-10 py-3.5 text-base transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15">
                            {Object.entries(categoryLabels).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute top-1/2 -translate-y-1/2 end-3 w-4 h-4 text-ink-soft pointer-events-none" aria-hidden="true" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold">מיקום</label>
                    <div className="relative group">
                        <MapPin className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
                        <select {...register('location')} className="w-full appearance-none cursor-pointer rounded-xl border-2 border-line bg-mint/40 ps-12 pe-10 py-3.5 text-base transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15">
                            {Object.entries(placeLabels).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute top-1/2 -translate-y-1/2 end-3 w-4 h-4 text-ink-soft pointer-events-none" aria-hidden="true" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold">עלות</label>
                    <div className="relative group">
                        <Wallet className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
                        <select {...register('cost')} className="w-full appearance-none cursor-pointer rounded-xl border-2 border-line bg-mint/40 ps-12 pe-10 py-3.5 text-base transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15">
                            {Object.entries(costLabels).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute top-1/2 -translate-y-1/2 end-3 w-4 h-4 text-ink-soft pointer-events-none" aria-hidden="true" />
                    </div>
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                    <label className="font-bold">מגיל</label>
                    <div className="relative group">
                        <Baby className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
                        <input type="number" {...register('minAge', {
                            valueAsNumber: true,
                            required: 'חובה',
                            min: { value: 0, message: 'מינימום גיל 0' },
                            max: { value: 18, message: 'מקסימום גיל 18' },
                            validate: (value) => Number.isInteger(value) || 'יש להזין מספר שלם',
                        })} className="w-full rounded-xl border-2 border-line bg-mint/40 ps-12 pe-4 py-3.5 text-base transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
                    </div>
                    {errors.minAge && <p className="text-sm text-danger font-medium">{errors.minAge.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold">עד גיל</label>
                    <div className="relative group">
                        <Baby className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
                        <input type="number" {...register('maxAge', {
                            valueAsNumber: true,
                            required: 'חובה',
                            min: { value: 0, message: 'מינימום גיל 0' },
                            max: { value: 18, message: 'מקסימום גיל 18' },
                            validate: {
                                wholeNumber: (value) => Number.isInteger(value) || 'יש להזין מספר שלם',
                                notBelowMin: (value, values) => value >= values.minAge || 'גיל מקסימלי גדול או שווה לגיל מינימלי',
                            },
                        })} className="w-full rounded-xl border-2 border-line bg-mint/40 ps-12 pe-4 py-3.5 text-base transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
                    </div>
                    {errors.maxAge && <p className="text-sm text-danger font-medium">{errors.maxAge.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold">משך זמן (בדקות)</label>
                    <div className="relative group">
                        <Clock className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
                        <input type="number" {...register('durationMinutes', {
                            valueAsNumber: true,
                            required: 'חובה',
                            min: { value: 1, message: 'מינימום 1 דקה' },
                            max: { value: 600, message: 'מקסימום 600 דקות' },
                            validate: (value) => Number.isInteger(value) || 'יש להזין מספר שלם',
                        })} className="w-full rounded-xl border-2 border-line bg-mint/40 ps-12 pe-4 py-3.5 text-base transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
                    </div>
                    {errors.durationMinutes && <p className="text-sm text-danger font-medium">{errors.durationMinutes.message}</p>}
                </div>
            </div>

            {auth.user?.role === 'PARENT' && (
                <label className="flex items-center gap-3 rounded-2xl bg-mint p-4 ring-1 ring-line cursor-pointer hover:ring-brand transition">
                    <input type="checkbox" {...register('isPublic')} className="w-5 h-5 accent-brand cursor-pointer" />
                    <Globe className="w-5 h-5 text-brand" aria-hidden="true" />
                    <span className="font-bold">ציבורי</span>
                </label>
            )}

            <div className="flex flex-wrap gap-3 pt-5 border-t border-line">
                <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand text-white text-lg font-bold shadow-md shadow-brand/30 transition hover:bg-brand-dark hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"><Save className="w-5 h-5" aria-hidden="true" />{submitting ? 'שומר...' : 'שמירה'}</button>
                <Link to="/activities" className="inline-flex items-center px-6 py-3.5 rounded-xl border-2 border-line text-lg font-bold text-ink-soft hover:border-brand hover:text-brand transition">ביטול</Link>
            </div>
        </form>
    )
}
