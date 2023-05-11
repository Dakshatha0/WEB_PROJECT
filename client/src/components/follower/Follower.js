import React from 'react'
import Avatar from '../avatar/Avatar'
import './Follower.scss'
function Follower() {
  return (
    <div className='Follower'>
        <div className="user-info">
            <Avatar />
            <h4 className='name'>Sri Uppalapati</h4>
        </div>
        <Avatar />
        <h4 className='name'>Sri Uppalapati</h4>
        <h5 className='hover-link follow-link'>Follow</h5>
    </div>
  )
}

export default Follower