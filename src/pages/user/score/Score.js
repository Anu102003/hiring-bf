import React, { useState } from 'react'
import "../../../assets/user/score.css"
import CircularProgressBar from './CircularProgressBar';
export const Score = () => {
  const [percentage,setPercentage]=useState(75);
  return (
    <>
    <div className='score-heading'>
    <h1>Score</h1>
    </div>
    <div className='score-card'>
        <h2>Total Score</h2>
        <div className='score-details'>
        <h3>Name : </h3>
        <p>Anu</p>
        </div>
        <div className='score-details'>
        <h3>Email : </h3>
        <p>anusumathi2003@gamil.com</p>
        </div>
        <div className='circle'>
        <CircularProgressBar percentage={percentage} circleWidth="200"/>
        </div>
    </div>
   
    </>
  )
}
