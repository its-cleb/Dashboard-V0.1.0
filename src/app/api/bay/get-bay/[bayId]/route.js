import { NextResponse } from "next/server"

export async function GET(request, { params }){
  const plantId = params.plantId

  const bay = await prisma.bay.findMany({
    where: {plantId}
  })

  console.log("Get Bay API:", bay)

  return NextResponse.json(bay)
}