import React from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage } from '../views'
import { DashboardPage } from '../views'


export const AppRouter = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/dashboard' element = {<DashboardPage/>} />
                <Route path='/login' element = {<LoginPage/>} />
                <Route path="/*" element={ < Navigate to="/login" /> } />  
            </Routes>
        </BrowserRouter>
    </>
  )
}
