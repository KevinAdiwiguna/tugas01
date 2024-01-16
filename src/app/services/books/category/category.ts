import toast from 'react-hot-toast';

export const CreateCategory = async (data: any) => {
  const response = await fetch(`/api/books/category`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.msg)
  }
}