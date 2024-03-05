"use client"
import '../../app/styles.css'
import './Form.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Column } from '../generic/common'
import { FaUserEdit } from "react-icons/fa"
import { FaUserPlus } from "react-icons/fa6"
import { useGetPathEnd } from "../../hooks/useGetPath"
import Alert from "../generic/Alert"

export default function UserForm(props) {
  
  // Extract User ID from URL Path
  const router = useRouter()
  const path = useGetPathEnd()

  let userId = props.edit ? path : null

  const blankForm = { 
    name: '',
    email: '', 
    position: '', 
    role: 'VIEW',
    plantId: '', 
  }

  // Form State
  const [ form, setForm ] = useState(blankForm)
  const [ nameValid, setNameValid ] = useState(true)
  const [ emailValid, setEmailValid ] = useState(true)
  const [ titleValid, setTitleValid ] = useState(true)

  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Fetch Data if Edit
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    props.edit ?
    fetch(`/api/user/get-user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name.toString(),
          email: data.email.toString(),
          position: data.position.toString(),
          role: data.role.toString()
        })
        setLoading(false)
    })
    :
    null
  }, [])

  // Form Alerts
  const [ alert1, setAlert1 ] = useState(false)

  // Form Validation
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

    if (form.name === '' || form.email === '' || form.position === '') {
      setAlert1(true)
    } else if (form.name !== '' || form.email !== '' || form.position !== '') {      
      props.edit ?
        editUser()
        :
        addUser()
    } else {
      console.log('Unknown Validation Error')
    }
  }

  const addUser = async () => {
    let name = form.name
    let email = form.email
    let position = form.position
    let role = form.role

    try {
      fetch('/api/user/add-user', {
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

  const editUser = async () => {
    let name = form.name
    let email = form.email
    let position = form.position
    let role = form.role

    try {
      fetch(`/api/user/edit-user/${userId}`, {
        method: 'PATCH', 
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
    <>
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

          <div onClick={() => validateForm()} className="form-button btn flex center-all cursor">
            <div className="form-button-icon">
            {props.edit ?
              <FaUserEdit size={22} />
              :
              <FaUserPlus size={22} />
            }
            </div>
            <div className="form-button-text">{props.edit ? "Edit User" : "Add User"}</div>
          </div>

          <Alert message="All fields must be filled out!" open={alert1} />

          {props.edit ?
            <Alert message="Loading User..." green open={isLoading} />
            :
            null
          }
        </Column>
      </div>
    </>
  )
}