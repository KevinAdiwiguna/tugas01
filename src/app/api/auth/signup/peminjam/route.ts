import { db } from "@/db/db"
import argon2 from 'argon2'
import { NextResponse } from "next/server"
const salt = Buffer.from(process.env.HASH_SALT ?? "")

export const POST = async (req: any) => {
  const { Username, Email, Password, Nama_lengkap, Alamat } = await req.json()
  const checkExistingUser = await db.user.findFirst({
    where: {
      Email: Email
    }
  })
  if (checkExistingUser) {
    return NextResponse.json({ msg: "Email already exist in our records. please try another one or log in" }, { status: 400 })
  }
  const hashPassword = await argon2.hash(Password, { salt: salt })
  try {
    const createUser = await db.user.create({
      data: {
        Nama_lengkap: Nama_lengkap,
        Alamat: Alamat,
        Username: Username,
        Email: Email,
        Password: hashPassword,
        Role: "peminjam"

      }
    })
    return NextResponse.json({ msg: "create success", data: createUser }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ msg: error.message })

  }

}

export const GET = async () => {
  const getAllUser = await db.user.findMany()
  return NextResponse.json({ msg: "fetch success", data: getAllUser }, { status: 200 })
}

export const DELETE = async () => {
  await db.user.deleteMany()
  return NextResponse.json({ msg: "ok" }, { status: 201 })
}