'use client'
import React, { ReactNode, useState } from 'react'
import { deleteCategory } from '@/app/services/books/category/category'
import { useRouter } from 'next/navigation';


interface deleteButtonProps {
  KategoriID: number,
  children: ReactNode
}

export const DeleteButton = ({ KategoriID, children }: deleteButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteCategory(KategoriID)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false)
      router.refresh();
    }
  }

  return (
    <button className={`text-white font-semibold text-sm p-2 rounded-lg bg-red-500 mt-2 ${loading && "!pointer-events-none !cursor-not-allowed"}`} onClick={handleDelete}>{children}</button>
  )
}
