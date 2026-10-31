import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { login } from '../api/auth'
import { User, Lock, Sparkles, Palette, Dices, Bike, Puzzle, ChefHat, Eye, EyeOff } from 'lucide-react'


type LoginForm = {
  username: string
  password: string
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm<LoginForm>()
  const auth = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)


  async function onSubmit(values: LoginForm) {
    setServerError(null)
    try {
      const data = await login(values)
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
        ההורים לא שוברים את הראש, והילדים בוחרים לבד
      </p>

    <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-xl bg-white">

      {/* עיצוב בלבד: לוח קבלת פנים */}
      <div className="relative overflow-hidden bg-brand text-white p-8 md:p-10 flex flex-col justify-center gap-5">
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/10" aria-hidden="true"></div>
        <div className="absolute -bottom-20 -right-10 w-64 h-64 rounded-full bg-sun/20" aria-hidden="true"></div>
        <img src="/logo.svg" alt="" className="relative w-24 h-24 md:w-28 md:h-28 drop-shadow-lg" />
        <p className="relative text-3xl md:text-4xl font-extrabold leading-tight">שמחים לראות אותך!</p>
        <p className="relative text-lg text-white/90 leading-relaxed">מאות רעיונות לפעילויות עם הילדים, בבית ובחוץ.</p>
        <div className="relative flex flex-wrap gap-2 text-sm font-medium" aria-hidden="true">
          <span className="inline-flex items-center gap-2 ps-1.5 pe-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur"><span className="grid place-items-center w-6 h-6 rounded-full bg-craft"><Palette className="w-3.5 h-3.5" /></span>יצירה</span>
          <span className="inline-flex items-center gap-2 ps-1.5 pe-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur"><span className="grid place-items-center w-6 h-6 rounded-full bg-game"><Dices className="w-3.5 h-3.5" /></span>משחק</span>
          <span className="inline-flex items-center gap-2 ps-1.5 pe-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur"><span className="grid place-items-center w-6 h-6 rounded-full bg-move"><Bike className="w-3.5 h-3.5" /></span>תנועה</span>
          <span className="inline-flex items-center gap-2 ps-1.5 pe-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur"><span className="grid place-items-center w-6 h-6 rounded-full bg-think"><Puzzle className="w-3.5 h-3.5" /></span>חשיבה</span>
          <span className="inline-flex items-center gap-2 ps-1.5 pe-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur"><span className="grid place-items-center w-6 h-6 rounded-full bg-kitchen"><ChefHat className="w-3.5 h-3.5" /></span>מטבח</span>
        </div>
      </div>

      <div className="p-8 md:p-10">
        <div className="flex h-1.5 rounded-full overflow-hidden mb-8" aria-hidden="true">
          <span className="flex-1 bg-craft"></span>
          <span className="flex-1 bg-game"></span>
          <span className="flex-1 bg-move"></span>
          <span className="flex-1 bg-think"></span>
          <span className="flex-1 bg-kitchen"></span>
        </div>
        <h1 className="text-3xl font-extrabold text-ink mb-6">התחברות</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <label className="font-bold">שם משתמש</label>
          <div className="relative group">
            <User className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
            <input {...register('username', { required: 'חובה למלא שם משתמש' })} className="w-full rounded-xl border-2 border-line bg-mint/40 ps-12 pe-4 py-3.5 text-base transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
          </div>
          {errors.username && <p className="text-sm text-danger font-medium">{errors.username.message}</p>}
          <label className="font-bold mt-3"> סיסמה</label>
          <div className="relative group">
            <Lock className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-ink-soft transition group-focus-within:text-brand pointer-events-none" aria-hidden="true" />
            <input type={showPassword ? 'text' : 'password'} {...register('password', { required: 'חובה למלא סיסמה' })} className="w-full rounded-xl border-2 border-line bg-mint/40 ps-12 pe-12 py-3.5 text-base transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
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
          {serverError && <p className="rounded-xl bg-danger-bg text-danger font-medium px-4 py-3 mt-3">{serverError}</p>}
          <button type="submit" disabled={isSubmitting} className="mt-6 px-6 py-4 rounded-xl bg-brand text-white text-lg font-bold shadow-md shadow-brand/30 transition hover:bg-brand-dark hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer">
            {isSubmitting ? 'מתחבר...' : 'התחברות'}</button>
        </form>
      </div>
    </div>
    </div>
  )
}
