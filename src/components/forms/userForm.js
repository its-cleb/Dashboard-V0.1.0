"use client"
import '@/app/styles.css'
import './UserForm.css'
import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Column } from '@/components/generic/common'
import { FaUserPlus } from "react-icons/fa6"

export default function UserForm(props) {
  
  // Extract User ID from URL Path
  const router = useRouter()
  const path = usePathname()

  let userId = null
  props.edit ? userId = path.split("/").pop() : null

  console.log(userId)

  const blankForm = { 
    name: '',
    email: '', 
    position: '', 
    role: 'VIEW', 
  }

  const [ form, setForm ] = useState(blankForm)
  const [ nameValid, setNameValid ] = useState(true)
  const [ emailValid, setEmailValid ] = useState(true)
  const [ titleValid, setTitleValid ] = useState(true)
  const [ formValid, setFormValid ] = useState(true)

  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const validateForm = () => {
    
    {(form.name === '') ?
      setNameValid(false)
      :
      setNameValid(true)}
    {(form.email === '') ?
      setEmailValid(false)
      :
      setEmailValid(true)}
    {(form.position === '') ?
      setTitleValid(false)
      :
      setTitleValid(true)
    }
    console.log(nameValid, emailValid, titleValid)

    if (form.name === '' || form.email === '' || form.position === '') {
      setFormValid(false)
    } else if (form.name !== '' || form.email !== '' || form.position !== '') {
      setFormValid(true)
      submitForm()
    } else {
      console.log('Unknown Validation Error')
    }
  }

  const submitForm = async () => {
    let name = form.name
    let email = form.email
    let position = form.position
    let role = form.role

    try {
      fetch('/api/add-user', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, position, role})
      })
    } catch (error) {
      console.error(error)
    }
    router.push('/admin/users')
  }

  return (
    <div className="form-box center-all mar-t-20">
      <Column className="center-all gap-10">
        <Column>
          <label className="form-label t-left bold">Full Name</label>
          <input 
            required
            type="text"
            value={form.name}
            className={nameValid ? '' : 'invalid'}
            onChange={e => setFormState('name', e.target.value)}
          />
        </Column>
        <Column>
          <label className="form-label t-left bold">Email</label>
          <input 
            type="text"
            value={form.email}
            className={emailValid ? '' : 'invalid'}
            onChange={e => setFormState('email', e.target.value)}
          />
        </Column>          
        <Column>
          <label className="form-label t-left bold">Title</label>
          <input 
            type="text"
            value={form.position}
            className={titleValid ? '' : 'invalid'}
            onChange={e => setFormState('position', e.target.value)}
          />
        </Column>          
        <Column>
          <label className="form-label t-left bold">Permissions</label>
          <div className="select">
            <select className="select" value={form.role} onChange={e => setFormState('role', e.target.value)}>
              <option value="VIEW">View</option>
              <option value="WORKER">Worker</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </Column>

        <div onClick={() => validateForm()} className="user-add-button btn flex center-all cursor">
          <div className="admin-menu-item-icon"><FaUserPlus size={25} /></div>
          <div className="admin-menu-item-text">Add User</div>
        </div>

        <div className={formValid ? 'validation-box display-none' : 'validation-box slide-up'}>
          <h4>All fields must be filled out</h4>
        </div>
        
      </Column>
    </div>
  )
}