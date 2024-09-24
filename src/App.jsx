import React, { useEffect, useState } from 'react'
import { Footer, Header } from './components'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/auth'

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
    <>
      <Header />
      <Footer />
    </>
  ) : (
    <p>loading</p>
  )

}

export default App
