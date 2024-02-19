import '@/app/styles.css'
import prisma from '@/lib/prisma'
import React from 'react'
import UserForm from '@/components/forms/userForm'
import { NextRequest } from 'next/server'


async function getUser(){
  const user = await prisma.user.findUnique({
    where: {
      id: '12321'
    }
  })
  return user
}

export default async function EditUsers() {

  const router = useParams()
  console.log(router)

  const user = await getUser()

  return (
    <>
      <div className="page">
        <h1>Edit User{router.query.slug}</h1>
        <UserForm />
      </div>
    </>
  )
}