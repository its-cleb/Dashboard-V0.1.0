"use client"
import './page.css'
import '../../styles.css'
import '../../../styles/form.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CgExtension, CgExtensionAdd } from "react-icons/cg"
import { FaUserPlus } from "react-icons/fa6"
import { Row, Column } from '../../../components/generic/common'
import { Card, Section } from '../../../components/generic/card'
import { useGetPathEnd } from '../../../hooks/useGetPath'
import Alert from '../../../components/generic/Alert'
import Modal from '../../../components/generic/Modal'
import { BottomMenu, BottomMenuItem } from '../../../components/navigation/bottommenu'
import DeleteUserButton from '../../../components/custom/DeleteUserButton'

export default function Users() {

  const path = useGetPathEnd()

  const [ user, setUser ] = useState([])
  const [ currentUser, setCurrentUser ] = useState({name:'', manager:'', id:''})
  const [ userIsLoading, setUserIsLoading ] = useState(true)
  const [ editMode, setEditMode ] = useState(false)
  const [ modalVisible, setModalVisible ] = useState(false)
  const [ nameValid, setNameValid ] = useState(true)
  const [ emailValid, setEmailValid ] = useState(true)
  const [ positionValid, setPositionValid ] = useState(true)
  const [ roleValid, setRoleValid ] = useState(true)
  
  // Form Data
  const [ form, setForm ] = useState({name: '', email: '', position: '', role: ''})

  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Load Data
  useEffect(() => { // Load Plant Data
    fetch(`/api/user/all-users`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUser(data)
        setUserIsLoading(false)
    })
  }, [])


  // Modal Control
  const addModal = () => {
    setCurrentUser({name: '', email: '', position: '', role: 'VIEW'})
    setForm({
      name: '',
      manager: '',
    })
    setEditMode(false)
    setModalVisible(true)
  }
  const editModal = (userName, userEmail, userPosition, userRole, userId) => {
    setCurrentUser({name: userName, email: userEmail, position: userPosition, role: userRole, id: userId})
    setForm({
      name: userName,
      email: userEmail,
      position: userPosition,
      role: userRole,
    })
    setEditMode(true)
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

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
      setEmailValid(true)
    }
    {(form.position === '') ?
      setEmailValid(false)
      :
      setEmailValid(true)
    }

    if (form.name === '' || form.email === '' || form.position === '') {
      setAlert1(true)
    } else if (form.name === '' || form.email === '' || form.position === '') {      
      editMode ?
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
    window.location.reload(false)
  }

  const editUser = async () => {
    let name = form.name
    let email = form.email
    let position = form.position
    let role = form.role

    try {
      fetch(`/api/user/edit-user/${currentUser.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, position, role})
      })
    } catch (error) {
      console.error(error)
    }
    window.location.reload(false)
  }



  const usersList = user.map(user => 
    <Row key={user.id}>
      <Section flex={1}  className="cursor-pointer">
        <div href={`/admin/users/${user.id}`}>
          <Row>
            <div className="bold center-all users" style={{flex: 2}}>{user.name}</div>
            <div className="center-all users" style={{flex: 4}}>{user.email}</div>
            <div className="center-all users" style={{flex: 2}}>{user.position}</div>
            <div className="center-all users" style={{flex: 1}}>{user.role}</div>
            <div className="center-all t-small users" style={{flex: 4}}>{user.id}</div>
          </Row>
        </div>
      </Section>
      <DeleteUserButton userId={user.id}/>  
    </Row>  
  )

  return (
    <>
      <div className="page">
        <Card title="Users">
          <Row className="users-header">
            <div className="t-small bold center-all" style={{flex: 2}}>Name</div>
            <div className="t-small bold center-all" style={{flex: 4}}>Email</div>
            <div className="t-small bold center-all" style={{flex: 2}}>Title</div>
            <div className="t-small bold center-all" style={{flex: 1}}>Permissions</div>
            <div className="t-small bold center-all " style={{flex: 4}}>ID</div>
          </Row>

          {usersList}

        </Card>

        <BottomMenu>
          <BottomMenuItem title="Add User" click={addModal} className="center-all">
            <FaUserPlus size={20} className="admin-menu-item-icon center-all flex" />
          </BottomMenuItem>
        </BottomMenu>
      </div>

      <Modal className="m-w-500" title={editMode ? "Edit User" : "Add User"} visible={modalVisible} close={closeModal}>
        <div className="form-box flex-1 flex center-all mar-b-20">
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
      </Modal>

      <Alert message="Loading User Data..." green open={userIsLoading} />

    </>
  )
}