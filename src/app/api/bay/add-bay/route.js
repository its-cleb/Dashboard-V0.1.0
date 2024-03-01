import { NextResponse } from "next/server"

export async function POST(request){
  const res = await request.json()
  const {name, status, plantId} = res
  
  console.log("Add Bay API:", res)

    const result = await prisma.bay.create({
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