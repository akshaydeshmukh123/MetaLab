 import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './component/Home'

import Login from './component/Login'
import Signup from "./component/Signup"

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
  )
}

export default AllRoutes