import React from 'react';
import './Navbar.scss';
import Avatar from '../avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
function Navbar() {

  const navigate = useNavigate();
  //const loadingRef = useRef();

  return (
    <div className="Navbar">
      {/* <LoadingBar color='#5f9fff' ref={ref} /> */}
      <div className='container'>
        <h2 className='banner hover-link' onClick={() => navigate('/')}>
          Social Media
        </h2>
        <div className="right-side">
          <div className="profile hover-link" onClick={() => navigate('/profile/asbr')}>
            <Avatar />
          </div>
          <div className="logout hover-link">
            <AiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar