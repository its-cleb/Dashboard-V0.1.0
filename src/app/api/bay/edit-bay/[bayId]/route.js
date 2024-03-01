import { NextResponse } from "next/server"

export async function PATCH(request, { params }){
  const id = params.bayId

  const res = await request.json()
  const {name, status, plantId} = res
  
  console.log('Edit Bay API:', res)

    const result = await prisma.bay.update({
      where: {id},
      data: {
        name,
        status,
        plant: {
          connect: {
            id: plantId
          }
        }
      }
    })

  return NextResponse.json({result})
}