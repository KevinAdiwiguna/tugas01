import { db } from "@/db/db"

export const POST = async (req: any) => {
  const { Judul, Penulis, Penerbit, TahunTerbit, kategoribuku_relasi } = await req.json()
  await db.buku.create({
    data: {
      Judul: Judul,
      Penulis: Penulis,
      Penerbit: Penerbit,
      TahunTerbit: TahunTerbit,
    }
  })
}