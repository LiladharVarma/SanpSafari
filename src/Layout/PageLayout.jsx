import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Navbar/Navbar'

const PageLayout = (props) => {
  const [gotFromNav , setNav ] = useState(true) ; 
  const [text , setText] = useState("") ; 
  const [clicked , setClicked] = useState(false) ; 

  function getText (receivedText , fetch){
    setText(receivedText) ; 
    setClicked(fetch) ; 
  
   
 
  }
  useEffect(()=>{
    props.getState(text , clicked) ; 

    console.log("from Page Layout " , text) ; 
    console.log("from Page Layout Search is  " , clicked) ; 
  } , [text , clicked]) ; 

 
  function getStyleFromNav(style){
    setNav(style) ; 
    props.getStyle(gotFromNav) ; 
  }

  return (
    <div>
        <Navbar getStyle = {getStyleFromNav} getQuery = {getText} />
        <Outlet />
    </div>
  )
}

export default PageLayout