import React from 'react'
import "../../../assets/admin/sidebar/contest.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
export const LiveUpcomingContest = ({ filteredData}) => {

  const nav = useNavigate();

  const navTo = (data) => {
    console.log(data.item.cid)
    nav(`/addcomponent/${data.item.cid}`)
  }

  return (
    <>
      <div className='add-button add-align'>
        <div></div>
        <Link to="/createcontest">
        <button>
          <span className='add-icon'><FontAwesomeIcon icon={faPlus} /> </span> Add
        </button></Link>
      </div>
      {filteredData.map((item, index) => (
        <div className='livecontest-container' key={index}>
          <div>
            <div className='contest-items'>
              <h2 onClick={() => navTo({item})}>{item.name}</h2>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
