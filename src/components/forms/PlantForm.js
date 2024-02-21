"use client"
import '../../app/styles.css'
import './PlantForm.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Column } from '../generic/common'
import { BsBuildingFillAdd, BsBuildingFillGear } from "react-icons/bs"
import { useGetPathEnd } from "../../hooks/useGetPath"
import Alert from "../generic/Alert"

export default function PlantForm(props) {
  
  // Extract Plant ID from URL Path
  const router = useRouter()
  const path = useGetPathEnd()

  let plantId = props.edit ? path : null

  const blankForm = { 
    name: '',
    manager: ''
  }

  // Form State
  const [ form, setForm ] = useState(blankForm)
  const [ nameValid, setNameValid ] = useState(true)
  const [ managerValid, setManagerValid ] = useState(true)
  const [ formValid, setFormValid ] = useState(true)

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
    fetch(`/api/plant/get-plant/${plantId}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name.toString(),
          manager: data.manager.toString(),
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
    {(form.manager === '') ?
      setManagerValid(false)
      :
      setManagerValid(true)
    }

    if (form.name === '' || form.manager === '') {
      setFormValid(false)
      setAlert1(true)
    } else if (form.name !== '' || form.manager !== '') {
      setFormValid(true)
      
      props.edit ?
        editPlant()
        :
        addPlant()
    } else {
      console.log('Unknown Validation Error')
    }
  }

  const addPlant = async () => {
    let name = form.name
    let manager = form.manager

    try {
      fetch('/api/plant/add-plant', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, manager})
      })
    } catch (error) {
      console.error(error)
    }
    router.push('/admin/plants')
  }

  const editPlant = async () => {
    let name = form.name
    let manager = form.manager

    try {
      fetch(`/api/plant/edit-plant/${plantId}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, manager})
      })
    } catch (error) {
      console.error(error)
    }
    router.push('/admin/plants')
  }

  return (
    <>
      <div className="form-box center-all mar-t-20">
        <Column className="center-all gap-10">
          <Column>
            <label className="form-label t-left bold">Plant Name</label>
            <input 
              required
              type="text"
              value={form.name}
              className={nameValid ? '' : 'invalid'}
              onChange={e => setFormState('name', e.target.value)}
            />
          </Column>
          <Column>
            <label className="form-label t-left bold">Manager</label>
            <input 
              type="text"
              value={form.manager}
              className={managerValid ? '' : 'invalid'}
              onChange={e => setFormState('manager', e.target.value)}
            />
          </Column>          

          <div onClick={() => validateForm()} className="plant-button btn flex center-all cursor">
            <div className="plant-button-icon">
            {props.edit ?
              <BsBuildingFillGear size={25} />
              :
              <BsBuildingFillAdd size={25} />
            }
            </div>
            <div className="plant-button-text">{props.edit ? "Edit Plant" : "Add Plant"}</div>
          </div>

          <Alert message="All fields must be filled out!" open={alert1} />

          {props.edit ?
            <Alert message="Loading Plant..." green open={isLoading} />
            :
            null
          }
        </Column>
      </div>
    </>
  )
}