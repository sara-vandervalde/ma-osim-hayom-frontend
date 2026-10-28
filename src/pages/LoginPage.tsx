import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { login } from '../api/auth'


type LoginForm = {
  username: string
  password: string
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm<LoginForm>()
  const auth = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)


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
    <>
      <h1>התחברות</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>שם משתמש</label>
        <input {...register('username', { required: 'חובה למלא שם משתמש' })} />
        {errors.username && <p>{errors.username.message}</p>}
        <label> סיסמה</label>
        <input type="password" {...register('password', { required: 'חובה למלא סיסמה' })} />
        {errors.password && <p>{errors.password.message}</p>}
        {serverError && <p>{serverError}</p>}
        <button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'מתחבר...' : 'התחברות'}</button>
      </form>
    </>
  )
}
