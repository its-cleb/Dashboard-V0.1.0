import '../../../styles.css'
import React from 'react'
import PlantForm from '../../../../components/forms/PlantForm'

export default async function EditPlants() {

  return (
    <>
      <div className="page">

        <h1>Edit Plant</h1>
        <PlantForm edit />
      </div>
    </>
  )
}