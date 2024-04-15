import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import "../../../assets/admin/sidebar/contest.css"
export const ContestLog = () => {
  return (
    <>
      <div className='livecontest-container'>
        <div>
          <div className='contest-items'>
            <div className='contest-title'>
            <h2>Contest 1</h2>
            </div>
            <div className='view-button'>
              <button>  
                 <span className='view-icon'><FontAwesomeIcon icon={faEye} /></span>
                View Score</button>
            </div>
          </div>
          <div className='contest-items'>
          <div className='contest-title'>
            <h2>Contest 1</h2>
            </div>
            <div className='view-button'>
              <button>
              <span className='view-icon'><FontAwesomeIcon icon={faEye} /></span>
                View Score</button>
            </div>
          </div>
          <div className='contest-items'>
          <div className='contest-title'>
            <h2>Contest 1</h2>
            </div>
            <div className='view-button'>
              <button>
              <span className='view-icon'><FontAwesomeIcon icon={faEye} /></span>
                View Score</button>
            </div>
          </div>
          <div className='contest-items'>
          <div className='contest-title'>
            <h2>Contest 1</h2>
            </div>
            <div className='view-button'>
              <button>
              <span className='view-icon'><FontAwesomeIcon icon={faEye} /></span>
                View Score</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
