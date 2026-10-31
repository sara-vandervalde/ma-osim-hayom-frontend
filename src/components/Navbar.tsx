import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const auth = useAuth()

  return (
    <nav className="flex flex-wrap items-center gap-2 text-base font-medium">
      {auth.user ? (
        <>
          <span className="text-ink-soft px-2">שלום, {auth.user.displayName}</span>
          <Link to="/activities" className="px-3 py-2 rounded-xl hover:bg-mint">פעילויות</Link>
          <Link to="/activities/new" className="px-4 py-2 rounded-xl bg-brand text-white font-bold hover:bg-brand-dark">פעילות חדשה</Link>
          <button onClick={() => auth.signOut()} className="px-3 py-2 rounded-xl text-ink-soft hover:bg-mint cursor-pointer">התנתקות</button>
        </>
      ) : (
        <>
          <Link to="/login" className="px-3 py-2 rounded-xl hover:bg-mint">התחברות</Link>
          <Link to="/register" className="px-4 py-2 rounded-xl bg-brand text-white font-bold hover:bg-brand-dark">הרשמה</Link>
        </>
      )}
    </nav>
  )
}
