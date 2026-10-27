
import { createContext, useEffect, useState,useContext } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types'
import { getMe } from '../api/auth'


type AuthContextType = {
    user: User | null
    token: string | null
    signIn: (token: string, user: User) => void
    signOut: () => void
    loading: boolean
}


export const AuthContext = createContext<AuthContextType | null>(null)


export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    const [loading, setLoading] = useState<boolean>(localStorage.getItem('token') !== null)

    function signIn(newToken: string, newUser: User) {
        localStorage.setItem('token', newToken)
        setToken(newToken)
        setUser(newUser)
    }

    function signOut() {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }

    useEffect(() => {
        if (token && !user) {
            getMe(token)
                .then((me) => setUser(me))
                .catch(() => signOut())
                .finally(() => setLoading(false))
        }
    }, [token])


    return (
        <AuthContext.Provider value={{ user, token, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    )
}



    export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}