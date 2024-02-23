import { NextResponse } from "next/server"

export async function GET(request, { params }){
  const id = params.plantId

  const bays = await prisma.bay.findMany({
    where: {id}
  })

  console.log("Get Bay API:", bays)

  return NextResponse.json(bays)
}