import '../../../styles.css'
import React from 'react'
import PlantForm from '../../../../components/forms/PlantForm'

export default async function EditPlants() {

  return (
    <>
      <div className="page">

        <h1>Edit Plant</h1>
        
        <div className="flex-1 center-all">
          <PlantForm edit />
        </div>
        
      </div>
    </>
  )
}