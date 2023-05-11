import React from 'react'
import './Profile.scss'
import Post from '../post/Post'
import userImg from '../../assets/user.png'

function Profile() {
  return (
    <div className='Profile'>
      <div className='container'>
        <div className="left-part">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className='right-part'>
          <div className="profile-card">
            <img className='user-img' src= {userImg} alt="" />
            <h3 className='user-name'>Dakshatha Kasturi</h3>
            <div className="follower-info">
              <h4>40 Followers</h4>
              <h4>12 Following</h4>
            </div>
            <button className='follow btn-primary'>Follow</button>
            <button className='update-profile btn-secondary'>Update Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile