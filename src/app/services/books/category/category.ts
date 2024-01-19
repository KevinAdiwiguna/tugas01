import toast from 'react-hot-toast';

export const createCategory = async (data: any) => {
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

export const getCategory = async () => {
  const response = await fetch(`${process.env.NEXTAPI_URL}/api/books/category`, {
    cache: 'no-store'
  })
  if (!response.ok) {
    return toast.error("filed to fetch")
  }
  return await response.json()
}

export const deleteCategory = async (data: number) => {
  const response = await fetch(`/api/books/category`, {
    method: "DELETE",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    return toast.error("filed to fetch")
  }
  return toast.success("success delete")
}