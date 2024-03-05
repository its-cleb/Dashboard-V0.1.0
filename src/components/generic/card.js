"use client"
import React, { useState } from 'react'
import { TbArrowAutofitHeight, TbArrowAutofitWidth } from "react-icons/tb"
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci"
import "../../app/styles.css"
import './card.css'

// --- <Card> ---
const Card = (props) => {
  const activeFlex = Boolean(props.flex === undefined) ? 1 : props.flex
  const styleClasses = "card shadow-shallow" + " " + (Boolean(props.className === undefined) ? "" : props.className)

  return (
    <div className={styleClasses}  style={{flex: activeFlex}}>
      <div className="card-header">

        <a href={props.link} className="card-title" style={{flex: 1}}>{props.title}</a>

      </div>
      <div className="card-content">
        {props.children}
      </div>
    </div>
  )
}

// --- <CardResizable> ---
const CardResizable = (props) => {
  const propFlex = Boolean(props.flex !== undefined) ? props.flex : 1
  const [ cardFlex, setCardFlex ] = useState(propFlex)
  const [ cardHeight, setCardHeight ] = useState(0)

  const widthDecrease = () => {
    Boolean(cardFlex > 1) ? 
      setCardFlex(cardFlex - 1)
      :
      setCardFlex(1)
  }

  const widthIncrease = () => {
    setCardFlex(cardFlex + 1)
  }

  const HeightDecrease = () => {
    Boolean(cardHeight >= 80) ? 
      setCardHeight(cardHeight - 45)
      :
      setCardHeight(0)
  }

  const HeightIncrease = () => {
    setCardHeight(cardHeight + 45)
  }

  return (
    <div className="card shadow-shallow"  style={{flex: cardFlex}}>
      <div className="card-header">
        <div className="row" style={{flex: 1, justifyContent: 'flex-start', paddingLeft: 5}}>
          <CiCircleMinus className="icon-hover-red" color={Boolean(cardFlex === 1) ? '#999999' : '#AA0000'} onClick={widthDecrease} />
          <TbArrowAutofitWidth className="icon-dimension" color={'#777777'}/>
          <CiCirclePlus className="icon-hover-green" color={'#00AA00'} onClick={widthIncrease} />
        </div>
        <a href={props.link} className="card-title" style={{flex: 1}}>{props.title}</a>
        <div className="row" style={{flex: 1, justifyContent: 'flex-end', paddingRight: 5}}>
          <CiCircleMinus className="icon-hover-red" color={Boolean(cardHeight === 0) ? '#999999' : '#AA0000'} onClick={HeightDecrease} />
          <TbArrowAutofitHeight className="icon-dimension" color={'#777777'} />
          <CiCirclePlus className="icon-hover-green" color={'#00AA00'} onClick={HeightIncrease}  /> 
        </div>
      </div>
      <div className="card-content" style={Boolean(cardHeight === 0) ? {} : {height: cardHeight}}>
        {props.children}
      </div>
    </div>
  )
}

// --- <Card Info> ---
const CardInfo = (props) => {
  const styleClasses = "card-info" + " " + (Boolean(props.colorClass === undefined) ? "" : props.colorClass)

  return (
    <div className={styleClasses}>
      <div>
        {props.children}
      </div>
    </div>
  )
}

// --- <Card Line> ---
const CardLine = (props) => {
  const styleClasses = "card-line" + " " + (Boolean(props.colorClass === undefined) ? "" : props.colorClass)

  return (
    <div className={styleClasses}>
      {props.children}
    </div>
  )
}

// --- <Panel> ---
const Panel = (props) => {
  const activeFlex = Boolean(props.flex === undefined) ? 1 : props.flex

  return (
    <div className="panel"  style={{flex: activeFlex}}>
      <div className="panel-header">
        <div className='bold'>{props.title}</div>
      </div>
      <div className="panel-content">
        {props.children}
      </div>
    </div>
  )
}

// --- <Section> ---
const Section = (props) => {
  const styleClasses = "section " + 
    (Boolean(props.className === undefined) ? "" : props.className) +
    (props.centeredContent ? " flex" : "")
  const activeFlex = Boolean(props.flex === undefined) ? '1' : props.flex
  const hasHeader = Boolean(props.title === undefined) ? false : true

  return (
    <div className={styleClasses} style={{flex: activeFlex}}>
      {hasHeader ?
        <div className="section-header">
          <div className='bold'>{props.title}</div>
        </div>
        : null
      }
      <div className="section-content flex-1">
        {props.children}
      </div>
    </div>
  )
}


export { Card, CardResizable, CardInfo, CardLine, Panel, Section } 