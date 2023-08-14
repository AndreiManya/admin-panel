import { $authHost, $host } from './index'
import { IUser, IUsersData } from '../@types/user'
import { Key } from 'react'

export const login = async (name: string, password: string): Promise<IUser> => {
  const { data } = await $host.post<IUser>('login', { name, password })
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.id))
  return data
}

export const register = async (name: string, password: string, email: string): Promise<IUser> => {
  const { data } = await $host.post<IUser>('register', { name, password, email })
  return data
}

export const getUsers = async (): Promise<IUsersData[]> => {
  const { data } = await $authHost.get<IUsersData[]>('users')
  return data
}

export const changeStatus = async (users: Key[], status: string): Promise<string> => {
  const { data } = await $authHost.put<string>('users', { users, status })
  return data
}

export const deleteUsers = async (users: Key[]): Promise<Key> => {
  const { data } = await $authHost.delete<Key>('users', { data: { users } })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data
}
