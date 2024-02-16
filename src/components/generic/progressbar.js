"use client"
import { useState, useEffect } from 'react'
import './progressbar.css'

const ProgressBar = (props) => {

  const [style, setStyle] = useState({});
  const [color, setColor] = useState('purple');
  
  useEffect(() => {

    if (props.done > 0 && props.done <= 10) {
      setColor('#BB0000')
    } else if (props.done > 10 && props.done <= 20) {
      setColor('#EE0000')
    } else if (props.done > 20 && props.done <= 30) {
      setColor('#ff3300')
    } else if (props.done > 30 && props.done <= 40) {
      setColor('#ff9900')
    } else if (props.done > 40 && props.done <= 50) {
      setColor('#ffbf00')
    } else if (props.done > 50 && props.done <= 60) {
      setColor('#e6e600')
    } else if (props.done > 60 && props.done <= 70) {
      setColor('#acee00')
    } else if (props.done > 70 && props.done <= 80) {
      setColor('#99DD00')
    } else if (props.done > 80 && props.done <= 99) {
      setColor('#66cc00')
    } else {
      setColor('#22AA00')
    } 

    const newStyle = {
      opacity: 1,
      width: `${props.done}%`,
      backgroundColor: `${color}`
    }

    setStyle(newStyle);
  }, [props.done, color])

  return (
    <div className="progress flex-grow">
      <div className="progress-q">
        <div className="q1"></div>
        <div className="q2"></div>
        <div className="q3"></div>
        <div className="q4"></div>
      </div>
			<div className="progress-done" style={style}>
			</div>

		</div>
  )
}

export default ProgressBar