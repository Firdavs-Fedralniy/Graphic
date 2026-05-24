import React, { useEffect } from 'react'
import { Route, Routes} from 'react-router-dom'
import Default from '../pages/Default/Default'
import Login from '../pages/Login/Login'
import Signin from '../pages/Signin/Signin'
import Notifications from '../pages/Notifications/Notifications'
import Home from '../pages/Home/Home'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import CreateGraphic from '../pages/CreateGraphic/CreateGraphic'
import MyGraphic from '../pages/MyGraphic/MyGraphic'
import { useNotificationChecker } from './hooks/useNotificationsChecker'

function App() {
useNotificationChecker()
 
   
  return <>
  <Routes>
    <Route path='/' element={<Default/>}  />
    <Route path='/login' element={<Login/>}  />
    <Route path='/signIn' element={<Signin/>}  />
    <Route path='/notifications' element={
<ProtectedRoute>
  <Notifications/>
</ProtectedRoute>
    }  />
    <Route path='/home' element={
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    }  />
    <Route path='/createGraphic' element={
      <ProtectedRoute>
      <CreateGraphic/>
    </ProtectedRoute>}/>
     <Route path='/myGraphic' element={
      <ProtectedRoute>
      <MyGraphic/>
    </ProtectedRoute>}/>
    
  </Routes>
  </>
}

export default App
