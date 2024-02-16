"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Row } from "../../../components/generic/common"
import { Card, CardLine, Section } from "../../../components/generic/card"
import "../../styles.css"  

export default function Boat() {

  // const { id, model } = useParams()
  const pathname = usePathname()

  return (
    <>
      <h3>{pathname}</h3>
      <Row>
        <Section title="Info" className="mar-10 shadow-shallow" flex={1} >
          <div className="t-left"><b>Plant:</b> ARL-6</div>
          <div className="t-left"><b>Bay:</b> 3</div>
          <div className="t-left"><b>Model:</b> Solara 250 CW</div>
          <div className="t-left"><b>Hull:</b> #9FB7S9F89SA</div>
          <div className="t-left"><b>Status:</b> Laminating</div>
        </Section>        
        <Card title="Build Tasks" flex={3}>
          <CardLine colorClass="line-red">
            <Link href="/task/FB7S9F89SA">
              Laminate
              <div className="flex-text-right">11/11/2024</div>
            </Link>
          </CardLine>
          <CardLine colorClass="line-yellow">
            Plumbing
            <div className="flex-text-right">9/26/2024</div>
          </CardLine>
          <CardLine colorClass="line-orange">
            Electrical
            <div className="flex-text-right">1/10/2024</div>
          </CardLine>
          <CardLine colorClass="line-green">            
            Liner Drop
            <div className="flex-text-right">4/21/2024</div>
          </CardLine>
          <CardLine colorClass="line-blue">            
            Hull
            <div className="flex-text-right">6/1/2024</div>
          </CardLine>
        </Card>
      </Row>
    </>
  )
}