import { FC, createContext, useState } from 'react'
import { publicRoutes, SIGN_IN } from './routes'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import './scss/app.scss'

interface IAuth {
  auth: boolean
  setAuth: (c: boolean) => void
}
export const AuthContext = createContext<IAuth>({
  auth: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuth: () => {}
})

const App: FC = () => {
  const [auth, setAuth] = useState<boolean>(false)
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Routes>
        <Route path="*" element={<Navigate to={SIGN_IN} />} />
        <Route path="/" element={<MainLayout />}>
          {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          {!auth && <Route path="*" element={<Navigate to={SIGN_IN} />} />}
        </Route>
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
