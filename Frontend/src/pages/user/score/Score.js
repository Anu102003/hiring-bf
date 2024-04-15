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
        <div class="table">
                        <div class="header">
                            <div class="cell">Grammar</div>
                            <div class="cell">Logical</div>
                            <div class="cell">Coding</div>
                            <div class="cell">Programming</div>
                        </div>
                        <div class="row" >
                            <div class="cell">10</div>
                            <div class="cell">10</div>
                            <div class="cell">12</div>
                            <div class="cell">1</div>
                        </div>
                        
                    </div>
        <div className='circle'>
        <CircularProgressBar/>

        {/* <CircularProgressBar percentage={percentage} circleWidth="200"/> */}
        </div>
    </div>
   
    </>
  )
}
