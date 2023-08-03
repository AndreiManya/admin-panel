import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header'

const MainLayout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default MainLayout
