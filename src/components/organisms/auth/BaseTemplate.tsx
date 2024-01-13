import React, { ReactNode } from 'react'

interface baseTemplateInterface {
  children: ReactNode,
  title: string,
  description?: string
}

const BaseTemplate = ({ children, title, description }: baseTemplateInterface) => {
  return (
    <div className='bg-indigo-950 w-full min-h-screen flex justify-center items-center text-white px-6'>
      <div className='container mx-auto sm:w-[70%] md:w-[60%] lg:w-[40%] bg-white p-6 rounded-xl'>
        <div>
          <h1 className='font-bold text-3xl text-black'>{title}</h1>
          <p className='text-black mt-2 mb-6'>{description}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

export default BaseTemplate