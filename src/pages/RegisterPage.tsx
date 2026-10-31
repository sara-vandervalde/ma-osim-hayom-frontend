import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import type { Role } from "../types"
import { useForm } from "react-hook-form"
import { register as registerUser } from "../api/auth"
import { User, Lock, Smile, Users, UserCheck, ChevronDown, Eye, EyeOff, Sparkles, Lightbulb, Globe, HeartHandshake } from "lucide-react"

type RegisterForm = {
  username: string
  password: string
  displayName: string
  role: Role
  parentUsername?: string
}

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterForm>()
  const auth = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const role = watch('role')

  async function onSubmit(values: RegisterForm) {
    setServerError(null)
    try {
      const data = await registerUser(values)
      auth.signIn(data.token, data.user)
    } catch (err) {
      setServerError((err as Error).message)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center py-6">

      {/* עיצוב בלבד: רקע צבעוני שמתחלף לאט, על כל המסך */}
      <div className="fixed inset-0 -z-10 bg-shift motion-safe:animate-shift pointer-events-none" aria-hidden="true"></div>

      <p className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur shadow-sm text-ink-soft font-medium text-center">
        <Sparkles className="w-4 h-4 text-sun shrink-0" aria-hidden="true" />
        משפחה אחת, אינסוף רעיונות
      </p>

    <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-xl bg-white">

      {/* עיצוב בלבד: לוח קבלת פנים */}
      <div className="relative overflow-hidden bg-brand text-white p-8 md:p-10 flex flex-col justify-center gap-6">
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/10" aria-hidden="true"></div>
        <div className="absolute -bottom-20 -right-10 w-64 h-64 rounded-full bg-sun/20" aria-hidden="true"></div>
        <img src="/logo.svg" alt="" className="relative w-20 h-20 md:w-24 md:h-24 drop-shadow-lg" />
        <p className="relative text-3xl md:text-4xl font-extrabold leading-tight">מצטרפים למשפחה</p>
        <ul className="relative flex flex-col gap-4 text-base">
          <li className="flex items-start gap-3">
            <span className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-white/15 ring-1 ring-white/25"><HeartHandshake className="w-5 h-5" aria-hidden="true" /></span>
            <span className="pt-1.5 text-white/90">הורים מוסיפים רעיונות ומאשרים את מה שהילדים מציעים</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-white/15 ring-1 ring-white/25"><Lightbulb className="w-5 h-5" aria-hidden="true" /></span>
            <span className="pt-1.5 text-white/90">ילדים בוחרים פעילות לבד, ומציעים רעיונות משלהם</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-white/15 ring-1 ring-white/25"><Globe className="w-5 h-5" aria-hidden="true" /></span>
            <span className="pt-1.5 text-white/90">רעיונות ציבוריים ממשפחות אחרות, מוכנים לשימוש</span>
          </li>
        </ul>
      </div>

      <div className="p-8 md:p-10">
        <div className="flex h-1.5 rounded-full overflow-hidden mb-8" aria-hidden="true">
          <span className="flex-1 bg-craft"></span>
          <span className="flex-1 bg-game"></span>
          <span className="flex-1 bg-move"></span>
          <span className="flex-1 bg-think"></span>
          <span className="flex-1 bg-kitchen"></span>
        </div>
      <h1 className="text-3xl font-extrabold text-ink mb-6">הרשמה</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <label className="font-bold">שם משתמש</label>
        <div className="relative group">
          <User className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
          <input {...register('username', {
            required: 'חובה',
            minLength: { value: 3, message: 'לפחות 3 תווים' },
            maxLength: { value: 30, message: 'לא יותר מ-30 תווים'},
            pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'רק אותיות אנגלית, ספרות וקו תחתון' },
          })} className="w-full rounded-xl border-2 border-line bg-mint/40 ps-12 pe-4 py-3.5 text-base transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
        </div>
        {errors.username && <p className="text-sm text-danger font-medium">{errors.username.message}</p>}

        <label className="font-bold mt-3">סיסמה</label>
        <div className="relative group">
          <Lock className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
          <input type={showPassword ? 'text' : 'password'} {...register('password', {
            required: 'חובה',
            minLength: { value: 6, message: 'לפחות 6 תווים' },
            maxLength: { value: 100, message: 'עד 100 תווים' },
          })} className="w-full rounded-xl border-2 border-line bg-mint/40 ps-12 pe-12 py-3.5 text-base transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'הסתרת הסיסמה' : 'הצגת הסיסמה'}
            className="absolute top-1/2 -translate-y-1/2 end-3 p-1.5 rounded-lg text-ink-soft hover:text-brand hover:bg-mint transition cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-danger font-medium">{errors.password.message}</p>}

        <label className="font-bold mt-3">שם תצוגה</label>
        <div className="relative group">
          <Smile className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
          <input {...register('displayName', {
            required: 'חובה',
            minLength: { value: 2, message: 'לפחות 2 תווים' },
            maxLength: { value: 50, message: 'עד 50 תווים' },
          })} className="w-full rounded-xl border-2 border-line bg-mint/40 ps-12 pe-4 py-3.5 text-base transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
        </div>
        {errors.displayName && <p className="text-sm text-danger font-medium">{errors.displayName.message}</p>}

        <label className="font-bold mt-3">תפקיד</label>
        <div className="relative group">
          <Users className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
          <select {...register('role')} className="w-full appearance-none cursor-pointer rounded-xl border-2 border-line bg-mint/40 ps-12 pe-12 py-3.5 text-base transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15">
            <option value="PARENT">הורה</option>
            <option value="CHILD">ילד</option>
          </select>
          <ChevronDown className="absolute top-1/2 -translate-y-1/2 end-4 w-5 h-5 text-ink-soft pointer-events-none" aria-hidden="true" />
        </div>

        {role === 'CHILD' && (
          <div className="mt-3 flex flex-col gap-2 rounded-2xl bg-mint p-4 ring-1 ring-line">
            <label className="font-bold">שם משתמש של ההורה</label>
            <div className="relative group">
              <UserCheck className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
              <input {...register('parentUsername',{required:'חובה לילד'})} className="w-full rounded-xl border-2 border-line bg-white ps-12 pe-4 py-3.5 text-base transition focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/15" />
            </div>
            {errors.parentUsername && <p className="text-sm text-danger font-medium">{errors.parentUsername.message}</p>}
          </div>
        )}

        {serverError && <p className="rounded-xl bg-danger-bg text-danger font-medium px-4 py-3 mt-3">{serverError}</p>}
        <button type="submit" disabled={isSubmitting} className="mt-6 px-6 py-4 rounded-xl bg-brand text-white text-lg font-bold shadow-md shadow-brand/30 transition hover:bg-brand-dark hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer">
          {isSubmitting ? 'המערכת מעבדת נתונים...' : 'הרשמה'}
        </button>
      </form>
      </div>
    </div>
    </div>
  )
}

