import { NextResponse } from "next/server"

export async function GET(request, { params }){
  const plantId = params.plantId

  const bays = await prisma.bay.findMany({
//    where: {plantId}
  })

  console.log("Get Bay API:", bays)

  return NextResponse.json(bays)
}