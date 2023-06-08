import React from 'react'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({children}) => {
    const val = localStorage.getItem("ok");
    if(val==="false"){
        return <Navigate to="/combined"/>
    }
  return children
}

export default RequireAuth
