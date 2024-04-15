import React from 'react'
import "../assets/component/searchaddbutton.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const SearchAddButton = () => {
    return (
        <div className='menu-search'>
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
                <button>
                    <span className='add-icon'><FontAwesomeIcon icon={faPlus} /> </span> Add
                </button>
            </div>
        </div>
    )
}
