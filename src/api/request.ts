const BASE_URL = import.meta.env.VITE_API_URL



export async function request(path: string, method = 'GET', body?: unknown, token?: string | null) {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    const response = await fetch(BASE_URL + path, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined
    })
    if (response.status === 401 && token) {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    if (response.status === 204) {
        return null
    }
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error.message)
    }
    return data
} 