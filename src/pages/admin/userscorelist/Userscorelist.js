import React, { useState } from 'react'
import "../../../assets/admin/userscore/userscorelist.css"
import { SearchButton } from '../../../components/SearchButton'
export const Userscorelist = () => {
    const[clickedCard,setClickedCard]=useState("");
    const handlescoreclick=(e)=>{
        setClickedCard(e);
    }
    console.log(clickedCard)
    return (
        <>
            <div className='score-container'>
                <div className='score-card'>
                    <h1>Candidate Score</h1>
                    <div className="score-details">
                        <h3>Contest Name :</h3>
                        <p>Contest 1</p>
                    </div>
                    <h2>Leaderboard:</h2>
                    <div className='search-container'>
                        <SearchButton />
                    </div>

                    <div class="table">
                        <div class="header">
                            <div class="cell">Rank</div>
                            <div class="cell">Name</div>
                            <div class="cell">MCQ Score</div>
                            <div class="cell">Coding Score</div>
                        </div>
                        <div class="row" onClick={()=>handlescoreclick("r1")}>
                            <div class="cell">R1</div>
                            <div class="cell">N1</div>
                            <div class="cell">S1</div>
                            <div class="cell">D1</div>
                        </div>
                        <div class="row" onClick={()=>handlescoreclick("r1")}>
                            <div class="cell">R2</div>
                            <div class="cell">N2</div>
                            <div class="cell">S2</div>
                            <div class="cell">D2</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
