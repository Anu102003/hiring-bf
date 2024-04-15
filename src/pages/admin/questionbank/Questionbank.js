import React, { useState } from 'react'
import "../../../assets/admin/questionbank/questionbank.css"
import { Questioncard } from './QuestionCard';
import { SearchAddButton } from '../../../components/SearchAddButton';
export const Questionbank = () => {
    const [currentTab, setCurrentTab] = useState('1');
    const tabs = [
        {
            id: 1,
            title: 'Mcq',
            question: 'q1',
            option1: 'o1',
            option2: 'o2',
            correctoption: 'crt'
        },
        {
            id: 2,
            title: 'Coding',
            question: 'q11',
            option1: 'o11',
            option2: 'o22',
            correctoption: 'crtt'
        }
    ]

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id)
    }
    return (
        <>
            <div className='questionbank-container'>
                <div className='tabs'>
                    {tabs.map((tab, i) =>
                        <>
                            <button
                                key={i}
                                id={tab.id}
                                className='tab-button'
                                disabled={currentTab === `${tab.id}`}
                                onClick={(handleTabClick)}
                            >
                                {tab.title}
                            </button>
                        </>
                    )}
                </div>
                <div className='button-align'>
                    <SearchAddButton />
                </div>
                <div className='content'>
                    {tabs.map((tab, i) =>
                        <>
                            <div key={i}>
                                {currentTab === `${tab.id}` &&
                                    <div>
                                        <div className='livecontest-container'>
                                            <Questioncard title={tab.title} question={tab.question} option1={tab.option1} 
                                            option2={tab.option2} correctoption={tab.correctoption}/>
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
