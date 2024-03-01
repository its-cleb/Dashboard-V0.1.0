import { NextResponse } from "next/server"

export async function POST(request){
  const res = await request.json()
  const {name, status, plant} = res
  
  console.log("Add Bay API:", res)

    const result = await prisma.bay.create({
      data: {
        name,
        status,
        plant
      }
    })

  return NextResponse.json({result})
}