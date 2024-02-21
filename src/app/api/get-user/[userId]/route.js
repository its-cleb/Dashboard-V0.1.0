import { NextResponse } from "next/server"

export async function GET(request, { params }){
  const id = params.userId

  const user = await prisma.user.findUnique({
    where: {id}
  })

  console.log(user)

  return NextResponse.json(user)
}