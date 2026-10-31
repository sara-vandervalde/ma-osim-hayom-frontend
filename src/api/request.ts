const BASE_URL = import.meta.env.VITE_API_URL



export async function request(path: string, method = 'GET', body?: unknown, token?: string | null) {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    let response: Response
    try {
        response = await fetch(BASE_URL + path, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : undefined
        })
    } catch {
        throw new Error('אין חיבור לשרת. בדקו את החיבור לאינטרנט ונסו שוב')
    }
    if (response.status === 401 && token) {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    if (response.status === 204) {
        return null
    }
    let data
    try {
        data = await response.json()
    } catch {
        throw new Error('השרת החזיר תשובה לא תקינה. נסו שוב בעוד רגע')
    }
    if (!response.ok) {
        throw new Error(data.error?.message ?? 'משהו השתבש. נסו שוב')
    }
    return data
} 