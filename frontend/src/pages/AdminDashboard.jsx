import React from 'react'
import {Link} from "react-router-dom"
import { Outlet } from "react-router"
import VotingPage from './VotingPage'

const AdminDashboard = () => {
  return (
  
  <div className="w-screen h-full">
   <VotingPage/>
  </div>
    
    
  )
}

export default AdminDashboard