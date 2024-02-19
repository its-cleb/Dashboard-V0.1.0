"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { RxDoubleArrowLeft } from "react-icons/rx"
import { FaHome, FaWarehouse } from "react-icons/fa"
import { TbMenu2 } from "react-icons/tb";
import { IoSettingsSharp, IoArrowBackOutline } from "react-icons/io5"
import { MdOutlineRefresh } from "react-icons/md"
import { BsDatabaseFillGear } from "react-icons/bs"
import Clock from "../generic/clock"
import "./navigationbar.css"
import "../../app/styles.css"

export default function NavigationBar(props) {

  const pathname = usePathname()
  const path = "/" + pathname.charAt(1).toUpperCase()
  + pathname.slice(2)

  const [ open, setOpen ] = useState(true)
  
  const toggle = () => {
    setOpen(!open)
  }

  return (
    <>
      {/* Side Bar */}
      <div className={open ? "sidebar gradient-black shadow-shallow" : "sidebar-closed gradient-black"}>

        <div className="sidebar-content"> 
          <Clock />
          <hr className="sidebar-hr" />
          <Link href="/home" className={(pathname === "/home") ? 'sidebar-item-active' : 'sidebar-item-inactive'}>
            <button className="sidebar-item">
              <div className="sidebar-item-icon"><FaHome size={20} /></div>
              <div className="sidebar-item-text">Home</div>
            </button>
          </Link>
          <Link href="/plant/ARL-2" className={(pathname === "/plant/ARL-2") ? 'sidebar-item-active' : 'sidebar-item-inactive'}>
            <button className="sidebar-item">
              <div className="sidebar-item-icon"><FaWarehouse size={20} /></div>
              <div className="sidebar-item-text">ARL-2</div>
            </button>
          </Link>
          <Link href="/plant/ARL-6" className={(pathname === "/plant/ARL-6") ? 'sidebar-item-active' : 'sidebar-item-inactive'}>
            <button className="sidebar-item">
              <div className="sidebar-item-icon"><FaWarehouse size={20} /></div>
              <div className="sidebar-item-text">ARL-6</div>
            </button>
          </Link>
          <Link href="/plant/M-1" className={(pathname === "/plant/M-1") ? 'sidebar-item-active' : 'sidebar-item-inactive'}>
            <button className="sidebar-item">
              <div className="sidebar-item-icon"><FaWarehouse size={20} /></div>
              <div className="sidebar-item-text">M-1</div>
            </button>
          </Link>
          <Link href="/plant/M-2" className={(pathname === "/plant/M-2") ? 'sidebar-item-active' : 'sidebar-item-inactive'}>
            <button className="sidebar-item">
              <div className="sidebar-item-icon"><FaWarehouse size={20} /></div>
              <div className="sidebar-item-text">M-2</div>
            </button>
          </Link>
          <Link href="/plant/AUB" className={(pathname === "/plant/AUB") ? 'sidebar-item-active' : 'sidebar-item-inactive'}>
            <button className="sidebar-item">
              <div className="sidebar-item-icon"><FaWarehouse size={20} /></div>
              <div className="sidebar-item-text">AUB</div>
            </button>
          </Link>
          <Link href="/plant/KENT" className={(pathname === "/plant/KENT") ? 'sidebar-item-active' : 'sidebar-item-inactive'}>
            <button className="sidebar-item">
              <div className="sidebar-item-icon"><FaWarehouse size={20} /></div>
              <div className="sidebar-item-text">KENT</div>
            </button>
          </Link>
          <div style={{flexGrow: 1}}></div>
          <Link href="/admin">
            <button className="sidebar-item sidebar-item-end">
              <div className="sidebar-item-icon"><BsDatabaseFillGear size={22} /></div>
              <div className="sidebar-item-text">Admin</div>
            </button>
          </Link>
          <Link href="/settings">
            <button className="sidebar-item sidebar-item-end">
              <div className="sidebar-item-icon"><IoSettingsSharp size={20} /></div>
              <div className="sidebar-item-text">Settings</div>
            </button>
          </Link>
        </div>
      </div>

      {/* Route Bar */}
      <div className="page">
        <div className="routebar-container">
          {open ?
            <div className="routebar-menu-btn-closed shadow-shallow" onClick={toggle}>
              <RxDoubleArrowLeft size={20} />
            </div>  
            :
            <div className="routebar-menu-btn" onClick={toggle}>
              <TbMenu2 size={20} />
            </div> 
          }
          <div className="routebar">
            <p className="route-text">
              FluidMotionProduction{path}
            </p>
          </div>
          <div className="routebar-nav-btn" style={{marginRight: 5, marginLeft: 2}}>  
            <IoArrowBackOutline size={18} onClick={() => window.history.back()}/>
          </div>
          <div className="routebar-nav-btn">
            <MdOutlineRefresh size={18} onClick={() => window.location.reload(false)}/>
          </div>  
        </div>
        
        {props.children}

      </div>
    </>
  )
}
