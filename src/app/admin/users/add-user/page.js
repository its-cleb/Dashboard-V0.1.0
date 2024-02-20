"use client"
import '@/app/styles.css'
import UserForm from '@/components/forms/UserForm'
import React from 'react'

export default function AddUsers() {

  return (
    <>
      <div className="page">
        <h1>Add User</h1>
        <UserForm />
      </div>
    </>
  )
}