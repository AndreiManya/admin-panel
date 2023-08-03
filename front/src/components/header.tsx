import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { SIGN_IN, SIGN_UP } from '../routes'

const Header: FC = () => {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink className="nav__link" to={SIGN_IN}>
          Sign in
        </NavLink>
        <NavLink className="nav__link" to={SIGN_UP}>
          Sign up
        </NavLink>
      </nav>
    </header>
  )
}
export default Header
