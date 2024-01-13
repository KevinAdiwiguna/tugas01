'use client'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface providerInterface {
  children: ReactNode,
}

const Provider = ({ children }: providerInterface) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Provider