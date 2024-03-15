import { NextResponse } from "next/server"

export async function GET(request){
  const plant = await prisma.plant.findMany({
  })

  console.log("Get All Plants API:", plant)

  return NextResponse.json(plant)
}