"use client"
import React, { useState } from 'react'
import { IoSettingsSharp } from "react-icons/io5"
import Link from 'next/link'
import "../../app/styles.css"
import "./floatmenu.css"

// --- <NavPage> ---
const FloatMenu = (props) => {

  const [ open, setOpen ] = useState(false)

  const toggle = () => {
    setOpen(!open)
  }

  return (
    <div className="float-menu gradient-black shadow-shallow">
      
      <div className={open ? "float-menu-content-open" : "float-menu-content-open display-none"} >
        {props.children}      
      </div>

      <div className="float-menu-icon-box">
        <IoSettingsSharp size={22} onClick={toggle} className="float-menu-icon" />
      </div>
    </div>
  )
}

// --- <FloatMenuItem> ---
const FloatMenuItem = (props) => {

  return (
    <div>
      <Link href={props.link} className="float-menu-item">
        <div className="float-menu-item-icon">{props.children}</div>
        <div className="float-menu-item-text">{props.title}</div>
      </Link>
    </div>
  )
}


export { FloatMenu, FloatMenuItem }