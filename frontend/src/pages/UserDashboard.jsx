import {  ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from "react-router"
import LogoutButton from '../components/LogoutButton'

const UserDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
    {/* Sidebar */}
    {/* <nav style={{ padding: "20px", background: "#f4f4f4" }}>
      <h3>Dashboard</h3>
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/dashboard/profile">Profile</Link></li>
        <li><Link to="/dashboard/settings">Settings</Link></li>
      </ul>
    </nav> */}

    {/* Main Content */}
    <main>
      <div className="w-screen h-full ">

    
      {/* </div> */}
     <div className='flex flex-wrap justify-center items-center bg-orange-500'>
      <div className="mt-15">
        <div className="self-place-end my-10 bg-gray-400 w-30 flex justify-center p-2 rounded-xl">
      <LogoutButton  />
      
        </div>
     <h1 className='text-6xl font-bold text-white text-center '>Welcome to <br /> 300I GROUP 7 VOTING APP</h1>
     <p className="text-center text-green-800 text-4xl font-bold"> online voting app</p>
     <p className="text-center text-gray-800 text-3xl font-bold"> voting anywhere</p>
      </div>

     <img src="https://static.vecteezy.com/system/resources/previews/050/595/326/non_2x/attractive-young-man-excited-looking-at-her-mobile-phone-standing-isolate-on-transparency-background-png.png" alt="" />
     </div>
     <div className="my-10">

      <Link to={"/verify-otp"}>
      <p className='text-xl text-center hover:text-green-800 flex justify-center items-center gap-2 cursor-pointer'>Let's Go & Vote 
        <ArrowRight/>
      </p>
      </Link>
     </div>
      </div>

      <Outlet/>
    </main>

  </div>
  )
}

export default UserDashboard