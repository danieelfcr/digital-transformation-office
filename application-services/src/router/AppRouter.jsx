import React from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage } from '../views'


export const AppRouter = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                
                <Route path='/login' element = {<LoginPage/>} />
                <Route path="/*" element={ < Navigate to="/login" /> } />  
            </Routes>
        </BrowserRouter>
    </>
  )
}
