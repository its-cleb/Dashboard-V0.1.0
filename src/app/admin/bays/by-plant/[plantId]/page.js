"use client"
import './page.css'
import '../../../../styles.css'
import '../../../../../components/forms/Form.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CgExtension, CgExtensionAdd } from "react-icons/cg"
import { Row, Column } from '../../../../../components/generic/common'
import { Card, Section } from '../../../../../components/generic/card'
import { useGetPathEnd } from '../../../../../hooks/useGetPath'
import Alert from '../../../../../components/generic/Alert'
import Modal from '../../../../../components/generic/Modal'
import { BottomMenu, BottomMenuItem } from '../../../../../components/navigation/bottommenu'
import DeleteBayButton from '../../../../../components/custom/DeleteBayButton'


export default function BaysByPlant() {

  // Extract Plant ID from URL Path
  const router = useRouter()
  const path = useGetPathEnd()

  let plantId = path

  // Loading States
  const [ bay, setBay ] = useState([])
  const [ currentBay, setCurrentBay ] = useState({name:'', status:'', id:''})
  const [ editMode, setEditMode ] = useState(false)
  const [ modalVisible, setModalVisible ] = useState(false)
  const [ plantIsLoading, setPlantIsLoading ] = useState(true)
  const [ bayIsLoading, setBayIsLoading ] = useState(false)
  const [ plant, setPlant ] = useState('Plant')

  const [ nameValid, setNameValid ] = useState(true)

  // Form Data
  const [ form, setForm ] = useState({name: '', status: ''})

  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Load Data
  useEffect(() => { // Load Plant Data
    fetch(`/api/plant/get-plant/${plantId}`)
      .then((res) => res.json())
      .then((plantData) => {
        console.log(plantData)
        setPlant(plantData.name)
        setPlantIsLoading(false)
    })
  }, [])

  useEffect(() => { // Load Bay Data
    fetch(`/api/bay/get-bays/${plantId}`)
      .then((res) => res.json())
      .then((bayData) => {
        setBay(bayData)
        setBayIsLoading(false)
    })
  }, [plantIsLoading])

  // Modal Control
  const addModal = () => {
    setCurrentBay({name:'', status:'', id:''})
    setForm({
      name: '',
      status: '',
    })
    setEditMode(false)
    setModalVisible(true)
  }
  const editModal = (bayName, bayStatus, bayId) => {
    setCurrentBay({name: bayName, status: bayStatus, id: bayId})
    setForm({
      name: bayName,
      status: bayStatus,
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

    if (form.name === '') {
      setAlert1(true)
    } else if (form.name !== '') {      
      editMode ?
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
    window.location.reload(false)
  }

  const editBay = async () => {
    let name = form.name
    let status = form.status

    try {
      fetch(`/api/bay/edit-bay/${currentBay.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, status, plantId})
      })
    } catch (error) {
      console.error(error)
    }
    window.location.reload(false)
  }

  // Bays Content
  const baysList = bay.map(bay => 
    <Row key={bay.id}>
      <Section flex={1}  className="cursor-pointer">
        <div onClick={() => editModal(bay.name, bay.status, bay.id)}>
          <Row>
            <div className="bold center-all bays" style={{flex: 1}}>{bay.name}</div>
            <div className="center-all bays" style={{flex: 1}}>{bay.status}</div>
            <div className="center-all t-small bays" style={{flex: 1}}>{bay.id}</div>
          </Row>
        </div>
      </Section>
      <DeleteBayButton bayId={bay.id}/>
    </Row>  
  )

  return (
    <>
      <div className="page">
        <Card title={`${plant} Bays`}>
          <Row className="bays-header">
            <div className="t-small bold center-all" style={{flex: 1}}>Name</div>
            <div className="t-small bold center-all" style={{flex: 1}}>Status</div>
            <div className="t-small bold center-all " style={{flex: 1}}>ID</div>
          </Row>

          {baysList}

        </Card>

        <BottomMenu>
          <BottomMenuItem title="Add Bay" click={addModal} className="center-all">
            <CgExtensionAdd size={22} className="admin-menu-item-icon center-all flex" />
          </BottomMenuItem>
        </BottomMenu>
      </div>
      
      {/* Form */}
      <Modal className="m-w-500" title={editMode ? "Edit Bay" : "Add Bay"} visible={modalVisible} close={closeModal}>
        <div className="form-box flex-1 flex center-all mar-b-20">
          <Column className="center-all gap-10">
            <h4 className="color-green">Adding to Plant: {plant}</h4>
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

            <div onClick={() => validateForm()} className="form-button btn flex center-all cursor mar-t-10">
              <div className="form-button-icon">
              {editMode ?
                <CgExtension size={22} />
                :
                <CgExtensionAdd size={22} />
              }
              </div>
              <div className="form-button-text">{editMode ? "Save Bay Edits" : "Add Bay"}</div>
            </div>

          </Column>
        </div>
      </Modal>

      <Alert message="All fields must be filled out!" open={alert1} />
      <Alert message="Loading Plant Data..." green open={plantIsLoading} />
      <Alert message="Loading Bay Data..." green open={bayIsLoading} />
    </>
  )
}