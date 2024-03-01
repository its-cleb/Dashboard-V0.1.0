"use client"
import '../../app/styles.css'
import './BayForm.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Row, Column } from '../generic/common'
import { Card } from '../generic/card'
import { CgExtensionAdd, CgExtension } from "react-icons/cg"
import { useGetPathEnd } from "../../hooks/useGetPath"
import Alert from "../generic/Alert"

export default function BayForm(props) {
  
  // Extract Bay ID from URL Path
  const router = useRouter()
  const path = useGetPathEnd()

  let bayId = props.edit ? path : null
  let plant = props.edit ? '' : path

  const blankForm = { 
    name: '',
    status: ''
  }

  // Form Status
  const [ form, setForm ] = useState(blankForm)
  const [ plantName, setPlantName ] = useState('')
  const [ plantId, setPlantId ] = useState(plant)
  const [ nameValid, setNameValid ] = useState(true)
  const [ statusValid, setStatusValid ] = useState(true)
  const [ formValid, setFormValid ] = useState(true)

  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Loading States
  const [plantIsLoading, setPlantIsLoading] = useState(true)
  const [bayIsLoading, setBayIsLoading] = useState(true)

  useEffect(() => { // Load Plant Name if Add
    props.edit ?
      null
      :
      fetch(`/api/plant/get-plant/${plantId}`)
        .then((res) => res.json())
        .then((data) => {
          setPlantName(data.name)
          setPlantIsLoading(false)
          setBayIsLoading(true)
      })
  }, [])

  useEffect(() => { // Load Bay Data if Edit
    props.edit ?
      fetch(`/api/bay/get-bay/${bayId}`)
        .then((res) => res.json())
        .then((bayData) => {
          setForm({
            name: bayData.name,
            status: bayData.status,
          })
          setPlantId(bayData.plantId)
          setBayIsLoading(false)
          getPlant(bayData.plantId)
      })
    :
    null
  }, [])

  const getPlant = async (id) => {
    fetch(`/api/plant/get-plant/${id}`)
      .then((res) => res.json())
      .then((plantData) => {
        setPlantName(plantData.name)
        setPlantIsLoading(false)
    })
  }

  // Form Alerts
  const [ alert1, setAlert1 ] = useState(false)

  // Form Validation
  const validateForm = () => {
    {(form.name === '') ?
      setNameValid(false)
      :
      setNameValid(true)}
    {(form.status === '') ?
      setStatusValid(false)
      :
      setStatusValid(true)
    }

    if (form.name === '' || form.status === '') {
      setFormValid(false)
      setAlert1(true)
    } else if (form.name !== '' || form.status !== '') {
      setFormValid(true)
      
      props.edit ?
        editBay()
        :
        addBay()
    } else {
      console.log('Unknown Validation Error')
    }
  }

  const addBay = async () => {
    let name = form.name
    let status = form.status

    try {
      fetch('/api/bay/add-bay', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, status, plantId})
      })
    } catch (error) {
      console.error(error)
    }
    router.push(`/admin/bays/by-plant/${plantId}`)
  }

  const editBay = async () => {
    let name = form.name
    let status = form.status

    try {
      fetch(`/api/bay/edit-bay/${bayId}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, status, plantId})
      })
      console.log('plantId:', plantId)
    } catch (error) {
      console.error(error)
    }
    router.push(`/admin/bays/by-plant/${plantId}`)
  }

  return (
    <>
      <div className="form-box flex-1 flex center-all mar-t-20">
        <Column className="center-all gap-10">
          <h4>Adding to Plant: {plantName}</h4>
          <Column>
            <label className="form-label t-left bold">Bay Name</label>
            <input 
              required
              type="text"
              value={form.name}
              className={nameValid ? '' : 'invalid'}
              onChange={e => setFormState('name', e.target.value)}
            />
          </Column>
          <Column>
            <label className="form-label t-left bold">Bay Status</label>
            <div className="select">
              <select className="select" value={form.status} onChange={e => setFormState('status', e.target.value)}>
                <option value="EMPTY">Empty</option>
                <option value="OCCUPIED">Occupied</option>
                <option value="CLEANUP">Cleanup</option>
              </select>
            </div>
          </Column>          

          <div onClick={() => validateForm()} className="bay-button btn flex center-all cursor">
            <div className="bay-button-icon">
            {props.edit ?
              <CgExtension size={24} />
              :
              <CgExtensionAdd size={24} />
            }
            </div>
            <div className="bay-button-text">{props.edit ? "Save Bay Edits" : "Add Bay"}</div>
          </div>

          <Alert message="All fields must be filled out!" open={alert1} />

          {props.edit ?
            <Alert message="Loading Bay Data..." green open={bayIsLoading} />
            :
            null}

          {props.edit ?
            <Alert message="Loading Bay Data..." green open={bayIsLoading} />
            :
            null}
        </Column>
      </div>
    </>
  )
}