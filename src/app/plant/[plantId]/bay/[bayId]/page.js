"use client"
import { usePathname } from 'next/navigation'
import "../../styles.css"  

export default function Boat() {

  const pathname = usePathname()

  return (
    <>
      <h3>Bay {pathname}</h3>
    </>
  )
}