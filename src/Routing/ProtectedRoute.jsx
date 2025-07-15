import React from 'react'
import {Navigate,Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

    const getuser = () => {
        return localStorage.getItem('token');
    }
    console.log(getuser());

 return getuser() ? <Outlet /> : <Navigate to="/login" replace />;  
}

export default ProtectedRoute