import { FC } from 'react'
import { publicRoutes, SIGN_IN } from './routes'
import { Routes, Route, Navigate } from 'react-router-dom'

const App: FC = () => {
  const isAuth = false
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {!isAuth && <Route path="*" element={<Navigate to={SIGN_IN} />} />}
    </Routes>
  )
}

export default App
