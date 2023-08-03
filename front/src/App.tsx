import { FC } from 'react'
import { publicRoutes, SIGN_IN } from './routes'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

const App: FC = () => {
  const isAuth = false
  return (
    <Routes>
      <Route path="*" element={<Navigate to={SIGN_IN} />} />
      <Route path="/" element={<MainLayout />}>
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        {!isAuth && <Route path="*" element={<Navigate to={SIGN_IN} />} />}
      </Route>
    </Routes>
  )
}

export default App
