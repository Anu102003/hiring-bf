import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import "../../../assets/admin/sidebar/contest.css"
import { Link, useNavigate } from 'react-router-dom'
export const ContestLog = ({filteredliveData}) => {

  const nav = useNavigate()
  const navigateTo = (id) => {
    nav(`/userscorelist/${id}`)
  }
  return (
    <>
    {filteredliveData.map((item, index) => (
      
      <div className='livecontest-container' key={index}>
        <div>
          <div className='contest-items'>
            <div className='contest-title'>
            <h2>{item.name}</h2>
            </div>
            <div className='view-button'>
              <Link to={`/userscorelist/${item.cid}`}>
              <button>
                <span className='view-icon'><FontAwesomeIcon icon={faEye} /></span>View Score</button></Link>
            </div>
          </div>
        </div>
      </div>
      ))}
    </>
  )
}
