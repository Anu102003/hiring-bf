import React, { useState } from 'react'
import "../../../assets/admin/questionbank/questionbank.css"
import { Questioncard } from './QuestionCard';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SearchAddButton } from '../../../components/SearchAddButton';
export const Questionbank = () => {
    const [currentTab, setCurrentTab] = useState('Mcq');
    const tabs = [
        {
            title: 'Mcq',
            question: 'q1',
            option1: 'o1',
            option2: 'o2',
            correctoption: 'crt'
        },
        {
            title: 'Coding',
            question: 'q11',
            option1: 'o11',
            option2: 'o22',
            correctoption: 'crtt'
        }
    ]

    const handleTabClick = (e) => {
        setCurrentTab(e.target.value)
    }
    console.log(currentTab)
    return (
        <>
            <div className='questionbank-container'>
                <div className='tabs'>
                    {tabs.map((tab, i) =>
                        <>
                            <button
                                key={i}
                                id={tab.id}
                                value={tab.title}
                                // className='tab-button'
                                className={`tab-button ${tab.title == currentTab ? "tabchecked" : null}`}
                                disabled={currentTab === `${tab.title}`}
                                onClick={(handleTabClick)}
                            >
                                {tab.title}
                            </button>
                        </>
                    )}
                </div>
                <div className='button-align'>
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
                            {currentTab === "Mcq" ?
                                <Link to="/addmcq">
                                    <button>
                                        <span className='add-icon'><FontAwesomeIcon icon={faPlus} /> </span> Add
                                    </button>
                                </Link>:
                                <Link to="/addcoding">
                                <button>
                                    <span className='add-icon'><FontAwesomeIcon icon={faPlus} /> </span> Add
                                </button>
                            </Link>
                            }
                        </div>
                    </div>
                </div>
                <div className='content'>
                    {tabs.map((tab, i) =>
                        <>
                            <div >
                                {currentTab === `${tab.title}` &&
                                    <div>
                                        <div className='livecontest-container'>
                                            <Questioncard title={tab.title} question={tab.question} option1={tab.option1}
                                                option2={tab.option2} correctoption={tab.correctoption} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
