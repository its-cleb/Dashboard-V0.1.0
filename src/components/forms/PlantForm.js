"use client"
import '../../app/styles.css'
import './Form.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Row, Column } from '../generic/common'
import { BsBuildingFillAdd, BsBuildingFillGear } from "react-icons/bs"
import { BiBorderAll } from "react-icons/bi"
import { useGetPath, useGetPathEnd } from "../../hooks/useGetPath"
import Alert from "../generic/Alert"

export default function PlantForm(props) {
  
  // Extract Plant ID from URL Path
  const router = useRouter()
  const path = useGetPathEnd()
  const plant = useGetPath()

  let plantId = props.edit ? path : null

  const blankForm = { 
    name: '',
    manager: ''
  }

  // Form Status
  const [ form, setForm ] = useState(blankForm)
  const [ bays, setBays ] = useState([])
  const [ nameValid, setNameValid ] = useState(true)
  const [ managerValid, setManagerValid ] = useState(true)

  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Loading States
  const [plantIsLoading, setPlantIsLoading] = useState(true)
  const [bayIsLoading, setBayIsLoading] = useState(false)

  useEffect(() => { // Load Plant Data
    props.edit ?
      fetch(`/api/plant/get-plant/${plantId}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            name: data.name.toString(),
            manager: data.manager.toString(),
          })
          setPlantIsLoading(false)
          setBayIsLoading(true)
      })
    :
    null
  }, [])
  
  useEffect(() => { // Load Bay Data
    props.edit ?
    fetch(`/api/bay/get-bays/${plantId}`)
      .then((res) => res.json())
      .then((bayData) => {
        setBays(bayData)
        setBayIsLoading(false)
    })
    :
    null
  }, [plantIsLoading])

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
      setAlert1(true)
    } else if (form.name !== '' || form.manager !== '') {      
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
    window.location.reload(false)
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

  // Bay List Content
  const bayList = bays.map(bay => 
    <Row key={bay.id}>
      <Link href={`/admin/plants/${plant.id}`}>
        <Row className="bay-card">
          <div className="bold center-all plants" style={{flex: 1}}>{bay.name}</div>
          <div className="center-all plants" style={{flex: 1}}>{bay.status}</div>
        </Row>
      </Link>
    </Row>  
  )

  return (
    <>
      <div className="form-box flex-1 flex center-all mar-b-20">
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

          <div onClick={() => validateForm()} className="form-button btn flex center-all cursor mar-t-10">
            <div className="form-button-icon">
            {props.edit ?
              <BsBuildingFillGear size={22} />
              :
              <BsBuildingFillAdd size={22} />
            }
            </div>
            <span className="form-button-text center-all">{props.edit ? "Save Plant Edits" : "Add Plant"}</span>
          </div>

          {props.edit ?
            <div href={`/admin/bays/by-plant/${plantId}`} className="form-button btn flex center-all cursor">
              <div className="form-button-icon">
                <BiBorderAll size={20} className="admin-menu-item-icon center-all flex"/>
              </div>
              <span className="form-button-text center-all">Open Bay Editor</span>
            </div>
            :
            null
          }

          <Alert message="All fields must be filled out!" open={alert1} />

        </Column>
      </div>

      
    </>
  )
}