import { NextResponse } from "next/server"

export async function DELETE(request, { params }) {
  const id = params.userId

  console.log("Delete User API:", id)

  const user = await prisma.user.delete({
    where: {id}
  })

  return NextResponse.json(user)
}