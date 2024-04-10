"use client"
import './page.css'
import '../../styles.css'
import '../../../styles/form.css'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, Section } from '../../../components/generic/card'
import { Row, Column } from '../../../components/generic/common'
import { BottomMenu, BottomMenuItem } from '../../../components/navigation/bottommenu'
import { BsBuildingFillAdd, BsBuildingFillGear } from "react-icons/bs"
import { BiBorderAll } from "react-icons/bi"
import Alert from '../../../components/generic/Alert'
import Modal from '../../../components/generic/Modal'
import DeletePlantButton from '../../../components/custom/DeletePlantButton'

export default function Plants() {

  const [ plant, setPlant ] = useState([])
  const [ currentPlant, setCurrentPlant ] = useState({name:'', manager:'', id:''})
  const [ plantIsLoading, setPlantIsLoading ] = useState(true)
  const [ editMode, setEditMode ] = useState(false)
  const [ modalVisible, setModalVisible ] = useState(false)
  const [ nameValid, setNameValid ] = useState(true)
  const [ managerValid, setManagerValid ] = useState(true)

  // Form Data
  const [ form, setForm ] = useState({name: '', manager: ''})

  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Load Data
  useEffect(() => { // Load Plant Data
    fetch(`/api/plant/all-plants`)
      .then((res) => res.json())
      .then((data) => {
        setPlant(data)
        setPlantIsLoading(false)
        console.log(data)
    })
  }, [])


  // Modal Control
  const addModal = () => {
    setCurrentPlant({name:'', manager:'', id:''})
    setForm({
      name: '',
      manager: '',
    })
    setEditMode(false)
    setModalVisible(true)
  }
  const editModal = (plantName, plantManager, plantId) => {
    setCurrentPlant({name: plantName, manager: plantManager, id: plantId})
    setForm({
      name: plantName,
      manager: plantManager,
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
    {(form.manager === '') ?
      setManagerValid(false)
      :
      setManagerValid(true)
    }

    if (form.name === '' || form.manager === '') {
      setAlert1(true)
    } else if (form.name !== '' || form.manager !== '') {      
      editMode ?
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
      fetch(`/api/plant/edit-plant/${currentPlant.id}`, {
        method: 'PATCH', 
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

  // Plants List
  const plantsList = plant.map(plant => 
    <Row key={plant.id}>
      <Section flex={1}  className="cursor-pointer">
        <div onClick={() => editModal(plant.name, plant.manager, plant.id)}>
          <Row>
            <div className="bold center-all plants" style={{flex: 1}}>{plant.name}</div>
            <div className="center-all plants" style={{flex: 1}}>{plant.manager}</div>
            <div className="center-all t-small plants" style={{flex: 1}}>{plant.id}</div>
          </Row>
        </div>
      </Section>
      <DeletePlantButton plantId={plant.id}/>
    </Row>  
  )

  // ----- | Main Control | -----
  return (
    <>
      {/* Page */}
      <div className="page">
        <Card title="Plants">
          <Row className="plants-header">
            <div className="t-small bold center-all" style={{flex: 1}}>Name</div>
            <div className="t-small bold center-all" style={{flex: 1}}>Manager</div>
            <div className="t-small bold center-all " style={{flex: 1}}>ID</div>
          </Row>

          {plantsList}

        </Card>

        <BottomMenu>
          <BottomMenuItem title="Add Plant" click={addModal} className="center-all">
            <BsBuildingFillAdd size={20} className="admin-menu-item-icon center-all flex" />
          </BottomMenuItem>
        </BottomMenu>
      </div>

      {/* Form */}
      <Modal className="m-w-500" title={editMode ? "Edit Plant" : "Add Plant"} visible={modalVisible} close={closeModal}>
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
              {editMode ?
                <BsBuildingFillGear size={22} />
                :
                <BsBuildingFillAdd size={22} />
              } 
              </div>
              <span className="form-button-text center-all">{editMode ? "Save Plant Edits" : "Add Plant"}</span>
            </div>

              {editMode ?
                <Link href={`/admin/bays/by-plant/${currentPlant.id}`} className="form-button btn flex center-all cursor">
                  <div className="form-button-icon">
                    <BiBorderAll size={20} className="admin-menu-item-icon center-all flex color-white"/>
                  </div>
                  <span className="form-button-text center-all color-white">Open Bay Editor</span>
                </Link>
                :
                null
              }

              <Alert message="All fields must be filled out!" open={alert1} />

          </Column>
        </div>
      </Modal>

      <Alert message="Loading Plant Data..." green open={plantIsLoading} />

    </>
  )
}