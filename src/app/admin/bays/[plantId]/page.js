"use client"
import './page.css'
import '../../../styles.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CgExtensionAdd } from "react-icons/cg"
import { Row } from '../../../../components/generic/common'
import { Card, Section } from '../../../../components/generic/card'
import { useGetPathEnd } from '../../../../hooks/useGetPath'
import Alert from '../../../../components/generic/Alert'
import { BottomMenu, BottomMenuItem } from '../../../../components/navigation/bottommenu'
import DeleteBayButton from '../../../../components/custom/DeleteBayButton'


export default function BaysByPlant() {

  // Extract Plant ID from URL Path
  const router = useRouter()
  const path = useGetPathEnd()

  let plantId = path

  // Loading States
  const [ plantIsLoading, setPlantIsLoading ] = useState(true)
  const [ bayIsLoading, setBayIsLoading ] = useState(false)
  const [ plant, setPlant ] = useState('Plant')
  const [ bays, setBays ] = useState([])

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
        setBays(bayData)
        setBayIsLoading(false)
    })
  }, [plantIsLoading])

  const baysList = bays.map(bay => 
    <Row key={bay.id}>
      <Section flex={1}  className="cursor-pointer">
        <Link href={`/admin/bays/${bay.id}`}>
          <Row>
            <div className="bold center-all plants" style={{flex: 1}}>{bay.name}</div>
            <div className="center-all plants" style={{flex: 1}}>{bay.status}</div>
            <div className="center-all t-small plants" style={{flex: 1}}>{bay.id}</div>
          </Row>
        </Link>
      </Section>
      <DeleteBayButton bayId={bay.id}/>
    </Row>  
  )

  return (
    <>
      <div className="page">
        <Card title={`${plant} Bays`}>
          <Row className="plants-header">
            <div className="t-small bold center-all" style={{flex: 1}}>Name</div>
            <div className="t-small bold center-all" style={{flex: 1}}>Status</div>
            <div className="t-small bold center-all " style={{flex: 1}}>ID</div>
          </Row>

          {baysList}

        </Card>

        <Alert message="Loading Plant Data..." green open={plantIsLoading} />
        <Alert message="Loading Bay Data..." green open={bayIsLoading} />

        <BottomMenu>
          <BottomMenuItem title="Add Bay" href={`/admin/bays/add-bay/${plantId}`} className="center-all">
            <CgExtensionAdd size={22} className="admin-menu-item-icon center-all flex" />
          </BottomMenuItem>
        </BottomMenu>

      </div>
    </>
  )
}