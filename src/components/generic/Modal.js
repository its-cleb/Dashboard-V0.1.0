"use client"
import { useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io"
import './Modal.css'
import '../../app/styles.css'

// --- <Modal> ---
export default function Modal(props) {

  const [ visible, setVisible ] = useState(false)
  
  useEffect(() => {
    setVisible(props.visible)
  }, [props.visible])

  let modalVisible = (visible ? "modal-bg " : "display-none")
  let modalStyle = "modal shadow-shallow " + props.className

  return (
      <div className={modalVisible}>
        <div className={modalStyle}>
          <div className="modal-header row">
            <div className="modal-title center-all">
              <h3>{props.title}</h3>
            </div>
            <IoMdCloseCircle className="close-button" onClick={props.close} size={24} />
          </div>
          <div className="modal-content">
            {props.children}
          </div>
          <div className="modal-footer">
            {props.footer}
          </div>
        </div>
      </div>
  ) 
}