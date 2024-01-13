import React from 'react'
import { RingLoader } from 'react-spinners'

export const Loading = () => {
  return (
    <div className='w-full h-screen fixed bg-black top-0 left-0 right-0 z-50 flex justify-center items-center'>
      <RingLoader color="#ffff" />
    </div>
  )
}
