import React, { useState } from 'react'
import "../../../assets/admin/addcomponent/addcomponent.css"
import { Addcard } from './Addcard';
import { SearchAddButton } from '../../../components/SearchAddButton';
export const Addcomponents = () => {
  const [currentTab, setCurrentTab] = useState('1');
  const tabs = [
    {
      id: 1,
      tabTitle: 'MCQ',
      title: 'MCQ QUESTION',
      content: 'mcq'
    },
    {
      id: 2,
      tabTitle: 'CODING',
      title: 'CODING QUESTION',
      content: 'cod'
    },
    {
      id: 3,
      tabTitle: 'ADD PARTICIPATES',
      title: 'ADD Participates',
      content: 'emp'
    }
  ]
  const handleTabClick = (e) => {
    setCurrentTab(e.target.id)
  }
  return (
    <>
      <div className='add-container'>
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
                {tab.tabTitle}
              </button>
            </>
          )}
        </div>
        <div className='button-align'>
        <SearchAddButton/>
        </div>
        <div className='content'>
          {tabs.map((tab, i) =>
            <>
              <div key={i}>
                {currentTab === `${tab.id}` &&
                  <div>
                    <div className='livecontest-container'>
                      <Addcard content={tab.content} />
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
