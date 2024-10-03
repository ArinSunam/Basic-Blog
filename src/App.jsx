import React, { useEffect, useState } from 'react'
import { Footer, Header } from './components'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/auth'
import { Outlet } from 'react-router-dom'


const App = () => {

  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then(
        (userData) => {
          if (userData) {
            dispatch(login(userData))
          } else {
            dispatch(logout())
          }
        }
      )
      .finally(
        () => setIsLoading(false)
      )
  }, [])

  return !isLoading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <p>loading</p>
  )

}

export default App
