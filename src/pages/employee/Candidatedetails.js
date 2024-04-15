import React from 'react'
import "../../assets/employee/addemployee.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
export const Candidatedetails = () => {
    return (
        <>
            <div className='score-container'>
                <div className='score-card'>
                    <h1>Candidate Details</h1>
                    <div class="table">
                        <div class="header">
                            <div class="cell">Candidate Id</div>
                            <div class="cell">Name</div>
                            <div class="cell">Details</div>
                        </div>
                        <div class="row" >
                            <div class="cell">c1</div>
                            <div class="cell">Deepsi</div>
                            <div class="cell">
                                <div className='view-details-button'>
                                    <button>
                                        <span className='view-icon'><FontAwesomeIcon icon={faCircleInfo} /></span>
                                        View Details</button>
                                </div>
                            </div>
                        </div>
                        <div class="row" >
                            <div class="cell">c2</div>
                            <div class="cell">Deepan</div>
                            <div class="cell">
                            <div className='view-details-button'>
                                    <button>
                                        <span className='view-icon'><FontAwesomeIcon icon={faCircleInfo} /></span>
                                        View Details</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div></>
    )
}
