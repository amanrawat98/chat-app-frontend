import React from 'react'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    let token = localStorage.getItem("token");
    if (token) {
       return <Navigate to="/chat" />
    }
    return children;
}

export default PublicRoute