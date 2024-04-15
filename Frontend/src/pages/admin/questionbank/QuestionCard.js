import React from 'react'
import { Link } from 'react-router-dom';
import "../../../assets/admin/questionbank/questionbank.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
export const Questioncard = (props) => {

    console.log(props.title)
    return (
        <>
            <div>
                <div className='questionbank-component'>
                    <div className='questionbank-card'>
                        <div>
                            <div className='question-data'>
                                <h3>Question : </h3>
                                <p >{props.question}</p>
                            </div>
                            <div className='question-data'>
                                <h3>Option 1 :</h3>
                                <p> {props.option1}</p>
                            </div>
                            <div className='question-data'>
                                <h3>Option 2 :</h3>
                                <p>{props.option2}</p>
                            </div>
                            <div className='question-data'>
                                <h3>Correct option :</h3>
                                <p> {props.correctoption}</p>
                            </div>
                        </div>
                        <div>
                            <div className='edit-delete-button'>
                                <div className='edit-button'>
                                    {props.title==="Mcq" ?
                                        <Link to="/addoreditmcq">
                                            <button>
                                                <span className='add-icon'><FontAwesomeIcon icon={faPen} /> </span> Edit
                                            </button>
                                        </Link>:
                                        <Link to="/addoreditcoding">
                                        <button>
                                            <span className='add-icon'><FontAwesomeIcon icon={faPen} /> </span> Edit
                                        </button>
                                    </Link>
                                    }
                                </div>
                                <div className='delete-button'>
                                    <button>
                                        <span className='add-icon'><FontAwesomeIcon icon={faTrash} /> </span> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}
