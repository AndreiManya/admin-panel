import { FC, createContext, useState } from 'react'
import { publicRoutes, SIGN_IN } from './routes'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import './scss/app.scss'
import { IAuth, ILoading } from './@types/context'

export const AuthContext = createContext<IAuth>({
  auth: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuth: () => {}
})
export const LoadingContext = createContext<ILoading>({
  loading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoading: () => {}
})

const App: FC = () => {
  const [auth, setAuth] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <Routes>
          <Route path="*" element={<Navigate to={SIGN_IN} />} />
          <Route path="/" element={<MainLayout />}>
            {publicRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            {!auth && <Route path="*" element={<Navigate to={SIGN_IN} />} />}
          </Route>
        </Routes>
      </LoadingContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
