import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import { signinInterface } from '@/interfaces/user';


export const SignIn = async (user: signinInterface) => {
  await signIn('credentials', {
    Email: user.Email,
    Password: user.Password,
    redirect: false
  }).then(({ ok, error }: any) => {
    if (ok) {
      redirect('/')
    } else {
      toast.error("Email or password is incorrect. try again");
    }
  })
}