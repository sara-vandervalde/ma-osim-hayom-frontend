import { request } from './request'
import type { Activity, ActivityInput, Category } from '../types'

export async function getActivities(token: string,category?:Category): Promise<Activity[]> {
  const path = category ? `/activities?category=${category}` : '/activities'
  const data = await request(path, 'GET', undefined,token)
  return data.activities
}

export async function getActivity(token: string,id:number): Promise<Activity> {
  const data = await request(`/activities/${id}`, 'GET', undefined,token)
  return data.activity
}

export async function addActivity(token: string,newActivity:ActivityInput): Promise<Activity> {
  const data = await request(`/activities`, 'POST', newActivity,token)
  return data.activity
}


export async function updateActivity(token: string,id:number,activityInput:ActivityInput): Promise<Activity> {
  const data = await request(`/activities/${id}`, 'PUT', activityInput,token)
  return data.activity
}

export async function deleteActivity(token: string,id:number): Promise<null> {
  const data = await request(`/activities/${id}`, 'DELETE', undefined,token)
  return data
}

export async function approveActivity(token: string,id:number, isPublic: boolean): Promise<Activity> {
  const data = await request(`/activities/${id}/approve`, 'PATCH', {isPublic: isPublic},token)
  return data.activity
}

