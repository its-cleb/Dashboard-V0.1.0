import '@/app/styles.css'
import prisma from '@/lib/prisma'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Column } from '@/components/generic/common'
import { FaUserPlus } from "react-icons/fa6"

async function getUser(){
  const user = await prisma.user.findMany({
  })
  return user
}

export default async function EditUsers() {

  const router = useRouter()
  const user = await getUser()

  return (
    <>
      <div className="page">
        <h1>Edit User</h1>
        <div className="form-box center-all mar-t-20">
          <Column className="center-all gap-20">
            <Column>
              <label className="t-left bold">Full Name</label>
              <input 
                type="text"
                value={form.name}
                onChange={e => setFormState('name', e.target.value)}
              />
            </Column>
            <Column>
              <label className="t-left bold">Email</label>
              <input 
                type="text"
                value={form.email}
                onChange={e => setFormState('email', e.target.value)}
              />
            </Column>          
            <Column>
              <label className="t-left bold">Title</label>
              <input 
                type="text"
                value={form.position}
                onChange={e => setFormState('position', e.target.value)}
              />
            </Column>          
            <Column>
              <label className="t-left bold">Permissions</label>
              <div className="select">
                <select className="select" value={form.role} onChange={e => setFormState('role', e.target.value)}>
                  <option value="VIEW">View</option>
                  <option value="WORKER">Worker</option>
                  <option value="MANAGER">Manager</option>
                  <option value="ADMIN">Admin</option>
                  <p>test</p>
                </select>
              </div>
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