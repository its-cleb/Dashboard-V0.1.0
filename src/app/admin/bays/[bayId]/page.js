import '../../../styles.css'
import React from 'react'
import BayForm from '../../../../components/forms/BayForm'

export default async function EditPlants() {

  return (
    <>
      <div className="page">
        <h1>Edit Bay</h1>
        <BayForm edit />
      </div>
    </>
  )
}