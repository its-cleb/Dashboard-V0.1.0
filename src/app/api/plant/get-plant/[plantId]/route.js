import { NextResponse } from "next/server"

export async function GET(request, { params }){
  const id = params.plantId

  const plant = await prisma.plant.findUnique({
    where: {id}
  })

  console.log("Get Plant API:", plant)

  return NextResponse.json(plant)
}