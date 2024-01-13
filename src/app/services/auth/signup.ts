import { signupInterface } from "@/interfaces/user";
import { signIn } from 'next-auth/react';
import toast from "react-hot-toast";

export const SignUp = async (data: signupInterface) => {
  const response = await fetch('/api/auth/signup/peminjam', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Username: data.Username,
      Email: data.Email,
      Password: data.Password,
      Nama_lengkap: data.Nama_lengkap,
      Alamat: data.Alamat,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.msg)
  }
  if (response.ok) {
    await signIn('credentials', {
      Email: data.Email,
      Password: data.Password,
      callbackUrl: '/',
      redirect: true
    })
  }
}