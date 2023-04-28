import React from 'react'
import './Navbar.scss'
import Avatar from '../avatar/Avatar'
function Navbar() {
  return (
    <div className="Navbar">
      <div className='container'>
        <h2 className='banner'>
          Social Media
        </h2>
        <div className="right-side">
          <div className="profile">
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar