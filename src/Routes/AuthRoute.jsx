import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function AuthRoute() {
  return (
 !localStorage.getItem("admin-LMS-UId") ?
 <Outlet /> :<Navigate to={"/dashboard"} />


)
}

export default AuthRoute