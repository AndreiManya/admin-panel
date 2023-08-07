import { $authHost, $host } from './index'
import IUser from '../@types/user'

export const login = async (name: string, password: string): Promise<IUser> => {
  const { data } = await $host.post<IUser>('login', { name, password })
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.name))
  return data
}

export const register = async (
  username: string,
  password: string,
  email: string
): Promise<IUser> => {
  const { data } = await $host.post<IUser>('register', { username, password, email })
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.name))
  return data
}
