import React from 'react'

export const Addcard = (props) => {
    const a=props.content
    console.log(a)
  return (
    <>
    <div>
          <div className='add-component'>
            
            <h2>{props.content}</h2>
          </div>
        </div></>
  )
}
