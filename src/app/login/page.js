import { Button } from '../../components/generic/common'
import { Card } from '../../components/generic/card'
import '../styles.css'

export default function Login() {
  return (
    <>
      <div className="login-page gradient-black">
        
        <div className="login">
          <Card title="Login">
            <div style={{padding: 20, display: 'flex', flexDirection: 'column', gap: 20}}>
              <div>
                <div className="t-small t-left bold">Username:</div>
                <input></input>
              </div>
              <div>
                <div className="t-small t-left bold">Email:</div>
                <input></input>
              </div>
              <Button className="gradient-blue" href='/home'>Log In</Button>
            </div>  
          </Card>
        </div>
        
      </div>
    </>
  )
}