import { NextResponse } from "next/server"

export async function GET(request){
  const res = await request.json()
  const {name, email, position, role} = res
  
  console.log('Edit User Response:', res)

    const result = await prisma.user.findUnique({
      data: {
        name,
        email,
        position,
        role
      }
    })

  return NextResponse.json({result})
}