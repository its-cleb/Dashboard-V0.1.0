import React from 'react'
import Link from 'next/link'
import './common.css'
import "./gridtable.css"

// --- <Row> ---
const Row = (props) => {
  const hasMarV = Boolean(props.marV === undefined) ? false : true
  const hasMarT = Boolean(props.marT === undefined) ? false : true
  const hasMarB = Boolean(props.marB === undefined) ? false : true
  const styleClasses = "row" + (Boolean(props.className === undefined) ? "" : (" " + props.className))

  return (
    <div className={styleClasses} style={{
      flex: props.flex, 
      paddingTop: props.padV,
      paddingBottom: props.padV,
      marginTop: hasMarV ? props.marV : (hasMarT ? props.marT : 0),
      marginBottom: hasMarB ? props.marB : (hasMarB ? props.marB : 0)
    }}>
      {props.children}
    </div>
  )
}

// --- <Column> ---
const Column = (props) => {
  const styleClasses = "column" + (Boolean(props.className === undefined) ? "" : (" " + props.className))

  return (
    <div className={styleClasses} style={{flex: props.flex}}>
      {props.children}
    </div>
  )
}

// --- <Button> ---
const Button = (props) => {
  const styleClasses = "btn" + (Boolean(props.className === undefined) ? "" : (" " + props.className))

  return (
    <Link href={props.href}> 
      <button className={styleClasses}>
        {props.children}
      </button>
    </Link>
  )
}

// --- <IconButton> ---
const IconButton = (props) => {
  const styleClasses = "btn flex center-all" + (Boolean(props.className === undefined) ? "" : (" " + props.className))

  return (
    <Link href={props.href}> 
      <button className={styleClasses}>
        {props.children}
      </button>
    </Link>
  )
}

// --- <Tooltip> ---
const Tooltip = (props) => {
  const styleClasses = "tooltip flex center-all" + (Boolean(props.className === undefined) ? "" : (" " + props.className))

  return (
    <div class={styleClasses}> 
      {props.children}
      <span class="tooltip-text shadow-shallow">{props.info}</span>
    </div>
  )
}

export { Button, Row, Column, IconButton, Tooltip } 