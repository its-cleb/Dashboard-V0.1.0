
import '../styles.css'
import prisma from '@/lib/prisma'

async function getUsers(){
  const users = await prisma.user.findMany({
  })
  return users
}

export default async function Admin() {

  const users = await getUsers()
  console.log(users)
  return (
    <>
      <div className="page">
        <h1></h1>
      </div>
    </>
  )
}