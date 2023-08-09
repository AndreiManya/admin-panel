import { FC, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { LoadingContext } from '../App'
import Header from '../components/header'
import Spinner from '../components/spinner'

const MainLayout: FC = () => {
  const { loading } = useContext(LoadingContext)
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      {loading && <Spinner />}
    </>
  )
}

export default MainLayout
