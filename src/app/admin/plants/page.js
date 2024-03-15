"use client"
import './page.css'
import '../../styles.css'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { BsBuildingFillAdd } from "react-icons/bs"
import { Card, Section } from '../../../components/generic/card'
import { Row } from '../../../components/generic/common'
import { BottomMenu, BottomMenuItem } from '../../../components/navigation/bottommenu'
import Alert from '../../../components/generic/Alert'
import Modal from '../../../components/generic/Modal'
import DeletePlantButton from '../../../components/custom/DeletePlantButton'
import PlantForm from '../../../components/forms/PlantForm'

export default function Plants() {

  const [ plant, setPlant ] = useState([])
  const [ plantIsLoading, setPlantIsLoading ] = useState(true)
  const [ modalVisible, setModalVisible ] = useState(false)

  useEffect(() => { // Load Plant Data
    fetch(`/api/plant/all-plants`)
      .then((res) => res.json())
      .then((data) => {
        setPlant(data)
        setPlantIsLoading(false)
        console.log(data)
    })
  }, [])

  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  const plantsList = plant.map(plant => 
    <Row key={plant.id}>
      <Section flex={1}  className="cursor-pointer">
        <Link href={`/admin/plants/${plant.id}`}>
          <Row>
            <div className="bold center-all plants" style={{flex: 1}}>{plant.name}</div>
            <div className="center-all plants" style={{flex: 1}}>{plant.manager}</div>
            <div className="center-all t-small plants" style={{flex: 1}}>{plant.id}</div>
          </Row>
        </Link>
      </Section>
      <DeletePlantButton plantId={plant.id}/>
    </Row>  
  )

  return (
    <>
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
          <BottomMenuItem title="Add Plant" click={openModal} className="center-all">
            <BsBuildingFillAdd size={20} className="admin-menu-item-icon center-all flex" />
          </BottomMenuItem>
        </BottomMenu>

        
      </div>
      <Modal className="m-w-400" title="Add Plant" visible={modalVisible} close={closeModal}>
        <PlantForm />
      </Modal>


      <Alert message="Loading Plant Data..." green open={plantIsLoading} />
    </>
  )
}