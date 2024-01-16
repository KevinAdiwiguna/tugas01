'use client'
import Sidebar from '@/components/templates/sidebar/Sidebar'
import { FaPlus } from "react-icons/fa";
import React, { useState } from 'react'
import { CreateModal } from '@/components/templates/main/book-category/CreateModal';

const Page = () => {
  const [modalCreate, setModalCreate] = useState(false)
  return (
    <Sidebar>
      <div className='flex justify-between items-center'>
        <h1 className='font-semibold text-xl'>Book Category</h1>
        <button className='p-2 bg-blue-500 font-base text-white rounded-lg flex justify-center items-center gap-2' onClick={() => setModalCreate(true)}>Create Category <FaPlus /></button>
      </div>

      {modalCreate && <CreateModal setModalCreate={setModalCreate} modalCreate={modalCreate} />}
    </Sidebar>

  )
}

export default Page