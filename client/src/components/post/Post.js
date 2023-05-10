import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss'
import backgroundImg from '../../assets/backgroundImage.jpg'
import {AiOutlineHeart} from 'react-icons/ai'
function Post({post}) {
  return (
    <div className='Post'>
        <div className="heading">
            <Avatar/>
            <h4>Dakshatha Kasturi</h4>
        </div>
        <div className="content">
            <img src={backgroundImg} alt='' />
        </div>
        <div className="footer">
            <div className="like">
                <AiOutlineHeart className='icon'/>
                <h4>4 likes</h4>
            </div>
            <p className='caption'>This is a picture of building</p>
            <h6 className='time-ago'>4 hours ago</h6>
        </div>
    </div>
  )
}

export default Post