'use client'

import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import { useHandleAuth } from '@/hooks/useHandleAuth'
import { Toaster } from 'react-hot-toast'
import { SignIn } from '@/app/services/auth/signin'

export const SignInForm = () => {
  const { data: session, status } = useSession()
  const checkAuth = useHandleAuth(status)

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  })

  const inputControll = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await SignIn(formData)
    } catch (error: any) {
      // throw new Error(error)
    } finally {
      setIsSubmitting(false)
    }

  }

  if (checkAuth) {
    return checkAuth
  }

  return (
    <form onSubmit={handleLogin}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className='flex flex-col gap-2 py-2 mt-4'>
        <label htmlFor="email" className='text-neutral-400'>Email</label>
        <input type="email" name='Email' placeholder='yourmail@mail.com' className='px-3 rounded-full p-1 text-black bg-blue-100' onChange={inputControll} required />
      </div>
      <div className='flex flex-col gap-2 py-2'>
        <label htmlFor="password" className='text-neutral-400'>Password</label>
        <input type="password" name='Password' placeholder='********' className='px-3 rounded-full p-1 text-black bg-blue-100' onChange={inputControll} required />
      </div>
      <button className={`text-center bg-indigo-700 hover:bg-indigo-900 duration-300 w-full mt-12 p-2 rounded-full ${isSubmitting && 'cursor-not-allowed'}`}>LOGIN</button>
    </form>
  )
}
