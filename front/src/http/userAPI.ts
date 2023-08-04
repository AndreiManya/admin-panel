import { $authHost, $host } from './index'
import IUser from '../@types/user'

export const login = async (username: string, password: string): Promise<IUser> => {
  const { data } = await $host.post<IUser>('login', { username, password })
  localStorage.setItem('token', data.jwtToken)
  localStorage.setItem('user', JSON.stringify(data.username))
  return data
}

export const register = async (username: string, password: string): Promise<IUser> => {
  const { data } = await $host.post<IUser>('login', { username, password })
  localStorage.setItem('token', data.jwtToken)
  localStorage.setItem('user', JSON.stringify(data.username))
  return data
}
