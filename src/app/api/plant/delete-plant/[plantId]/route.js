import { NextResponse } from "next/server"

export async function DELETE(request, { params }) {
  const id = params.plantId

  console.log("Delete Plant API:", id)

  const plant = await prisma.plant.delete({
    where: {id}
  })

  return NextResponse.json(plant)
}