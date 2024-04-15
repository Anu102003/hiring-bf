import React, { useDebugValue, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "../../assets/employee/addemployee.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { request } from '../admin/helper/axios_helper';
export const Candidatedetails = () => {

    const [guest, setGuest] = useState([])
    const {id} = useParams()
    useEffect(() => {
        load()
    },[])

    const load = () => {
        request("GET", `/employee/getCandiDetails/${id}`)
        .then((res) => setGuest(res.data.data))
    }

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
                        {
                            guest.map((data) => (
                                <div class="row" >
                            <div class="cell">{data.userId}</div>
                            <div class="cell">{data.name}</div>
                            <div class="cell">
                                <div className='view-details-button'>
                                <Link to={`/singlecandidatedetails/${data.userId}`}> <button>
                                        <span className='view-icon'><FontAwesomeIcon icon={faCircleInfo} /></span>
                                        View Details</button></Link>
                                </div>
                            </div>
                        </div>
                            ))
                        }
                    </div>
                </div>
            </div></>
    )
}
