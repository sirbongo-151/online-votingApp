import React from 'react'
import LogoutButton from './LogoutButton'
import ToggleTheme from './ToggleTheme'

const Navbar = () => {
  return (
    <div className="flex gap-4 items-center justify-center my-2">
        <LogoutButton/>
        <ToggleTheme/>
    </div>
  )
}

export default Navbar