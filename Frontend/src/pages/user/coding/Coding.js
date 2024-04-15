import React from 'react'
import "../../../assets/user/codingquestion.css"
import { Editor } from './Editor'

export const Coding = () => {
  return (
    <>
    <div className='coding-question-heading'>
            <h1>Coding</h1>
        </div>
    <div className='coding-container'>
    <div className='coding-question-card'>
        <h3>Queston :</h3>
        <p>Given an array A of size N and an integer B you have to return the same array after rotating it B times towards the right</p>
        <h3>Test Cases :</h3>
        <h3>Sample Input 1 :</h3>
        <div className='sample-input'>
            <p>1 2 3 4</p>
        </div>
        <h3>Sample Output 1 :</h3>
        <div className='sample-input'>
            <p>1 2 3 4</p>
        </div>
        <h3>Output</h3>
        <div className='sample-input'>
            <p>1 2</p>
        </div>
        <h3>Success / Error :</h3>
        <div className='sample-input'>
            <p>1 2</p>
        </div>
    </div>
    <div className='editor-wrapper'>
        <div className='editor'>
           <Editor/>
        </div>
        </div>
    </div>
    </>
  )
}
