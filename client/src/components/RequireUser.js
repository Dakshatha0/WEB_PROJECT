import React from 'react'
import { getItem, KEY_ACCESS_TOKEN } from '../utils/localStorageManager'
import { Outlet } from 'react-router-dom';

function RequireUser() {
    const user = getItem(KEY_ACCESS_TOKEN);
  return (
    user ? <Outlet /> : <navigate to='/login' />
  )
}

export default RequireUser