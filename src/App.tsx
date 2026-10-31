
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ActivityFormPage from './pages/ActivityFormPage'
import ActivitiesPage from './pages/ActivitiesPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'


// request('/health').then((data) => console.log('תשובה מהשרת:', data)).catch((err) => console.log('שגיאה:', err.message))
// request('/no-such-page').then((data) => console.log('תשובה מהשרת:', data)).catch((err) => console.log('שגיאה:', err.message))
// request('/auth/login','POST',{username:'parent_demo',password:'Demo1234'}).then((data) => console.log('תשובה מהשרת:', data)).catch((err) => console.log('שגיאה:', err.message))
// request('/health/7','DELETE').then((data) => console.log('תשובה מהשרת:', data)).catch((err) => console.log('שגיאה:', err.message))
// request('/auth/me').then((data) => console.log('תשובה מהשרת:', data)).catch((err) => console.log('שגיאה:', err.message))
// request('/auth/login','POST',{username:'parent_demo',password:'Demo1234'})
//   .then((data) => {
//     console.log('login: ', data)
//     request('/auth/me','GET',undefined,data.token)
//   .then((me) => console.log(' me: ', me))
//   .catch((err) => console.log('שגיאה:', err.message))
// })
// .catch((err) => console.log('שגיאה:', err.message))



function App() {
  return (
    <>
      <header className="bg-white border-b border-line">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <h1 className="flex items-center gap-2 text-xl md:text-2xl font-extrabold text-ink">
            <img src="/logo.svg" alt="" className="w-10 h-10 md:w-11 md:h-11" />
            מה עושים היום?
          </h1>

          {/* {auth.loading && <p>טוען...</p>} */}

          {/* <p>{auth.user ? auth.user.displayName : 'אין משתמש מחובר'}</p> */}


          {/* <button onClick={() => auth.signOut()}>התנתקות</button> */}

          <Navbar></Navbar>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <Routes>
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
          <Route path="/activities" element={<ProtectedRoute><ActivitiesPage /></ProtectedRoute>} />
          <Route path="/activities/new" element={<ProtectedRoute><ActivityFormPage /></ProtectedRoute>} />
          <Route path="/activities/:id/edit" element={<ProtectedRoute><ActivityFormPage /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
