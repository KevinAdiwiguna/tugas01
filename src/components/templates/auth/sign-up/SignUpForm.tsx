'use client'
import React, { useState } from 'react'
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import { useHandleAuth } from '@/hooks/useHandleAuth';
import toast, { Toaster } from 'react-hot-toast';
import { Trocchi } from 'next/font/google';


const SignUpForm = () => {
  const { data: session, status } = useSession()
  const checkAuth = useHandleAuth(status)

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nama_lengkap: "",
    alamat: ""
  })

  const inputControll = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleRegister = async (e: any) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/signup/peminjam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          nama_lengkap: formData.nama_lengkap,
          alamat: formData.alamat,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.msg)
        toast.error(errorData.msg)
      }
      if (response.ok) {
        await signIn('credentials', {
          Email: formData.email,
          Password: formData.password,
          redirect: false
        })
      }

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
          <input type="text" name='username' placeholder='username' className='px-3 rounded-full py-1 text-black bg-blue-50' onChange={inputControll} />
        </div>
        <div className='flex flex-col gap-2 py-2 mt-4'>
          <label htmlFor="password" className='text-neutral-400'>Password</label>
          <input type="password" name='password' placeholder='*********' className='px-3 rounded-full py-1 text-black bg-blue-50' onChange={inputControll} />
        </div>
      </div>

      <div className='flex flex-col gap-2 py-2'>
        <label htmlFor="email" className='text-neutral-400'>Email</label>
        <input type="email" name='email' placeholder='yourmail@mail.com' className='px-3 rounded-full py-1 text-black bg-blue-50' onChange={inputControll} />
      </div>
      <div className='flex flex-col gap-2 py-2'>
        <label htmlFor="fullname" className='text-neutral-400'>Full Name</label>
        <input type="text" name='nama_lengkap' placeholder='your full name' className='px-3 rounded-full py-1 text-black bg-blue-50' onChange={inputControll} />
      </div>
      <div className='flex flex-col gap-2 py-2'>
        <label htmlFor="address" className='text-neutral-400'>Address</label>
        <input type="text" name='alamat' placeholder='your full name' className='px-3 rounded-full py-1 text-black bg-blue-50' onChange={inputControll} />
      </div>
      <button onClick={() => setIsSubmitting(true)} className={`text-center bg-indigo-700 hover:bg-indigo-900 duration-300 w-full mt-12 p-2 rounded-full ${isSubmitting && 'cursor-not-allowed'}`} type='submit'>LOGIN</button>
    </form>
  )
}

export default SignUpForm