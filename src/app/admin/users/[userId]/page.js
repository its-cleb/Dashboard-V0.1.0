import '../../../styles.css'
import React from 'react'
import UserForm from '../../../../components/forms/UserForm'

export default async function EditUsers() {

  return (
    <>
      <div className="page">
        <h1>Edit User</h1>
        <UserForm edit />
      </div>
    </>
  )
}