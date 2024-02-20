import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function DELETE(request, { params }) {
  const id = params.userId

  console.log({id})

  const user = await prisma.user.delete({
    where: {id}
  })

  return NextResponse.json(user)
}