import React, { useState } from 'react'
import { login as authLogin } from '../store/auth'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Logo from './Logo'
import Input from './Input'
import Button from './Button'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState(false)

  const Login = async (data) => {
    setError(false)
    try {
      const session = authService.login(data)
      // if (!session.ok) {
      //   throw new Error()
      // }
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
        navigate("/")
      }

    } catch (error) {
      setError(error.message)
    }
  }


  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>

        <h2 className='text-center text-2xl font-bold leading-tight '>Sigin To your account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
          Dont&apos;t have any accout? &nbsp;
          <Link to="/signup"
            className='font-medium text-primary transition-all duration-200 hover:underline'>
            Signup
          </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

        <form onSubmit={handleSubmit(Login)} className='mt-8 '>
          <div className='space-y-5'>
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,

              })} />

            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true
              })} />

            <Button
              type='Submit'>SignIn</Button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login
