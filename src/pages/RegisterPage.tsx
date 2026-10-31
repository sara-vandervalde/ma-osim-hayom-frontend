import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import type { Role } from "../types"
import { useForm } from "react-hook-form"
import { register as registerUser } from "../api/auth"

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
    <>
      <h1>הרשמה</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>שם משתמש</label>
        <input {...register('username', {
          required: 'חובה',
          minLength: { value: 3, message: 'לפחות 3 תווים' },
          maxLength: { value: 30, message: 'לא יותר מ-30 תווים'},
          pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'רק אותיות אנגלית, ספרות וקו תחתון' },
        })} />
        {errors.username && <p>{errors.username.message}</p>}

        <label>סיסמה</label>
        <input type="password" {...register('password', {
          required: 'חובה',
          minLength: { value: 6, message: 'לפחות 6 תווים' },
          maxLength: { value: 100, message: 'עד 100 תווים' },
        })} />
        {errors.password && <p>{errors.password.message}</p>}

        <label>שם תצוגה</label>
        <input {...register('displayName', {
          required: 'חובה',
          minLength: { value: 2, message: 'לפחות 2 תווים' },
          maxLength: { value: 50, message: 'עד 50 תווים' },
        })} />
        {errors.displayName && <p>{errors.displayName.message}</p>}

        <label>תפקיד</label>
        <select {...register('role')}>
          <option value="PARENT">הורה</option>
          <option value="CHILD">ילד</option>
        </select>

        {role === 'CHILD' && (
          <>
            <label>שם משתמש של ההורה</label>
            <input {...register('parentUsername',{required:'חובה לילד'})} />
            {errors.parentUsername && <p>{errors.parentUsername.message}</p>}
          </>
        )}

        {serverError && <p>{serverError}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'המערכת מעבבדת נתונים...' : 'הרשמה'}
        </button>
      </form>
    </>
  )
}

