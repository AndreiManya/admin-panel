import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header'

const MainLayout: FC = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
