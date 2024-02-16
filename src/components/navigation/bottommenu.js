"use state"
import Link from 'next/link'
import "../../app/styles.css"
import "./bottommenu.css"

// --- <NavPage> ---
const BottomMenu = (props) => {

  return (
    <div className="bottom-menu-container">
      <div className="bottom-menu gradient-black shadow-deep">
          {props.children}      
      </div>
    </div>
  )
}

// --- <FloatMenuItem> ---
const BottomMenuItem = (props) => {

  return (
    <div>
      <Link href={props.link} className="float-menu-item">
        <div className="float-menu-item-icon">{props.children}</div>
        <div className="float-menu-item-text">{props.title}</div>
      </Link>
    </div>
  )
}


export { BottomMenu, BottomMenuItem }