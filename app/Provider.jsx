"use client"
import React, { useState } from 'react'
import { ControllerValueContext } from '@/context/ControllerValueContext'

function Provider({children}) {

    const [value,setValue]=useState({
        bgRounded:'',
        bgPadding:0
    });
  return (
    <ControllerValueContext.Provider value={{value,setValue}}>
  <div>{children}</div>
    </ControllerValueContext.Provider>
  
  )
}

export default Provider