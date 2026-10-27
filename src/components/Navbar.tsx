import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const auth = useAuth()

  return (
    <nav>
      {auth.user ? (
        <>
          <span>שלום, {auth.user.displayName}</span>
          <Link to="/activities">פעילויות</Link>
          <Link to="/activities/new">פעילות חדשה</Link>
          <button onClick={() => auth.signOut()}>התנתקות</button>
        </>
      ) : (
        <>
          <Link to="/login">התחברות</Link>
          <Link to="/register">הרשמה</Link>
        </>
      )}
    </nav>
  )
}