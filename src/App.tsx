
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
      <h1>מה עושים היום?</h1>

      {/* {auth.loading && <p>טוען...</p>} */}

      {/* <p>{auth.user ? auth.user.displayName : 'אין משתמש מחובר'}</p> */}


      {/* <button onClick={() => auth.signOut()}>התנתקות</button> */}

      <Navbar></Navbar>
        <Routes>
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
          <Route path="/activities" element={<ProtectedRoute><ActivitiesPage /></ProtectedRoute>} />
          <Route path="/activities/new" element={<ProtectedRoute><ActivityFormPage /></ProtectedRoute>} />
          <Route path="/activities/:id/edit" element={<ProtectedRoute><ActivityFormPage /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </>
  )
}

export default App
