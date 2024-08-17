import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/config'
import{logout} from '../../store/authSlice'

const LogoutButton = () => {

const dispatch = useDispatch()

const handleLogout = () => {
    authService.logout().then( () => {
        dispatch(logout())
    } )
   
}

  return (
    <button className='inline-block px-6 py-2 duration-200
    hover:bg-blue-300'>Logout</button>
  )
}

export default LogoutButton
