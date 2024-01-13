'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'


export const SignInForm = () => {
  const { data: session, status } = useSession()
  if (status === 'authenticated') {
    redirect('/')
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const inputControll = (e: any) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    await signIn('credentials', {
      Email: formData.email,
      Password: formData.password,
      callbackUrl: '/',
      redirect: true
    })
  }

  return (
    <form onSubmit={handleLogin}>
      <div className='flex flex-col gap-2 py-2 mt-4'>
        <label htmlFor="email" className='text-neutral-400'>Email</label>
        <input type="email" name='email' placeholder='yourmail@mail.com' className='px-3 rounded-full p-1 text-black bg-blue-100' onChange={inputControll} />
      </div>
      <div className='flex flex-col gap-2 py-2'>
        <label htmlFor="password" className='text-neutral-400'>Password</label>
        <input type="password" name='password' placeholder='********' className='px-3 rounded-full p-1 text-black bg-blue-100' onChange={inputControll} />
      </div>
      <button className='text-center bg-indigo-700 hover:bg-indigo-900 duration-300 w-full mt-12 p-2 rounded-full'>LOGIN</button>
    </form>
  )
}
