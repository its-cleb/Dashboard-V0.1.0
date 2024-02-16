"use client"
import '../../../styles.css'
import './page.css'
import React, { useState } from 'react'
import { IconButton, Column } from '@/components/generic/common'
import { FaUserPlus } from "react-icons/fa6"

export default function Users() {

  // Declare default values if AddEmployee was the parent
  const blankForm = { 
    name: '',
    email: '', 
    position:'', 
    role:'', 
  }

  const [ form, setForm ] = useState(blankForm)

  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const submitForm = () => {
    console.log("form submitted")
  }

  return (
    <>
      <div className="page">
        <h1>Add User</h1>
        <div className="form-box center-all mar-t-20">
          <Column className="center-all gap-20">
            <Column>
              <label className="t-left bold">Name</label>
              <input 
                type="text"
                value={form.name}
                onChange={(text) => setFormState('name', text)}
              />
            </Column>
            <Column>
              <label className="t-left bold">Email</label>
              <input type="text" />
            </Column>          
            <Column>
              <label className="t-left bold">Position</label>
              <input type="text" />
            </Column>          
            <Column>
              <label className="t-left bold">Role</label>
              <input type="text" />
            </Column>

            <div onClick={() => submitForm()} className="user-add-button btn flex center-all cursor">
              <div className="admin-menu-item-icon"><FaUserPlus size={25} /></div>
              <div className="admin-menu-item-text">Add User</div>
            </div>
          </Column>
          
        </div>
        
      </div>
    </>
  )
}