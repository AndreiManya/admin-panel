export interface IUser {
  token: string
  id: number
}

export interface IUsersData {
  id: React.Key
  name: string
  email: string
  password: string
  date: Date
  lastLogin: Date
  status: string
}
