import { getCategory } from '@/app/services/books/category/category'
import { DeleteButton } from '@/components/molecules/main/book-category/DeleteButton'
import { CreateModal } from '@/components/templates/main/create-books/CreateModal'
import Sidebar from '@/components/templates/sidebar/Sidebar'
import React from 'react'


export const Main = async () => {
  const response = await getCategory()

  return (
    <Sidebar>
      <CreateModal />
      <div className='mt-4'>
        {response.data.map((res: any) => {
          return (
            <div key={res.KategoriID} className='my-2 w-full bg-slate-700 text-white p-4 rounded-lg'>
              <p>Id: {res.KategoriID}</p>
              <p>Category Name: {res.NamaKategori}</p>
              <DeleteButton KategoriID={res.KategoriID}>Delete</DeleteButton>
            </div>
          )
        })}
      </div>
    </Sidebar>
  )
}
