import { NextResponse } from "next/server"

export async function GET(request, { params }){
  const id = params.bayId

  const bay = await prisma.bay.findUnique({
    where: {id}
  })

  console.log("Get Bay API:", bay)

  return NextResponse.json(bay)
}