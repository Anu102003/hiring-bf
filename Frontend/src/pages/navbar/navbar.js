import React from 'react'
import { Link } from 'react-router-dom'
import "../../assets/navbar/navbar.css"
import img from '../../logo.png'

export const Navbar = () => {
  const handleLogout=(e)=>{
    e.preventDefault()
    // console.log("log")
  }
  return (
    <>
    <div className='navbar-items'>
        <div className='nav-logo'>
            <img src={img} height="100px"  width="100px"/>
        </div>
        <div className='navbar-content'>
                <Link to="/admincontestmenu"><p>Contestdetails</p></Link>
                <Link to="/employeedetails"><p>EmployeeDetails</p></Link>
                <Link to="/questionbank"><p>Questionbank</p></Link>
                <button onClick={(e)=>{handleLogout(e)}}><p>Logout</p></button>
                {/* <p>Logout</p> */}
        </div>
    </div>
    </>
  )
}
