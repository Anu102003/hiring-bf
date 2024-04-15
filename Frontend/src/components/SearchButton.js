import React from 'react'
import "../assets/component/searchbutton.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
export const SearchButton = () => {
  return (
   <>
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
                        </div></>
  )
}
