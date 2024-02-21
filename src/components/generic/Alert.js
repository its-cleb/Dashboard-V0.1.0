"use client"
import { useEffect, useState } from 'react'
import './Alert.css'

// --- <Alert> ---
export default function Alert(props) {

  const [ open, setOpen ] = useState(false)
  
  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  let style = "shadow-shallow alert-box" + (open ? " active" : "" ) + (props.green ? " green-alert" : " red-alert")

  return (
    <div className={style}>
      <h4>{props.message}</h4>
    </div>
  ) 
}