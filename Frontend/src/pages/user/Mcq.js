import { useEffect, useState } from 'react'
import { QuizData } from '../../database/QuizData'
import { Link, useParams } from 'react-router-dom'
import "../../assets/user/mcqquestion.css"
export const Mcq = () => {
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]); // Store user answers
    const [clickedOption, setClickedOption] = useState(0)
    const categoryNames = Object.keys(QuizData[currentCategoryIndex]);
    const currentCategory = categoryNames[0]; // Assuming there's only one category per object

    const {id} = useParams()

    useEffect(() => {
        loadQuestion()
    },[])

    const loadQuestion = () => {
    }
    const questions = QuizData[currentCategoryIndex][currentCategory];

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setClickedOption(0)
        } else if (currentCategoryIndex < QuizData.length - 1) {
            setCurrentCategoryIndex(currentCategoryIndex + 1);
            setCurrentQuestionIndex(0);
            setClickedOption(0)
        }
    };

    const handleAnswer = (answer) => {
        const questionId = questions[currentQuestionIndex].question;
        const answerData = { questionId, answer };
        setAnswers([...answers, answerData]);
    };

    const handleSubmit = () => {
        console.log('Submitted Answers:', answers);
    };

    return (
        <div>
            <div className='question-heading'>
                <h1>Question</h1>
            </div>

            <div className='question-card'>
                <div className='question-container'>
                    <h2>{currentCategory}</h2>
                    <div className='question'>
                        {/* <span id="question-number">{currentQuestion + 1}. </span> */}
                        Question : {questions[currentQuestionIndex].question}
                    </div>
                    <div className='option-container'>
                        {questions[currentQuestionIndex].option.map((option, index) => (
                            <button
                                className={`option-btn ${clickedOption == index + 1 ? "checked" : null}`}
                                key={index}
                                value={option}
                                onClick={() => { handleAnswer(option); setClickedOption(index + 1); }}
                            >
                                {option.option}
                            </button>

                        ))}
                    </div>
                    <div className='mcq-button-container'>

                        {currentCategoryIndex === QuizData.length - 1 &&
                            currentQuestionIndex === questions.length - 1 ? (
                            <Link to="/coding"> <button onClick={handleSubmit} className='submit-mcq-button'>Submit</button></Link>
                        ) : <button onClick={handleNextQuestion} id="next-button">Next</button>
                        }
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}

// const value = {}

// export const Mcq = () => {
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [clickedOption, setClickedOption] = useState([]);
//     const changeQuestion = () => {
//         if (currentQuestion < QuizData.length - 1) {
//             setCurrentQuestion(currentQuestion + 1);
//             setClickedOption(0);
//         } else {
//         }
//     }

//     const handleValue = (option) => {
//         value[currentQuestion] = option;
//     }
//     console.log("sel", value)

//     return (
//         <>
//             <div className='question-heading'>
//                 <h1>Question</h1>
//             </div>
//             <div className='question-card'>
//                 <div className='question-container'>
//                     <div className='question'>
//                         <span id="question-number">{currentQuestion + 1}. </span>
//                         {QuizData[currentQuestion].question}
//                     </div>
//                     <div className='option-container'>
//                         {QuizData[currentQuestion].options.map((option, i) => {
//                             return (
//                                 <button
//                                     className={`option-btn ${clickedOption == i + 1 ? "checked" : null
//                                         }`}
//                                     key={i}
//                                     value={option}
//                                     onClick={() => { handleValue(option); setClickedOption(i + 1); }}
//                                 >
//                                     {option}
//                                 </button>
//                             )
//                         })}
//                     </div>
//                     <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
//                 </div>
//             </div>
//         </>
//     )
// }
