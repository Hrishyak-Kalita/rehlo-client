import React from 'react'
import { useAuth } from '../../Context/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Private = ({children}) => {
    const {isAuthenticated}= useAuth()
    const location = useLocation();

    if(!isAuthenticated) return <Navigate to="/sign-in"  state={{ from: location }} />

  return (
    <>
        <Outlet/>
    </>
  )
}

export default Private