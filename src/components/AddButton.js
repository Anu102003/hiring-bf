import React from 'react'
import "../assets/component/addbutton.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
export const AddButton = () => {
    return (
        <>
            <div className='add-button'>
                <button>
                    <span className='add-icon'><FontAwesomeIcon icon={faPlus} /> </span> Add
                </button>
            </div>
        </>
    )
}
