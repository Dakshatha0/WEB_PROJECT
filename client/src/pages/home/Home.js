import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
  <>
    <Navbar />
    <div className='outlet' style={{marginTop: "60px"}}>
      <Outlet style={{marginTop: '60px'}}/>
    </div>
  </>
  );
}

export default Home;