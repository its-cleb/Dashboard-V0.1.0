import { useState, useEffect } from 'react'
import './clock.css'

const Clock = () => {

  const [ time, setTime ] = useState(new Date())
  const [ date, setDate ] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
      setDate(new Date())
    }, 60000)

    return () => {
      clearInterval(timer)
    }
  },[])

  const formattedTime = time.toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric'} )
  const formattedDate = date.toLocaleDateString("en-US", {weekday: 'long', month: 'short', day: 'numeric'})

  return (
    <div className="clock">
      <div className="time">{formattedTime}</div>
      <div className="date">{formattedDate}</div>
    </div>
  )
}

export default Clock