import { NextResponse } from "next/server"

export async function POST(request){
  const res = await request.json()
  const {name, manager} = res
  
  console.log("Add Plant API:", res)

    const result = await prisma.plant.create({
      data: {
        name,
        manager
      }
    })

  return NextResponse.json({result})
}