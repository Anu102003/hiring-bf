import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
export const Codingcard = () => {
//   const a = props.content
//   console.log(a)
  return (
    <>
      <div>
      <div className='menu-search add-cards'>
            <div className='search-bar'>
                <span className='search-icon'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                <input
                    className="nav-card__search-input"
                    type="text"
                    placeholder="Enter the Contest Name"
                // onChange={handleInputChange}
                // value={query}
                />
            </div>
            
            <div className='add-button'>
            <Link to="/addcoding">
                <button>
                    <span className='add-icon'><FontAwesomeIcon icon={faPlus} /> </span> Add
                </button>
                </Link>
            </div>
        </div>

        <div className='add-component'>
          {/* <h2>{props.content}</h2> */}
          <h3>sdc</h3>
          {/* <h2>{props.content}</h2> */}
          <h3>sdc</h3>
          {/* <h2>{props.content}</h2> */}
          <h3>sdc</h3>
        </div>
      </div></>
  )
}
