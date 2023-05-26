import React from 'react'
import Nav from '../Nav/Nav'
import {Outlet} from 'react-router-dom'
export default function Layout({userData ,logOut}) {
  return (
    <div>
        <Nav userData={userData} logOut={logOut}> </Nav>
        <div className='container'>
         <Outlet></Outlet>
        </div>
    </div>
  )
}
