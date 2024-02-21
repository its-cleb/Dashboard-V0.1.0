import { Row, Column } from "../../components/generic/common"
import { Card, Section } from "../../components/generic/card"
import { RiAlertFill } from "react-icons/ri"
import ProgressBar from "../../components/generic/progressbar"
import "../styles.css"  

export default function Home() {

  return (
    <>
        <div className="page">
          <h3>Home</h3>
          <Row>
          <Column>
            <Card title="ARL-2" link="/plant/ARL-2" flex={1}>
              <Section>
                <Row marB={-8}>
                  <div className="flex-text-left t-small bold">Bay 1</div>
                  <div className="text-right t-small">Solara 250 CW</div>
                </Row>
                <Row padV={5}>
                  <RiAlertFill color="red" size={19} className="pad-r-5" />
                  <div className="flex-1" style={{marginTop: 2, alignSelf: 'center'}}>
                    <ProgressBar done={30} />
                  </div>  
                </Row>
              </Section>
              <Section>
                <Row marB={-8}>
                  <div className="flex-text-left t-small bold">Bay 2</div>
                  <div className="text-right t-small">Solara 310</div>
                </Row>
                <Row padV={5}>
                  <div className="flex-1" style={{marginTop: 2, alignSelf: 'center'}}>
                    <ProgressBar done={90} />
                  </div>
                </Row>
              </Section>
            </Card>
            <Card title="ARL-6" flex={1}>
              <Section>
                <Row marB={-8}>
                  <div className="flex-text-left t-small bold">Bay 8</div>
                  <div className="text-right t-small">R-23</div>
                </Row>
                <Row padV={5}>
                  <div className="flex-1" style={{marginTop: 2, alignSelf: 'center'}}>
                    <ProgressBar done={75} />
                  </div>
                </Row>
              </Section>
              <Section>
                <Row marB={-8}>
                  <div className="flex-text-left t-small bold">Bay 6</div>
                  <div className="text-right t-small">R-25</div>
                </Row>
                <Row padV={5}>
                  <div className="flex-1" style={{marginTop: 2, alignSelf: 'center'}}>
                    <ProgressBar done={2} />
                  </div>
                </Row>
              </Section>
            </Card>
          </Column>
          <Column>
            <Card title="M-1" flex={1}>
              <Section>
                <Row marB={-8}>
                  <div className="flex-text-left t-small bold">Bay 1</div>
                  <div className="text-right t-small">C-248 Coupe</div>
                </Row>
                <Row padV={5}>
                  <div className="flex-1" style={{marginTop: 2, alignSelf: 'center'}}>
                    <ProgressBar done={88} />
                  </div>
                </Row>
              </Section>
            </Card>
            <Card title="M-2" flex={1}>
              <Section>
                <Row marB={-8}>
                  <div className="flex-text-left t-small bold">Bay 2</div>
                  <div className="text-right t-small">C-288 CW</div>
                </Row>
                <Row padV={5}>
                  <div className="flex-1" style={{marginTop: 2, alignSelf: 'center'}}>
                    <ProgressBar done={35} />
                  </div>
                </Row>
              </Section>
            </Card>
          </Column>
          <Column>
            <Card title="KENT" flex={1}>
              <Section>
                <Row marB={-8}>
                  <div className="flex-text-left t-small bold">Bay 2</div>
                  <div className="text-right t-small">C-32 DC</div>
                </Row>
                <Row padV={5}>
                  <div className="flex-1" style={{marginTop: 2, alignSelf: 'center'}}>
                    <ProgressBar done={80} />
                  </div>
                </Row>
              </Section>
            </Card>
            <Card title="AUB" flex={1}>
             <Section>
                <Row marB={-8}>
                  <div className="flex-text-left t-small bold">Bay 4</div>
                  <div className="text-right t-small">C-32 CB</div>
                </Row>
                <Row padV={5}>
                  <div className="flex-1" style={{marginTop: 2, alignSelf: 'center'}}>
                    <ProgressBar done={100} />
                  </div>
                </Row>
              </Section>
            </Card>
            </Column>
        </Row>
      </div>
    </>
  )
}