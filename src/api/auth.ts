import { request } from './request'
import type { Role, User } from '../types'


export async function login(userDetails : { username: string, password: string }): Promise<{ token: string, user: User }> {
  const data = await request('/auth/login', 'POST', userDetails)
  return data
}

export async function register(newUser:{
    username:string,
    password:string,
    displayName:string,
    role: Role,
    parentUsername?: string}) :Promise<{token:string, user: User }>{
    const data = await request('/auth/register','POST',newUser)
    return data
}

export async function getMe(token: string): Promise<User> {
  const data = await request(`/auth/me`, 'GET', undefined,token)
  return data.user
}
