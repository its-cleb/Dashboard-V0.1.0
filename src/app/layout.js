"use client"

import { Roboto } from "next/font/google"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { RxDoubleArrowLeft } from "react-icons/rx"
import { FaHome, FaWarehouse } from "react-icons/fa"
import { TbMenu2 } from "react-icons/tb";
import { IoSettingsSharp, IoArrowBackOutline } from "react-icons/io5"
import { MdOutlineRefresh } from "react-icons/md"

import "./globals.css"

const roboto = Roboto({ weight: ['400', '500', '700', '900'], subsets: ["latin"] })

export default function RootLayout({ children }) {

  const pathname = usePathname()

  const [ open, setOpen ] = useState(true)
  
  const toggle = () => {
    setOpen(!open)
  }

  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="app">

          {/* Side Bar */}
          <div className={open ? "sidebar gradient-black shadow-shallow" : "sidebar-closed gradient-black"}>

            <div className="sidebar-content"> 
              <Clock />
              <hr className="sidebar-hr" />
              <Link href="/home" className={`sidebar-item ${pathname === '/home' ? 'active' : 'inactive'}`}>
                <button className="sidebar-item">
                  <div className="sidebar-item-icon"><FaHome size={20} /></div>
                  <div className="sidebar-item-text">Home</div>
                </button>
              </Link>
              <Link href="/plant/ARL-2" className={`sidebar-item ${pathname === '/plant/ARL-2' ? 'active' : 'inactive'}`}>
                <button className="sidebar-item">
                  <div className="sidebar-item-icon"><FaWarehouse size={20} /></div>
                  <div className="sidebar-item-text">ARL-2</div>
                </button>
              </Link>
              <Link href="/plant/ARL-6" className={`sidebar-item ${pathname === '/plant/ARL-6' ? 'active' : 'inactive'}`}>
                <button className="sidebar-item">
                  <div className="sidebar-item-icon"><FaWarehouse size={20} /></div>
                  <div className="sidebar-item-text">ARL-6</div>
                </button>
              </Link>
              <Link href="/plant/M-1" className={`sidebar-item ${pathname === '/plant/M-1' ? 'active' : 'inactive'}`}>
                <button className="sidebar-item">
                  <div className="sidebar-item-icon"><FaWarehouse size={20} /></div>
                  <div className="sidebar-item-text">M-1</div>
                </button>
              </Link>
              <Link href="/plant/M-2" className={`sidebar-item ${pathname === '/plant/M-2' ? 'active' : 'inactive'}`}>
                <button className="sidebar-item">
                  <div className="sidebar-item-icon"><FaWarehouse size={20} /></div>
                  <div className="sidebar-item-text">M-2</div>
                </button>
              </Link>
              <Link href="/plant/AUB" className={`sidebar-item ${pathname === '/plant/AUB' ? 'active' : 'inactive'}`}>
                <button className="sidebar-item">
                  <div className="sidebar-item-icon"><FaWarehouse size={20} /></div>
                  <div className="sidebar-item-text">AUB</div>
                </button>
              </Link>
              <Link href="/plant/KENT" className={`sidebar-item ${pathname === '/plant/KENT' ? 'active' : 'inactive'}`}>
                <button className="sidebar-item">
                  <div className="sidebar-item-icon"><FaWarehouse size={20} /></div>
                  <div className="sidebar-item-text">KENT</div>
                </button>
              </Link>
              <div style={{flexGrow: 1}}></div>
              <Link href="/">
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
                  FluidMotionProduction/{props.pageName}
                </p>
              </div>
              <div className="routebar-nav-btn" style={{marginRight: 5, marginLeft: 2}}>  
                <IoArrowBackOutline size={18} onClick={() => navigate(-1)}/>
              </div>
              <div className="routebar-nav-btn">
                <MdOutlineRefresh size={18} />
              </div>  
            </div>
            
            {children}

          </div>
        </div>
      </body>
    </html>
  )
}
