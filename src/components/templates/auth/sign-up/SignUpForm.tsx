'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useHandleAuth } from '@/hooks/useHandleAuth';
import { Toaster } from 'react-hot-toast';
import { SignUp } from '@/app/services/auth/signup';

const SignUpForm = () => {
  const { data: session, status } = useSession()
  const checkAuth = useHandleAuth(status)

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    Nama_lengkap: "",
    Alamat: ""
  })

  const inputControll = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }



  const handleRegister = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await SignUp(formData)
    } catch (error: any) {
      throw new Error(error)
    } finally {
      setIsSubmitting(false)
    }
  }


  if (checkAuth) {
    return checkAuth
  }


  return (
    <form onSubmit={handleRegister}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-4'>
        <div className='flex flex-col gap-2 py-2 mt-4'>
          <label htmlFor="username" className='text-neutral-400'>Username</label>
          <input type="text" name='Username' placeholder='username' className='px-3 rounded-full py-1 text-black bg-blue-50' onChange={inputControll} required />
        </div>
        <div className='flex flex-col gap-2 py-2 mt-4'>
          <label htmlFor="password" className='text-neutral-400'>Password</label>
          <input type="password" name='Password' placeholder='*********' className='px-3 rounded-full py-1 text-black bg-blue-50' onChange={inputControll} required />
        </div>
      </div>

      <div className='flex flex-col gap-2 py-2'>
        <label htmlFor="email" className='text-neutral-400'>Email</label>
        <input type="email" name='Email' placeholder='yourmail@mail.com' className='px-3 rounded-full py-1 text-black bg-blue-50' onChange={inputControll} required />
      </div>
      <div className='flex flex-col gap-2 py-2'>
        <label htmlFor="fullname" className='text-neutral-400'>Full Name</label>
        <input type="text" name='Nama_lengkap' placeholder='your full name' className='px-3 rounded-full py-1 text-black bg-blue-50' onChange={inputControll} required />
      </div>
      <div className='flex flex-col gap-2 py-2'>
        <label htmlFor="address" className='text-neutral-400'>Address</label>
        <input type="text" name='Alamat' placeholder='your full name' className='px-3 rounded-full py-1 text-black bg-blue-50' onChange={inputControll} required />
      </div>
      <button className={`text-center bg-indigo-700 hover:bg-indigo-900 duration-300 w-full mt-12 p-2 rounded-full ${isSubmitting && 'cursor-not-allowed'}`} type='submit'>LOGIN</button>
    </form>
  )
}

export default SignUpForm