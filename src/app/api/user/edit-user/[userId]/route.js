import { NextResponse } from "next/server"

export async function PATCH(request, { params }){
  const id = params.userId

  const res = await request.json()
  const {name, email, position, role} = res
  
  console.log('Edit User API:', res)

    const result = await prisma.user.update({
      where: {id },
      data: {
        name,
        email,
        position,
        role
      }
    })

  return NextResponse.json({result})
}