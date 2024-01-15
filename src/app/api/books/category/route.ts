import { db } from "@/db/db"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const getCategory = await db.kategoribuku.findMany()
    return NextResponse.json({ msg: "success", data: getCategory }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ msg: "filed fetch", error: error.message }, { status: 500 })
  }

}

export const POST = async (req: any) => {
  const { data } = await req.json()
  try {
    const createMany = await db.kategoribuku.createMany({
      data: data
    })
    return NextResponse.json({ msg: "create success", data: createMany, data2: data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ msg: "filed fetch", error: error.message }, { status: 500 })
  }
}

export const DELETE = async (req: any) => {
  const { KategoriBukuID } = await req.json()
  try {
    await db.kategoribuku.delete({
      where: {
        KategoriID: KategoriBukuID
      }
    })
  } catch (error:any) {
    return NextResponse.json({ msg: "filed fetch", error: error.message }, { status: 500 })
  }
}