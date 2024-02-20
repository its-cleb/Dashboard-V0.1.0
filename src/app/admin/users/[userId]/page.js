import '../../../styles.css'
import prisma from '../../../../lib/prisma'
import React from 'react'
import UserForm from '../../../../components/forms/UserForm'

export default async function EditUsers() {

  // const user = await getUser()

  return (
    <>
      <div className="page">
        <h1>Edit User</h1>
        <UserForm edit />
      </div>
    </>
  )
}