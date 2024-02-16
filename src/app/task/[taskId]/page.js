"use client"
import { usePathname } from 'next/navigation'
import { Row } from "../../../components/generic/common"
import "../../styles.css"  

export default function Task() {
  
  const pathname = usePathname()
  
  return (
    <>
      <h3>{pathname}</h3>
      <Row>

      </Row>
    </>
  )
}