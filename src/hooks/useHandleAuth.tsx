'use client'
import { Loading } from "@/components/organisms/Loading/Loading";
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'


export const useHandleAuth = (status: string) => {
  if (status === 'authenticated') {
    redirect('/')
  }
  if (status === 'loading') {
    return (
      <Loading />
    )
  }
}
