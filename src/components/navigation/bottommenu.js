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
      <Link href={props.href} className="bottom-menu-item flex">
        <div className="bottom-menu-item-icon flex">{props.children}</div>
        <span className="bottom-menu-item-text flex center-all">{props.title}</span>
      </Link>
    </div>
  )
}


export { BottomMenu, BottomMenuItem }