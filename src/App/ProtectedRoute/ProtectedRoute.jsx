import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {
   const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
    return token ? children :  useEffect(()=>{
      navigate("/")
    })
}

export default ProtectedRoute
