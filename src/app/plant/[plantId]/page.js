"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Row, Column } from "../../../components/generic/common"
import { CardResizable, CardInfo, CardLine } from "../../../components/generic/card"
import { FloatMenu, FloatMenuItemLink } from "../../../components/navigation/floatmenu"
import { CgMenuGridR } from "react-icons/cg"
import "../../styles.css"  

export default function Plant() {

  const pathname = usePathname()

  // Set Pseudo-URL
  let plantName = ''

  switch(pathname) {
    case '/plant/ARL-2':
      plantName = 'Arlington 2'
      break
    case '/plant/ARL-6':
      plantName = 'Arlington 6'
      break
    case '/plant/M-1':
      plantName = 'Monroe 1'
      break
    case '/plant/M-2':
      plantName = 'Monroe 2'
      break
    case '/plant/AUB':
      plantName = 'Auburn'
      break
    case '/plant/KENT':
      plantName = 'Kent'
      break
    default:
      plantName = 'Undefined Plant Name'
  }

  return (
    <>
      <h3>{plantName}</h3>
      <Row>
        <Column>
          <CardResizable title="Bay 1" flex={1}>
            <CardInfo>
              <Link href="/boat/Solara-250-CW_9FB7S9F89SA">
                <div className="bold t-center">Solara 250 CW</div>
                <div className="t-center t-small">Hull #9FB7S9F89SA</div>
              </Link>  
            </CardInfo>
            <CardLine colorClass="line-red">
              Laminate
              <div className="text-right">11/11/2024</div>
            </CardLine>
            <CardLine colorClass="line-yellow">
              Plumbing
              <div className="text-right">9/26/2024</div>
            </CardLine>
            <CardLine colorClass="line-orange">
              Electrical
              <div className="text-right">1/10/2024</div>
            </CardLine>
            <CardLine colorClass="line-green">            
              Liner Drop
              <div className="text-right">4/21/2024</div>
            </CardLine>
            <CardLine colorClass="line-blue">            
              Hull
              <div className="text-right">6/1/2024</div>
          </CardLine>
          </CardResizable>

          <CardResizable title="Bay 2" flex={1}></CardResizable>
        </Column>
          <CardResizable title="Bay 2" flex={1}></CardResizable>
          <CardResizable title="Bay 3" flex={1}></CardResizable>
      </Row>
      <FloatMenu>
        <FloatMenuItemLink href="/building/ARL-2" title="Edit Building">
          <CgMenuGridR size={20} />
        </FloatMenuItemLink>
      </FloatMenu>
    </>
  )
}