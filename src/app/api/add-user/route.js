import { NextResponse } from "next/server"

export async function POST(request){
  const res = await request.json()
  const {name, email, position, role} = res
  
  console.log(res)

    const result = await prisma.user.create({
      data: {
        name,
        email,
        position,
        role
      }
    })

  return NextResponse.json({result})
}