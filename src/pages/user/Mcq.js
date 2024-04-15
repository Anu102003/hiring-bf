import { useState } from 'react'
import { QuizData } from '../../database/QuizData'
import "../../assets/user/mcqquestion.css"

const value = {}

export const Mcq = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [clickedOption, setClickedOption] = useState([]);
    const changeQuestion = () => {
        if (currentQuestion < QuizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
        } else {
        }
    }

    const handleValue = (option) => {
        value[currentQuestion] = option;
    }
    console.log("sel",value)

    return (
        <>
        <div className='question-heading'>
            <h1>Question</h1>
        </div>
            <div className='question-card'>
                <div className='question-container'>
                    <div className='question'>
                        <span id="question-number">{currentQuestion + 1}. </span>
                        {QuizData[currentQuestion].question}
                    </div>
                    <div className='option-container'>
                        {QuizData[currentQuestion].options.map((option, i) => {
                            return (
                                <button
                                    className={`option-btn ${clickedOption == i + 1 ? "checked" : null
                                        }`}
                                    key={i}
                                    value={option}
                                    onClick={() => { handleValue(option); setClickedOption(i + 1); }}
                                >
                                    {option}
                                </button>
                            )
                        })}
                    </div>
                    <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
                </div>
            </div>
        </>
    )
}
