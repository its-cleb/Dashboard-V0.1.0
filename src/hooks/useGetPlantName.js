import prisma from '../lib/prisma'

async function getPlantName(plantId){
  const name = await prisma.plant.findUnique({
    where: {plantId}
  })
  return name
}

export default async function useGetPath(plantId) {
  
  const plantName = await getPlantName(plantId)

  console.log(plantName)
  return (plantName)
}