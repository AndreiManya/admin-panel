import { FC, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../App'
import { SIGN_IN, SIGN_UP, USERS_LIST } from '../routes'

const Header: FC = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const logout = (): void => {
    setAuth(false)
  }
  return (
    <header className="header">
      <nav className="nav">
        {!auth && (
          <>
            <NavLink className="nav__link" to={SIGN_IN}>
              Sign in
            </NavLink>
            <NavLink className="nav__link" to={SIGN_UP}>
              Sign up
            </NavLink>
          </>
        )}
        {auth && (
          <>
            <NavLink className="nav__link" to={USERS_LIST}>
              Users
            </NavLink>
            <NavLink className="nav__link" to={SIGN_IN} onClick={logout}>
              Logout
            </NavLink>
          </>
        )}
      </nav>
    </header>
  )
}
export default Header
