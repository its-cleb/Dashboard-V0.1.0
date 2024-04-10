import { NextResponse } from "next/server"

export async function GET(request){
  const user = await prisma.user.findMany({
  })

  console.log("Get All Plants API:", user)

  return NextResponse.json(user)
}