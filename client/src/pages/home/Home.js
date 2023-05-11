import React from 'react';
//import { axiosClient } from '../../utils/axiosClient';
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
function Home() {
  return <>
    <Navbar />
    <Outlet style={{marginTop: '60px'}}/>
  </>;
}

export default Home;