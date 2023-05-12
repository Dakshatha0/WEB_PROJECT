import React from 'react'
import './UpdateProfile.scss'
import userImg from '../../assets/user.png'
function UpdateProfile() {
  return (
    <div className='UpdateProfile'>
        <div className="container">
            <div className="left-part">
                <img src={userImg} alt="" />
            </div>
            <div className="right-part">
                <form action="">
                    <input type="text" placeholder='Your Name' />
                    <input type="text" placeholder='Your bio' />
                    <input type="submit" className='btn-primary'/>
                </form>

                <button className='delete-account btn-primary'>Delete Account</button>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfile