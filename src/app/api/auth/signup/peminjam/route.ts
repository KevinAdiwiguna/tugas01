import { db } from "@/db/db"
import argon2 from 'argon2'
import { NextResponse } from "next/server"

export const POST = async (req: any) => {
  const { username, email, password, nama_lengkap, alamat } = await req.json()
  const hashPassword = await argon2.hash(password)

  const createUser = await db.user.create({
    data: {
      Nama_lengkap: nama_lengkap,
      Alamat: alamat,
      Username: username,
      Email: email,
      Password: hashPassword
    }
  })
  return NextResponse.json({ msg: "create success", data: createUser }, { status: 201 })
}

export const GET = async () => {
  const getAllUser = await db.user.findMany()
  return NextResponse.json({ msg: "fetch success", data: getAllUser }, { status: 200 })
}

export const DELETE = async () => {
  await db.user.deleteMany()
  return NextResponse.json({ msg: "ok" }, { status: 201 })
}