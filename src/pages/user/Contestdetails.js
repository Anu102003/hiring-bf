import React from 'react'
import "../../assets/user/contestdetails.css"
export const Contestdetails = () => {
  return (
    <>
    <div className='contest-heading'>
    <h1>Contest</h1>
    </div>
    <div className='contest-card'>
      <div className='contest-title'>
    <h2>Divum Coding Contest</h2>
    <p>Oct 5 2023, 08:40 am IST to Oct 5 2023, 09:40 am IST</p>
    </div>
    <div className='contest-details'>
    <h3>Description :</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
    <h3>Rules :</h3>
    <ul>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li>
    </ul>
    <div className='contest-score'>
    <h3>Total Score :</h3>
    <p>100</p>
    </div>
    </div>
    <div className='contest-enter-btn'>
    <button>Enter Contest</button>
    </div>
    </div>
   
    </>
  )
}
