import { NextResponse } from "next/server"

export async function PATCH(request, { params }){
  const id = params.plantId

  const res = await request.json()
  const {name, manager} = res
  
  console.log('Edit Plant API:', res)

    const result = await prisma.plant.update({
      where: {id},
      data: {
        name,
        manager
      }
    })

  return NextResponse.json({result})
}