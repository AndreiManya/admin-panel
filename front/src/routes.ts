import Login from './pages/login'
import Registration from './pages/registration'
import Users from './pages/users'

export const SIGN_IN = '/singin'
export const SIGN_UP = '/singup'
export const USERS_LIST = '/user'

export const publicRoutes = [
  {
    path: SIGN_IN,
    Component: Login
  },
  {
    path: SIGN_UP,
    Component: Registration
  }
]

export const privateRoutes = [
  {
    path: USERS_LIST,
    Component: Users
  }
]
