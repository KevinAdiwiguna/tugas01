import React, { ReactNode } from 'react'



interface baseModalProps {
  children: ReactNode
}

export const BaseModal = ({ children }: any) => {
  return (
    <div className='bg-neutral-500 fixed h-screen w-full top-0 left-0 right-0'>
      <div className='bg-white p-4 rounded-lg'>
        {children}
      </div>
    </div>
  )
}
