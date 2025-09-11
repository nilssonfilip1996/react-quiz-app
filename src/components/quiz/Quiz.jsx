import Question from "./Question";
import QUESTIONS from "../../questions.js"
import { useState } from "react";
import Summary from "./Summary/Summary.jsx";


/**
 * questions array has to be a certain format, see questions.js.
 * @param {*} questions, array to extract correct answers from.
 * @returns array containing the correct answers.
 */
function extractCorrectAnswers(questions) {
    let correctAnswers = [];
    correctAnswers = questions.map((question) => {
        return question.answers[0];
    });
    
    return correctAnswers;
}


/**
 * questions array has to be a certain format, see questions.js.
 * @param {*} questions, array to extract question text from.
 * @returns array containing the questions text.
 */
function extractQuestions(questions) {
    let questionsArray = [];
    questionsArray = questions.map((question) => {
        return question.text;
    });
    
    return questionsArray;
}

export default function Quiz() {
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    function initiateQuiz(){
        setSelectedAnswers([]);
    }

    /**
     * Adds an answer to the latest question and updates the selectedAnswers state.
     * @param {*} selectedAnswer answer to the latest question.
     */
    function handleUserSelect(selectedAnswer){
        setSelectedAnswers((prevSelectedAnswers) => [...prevSelectedAnswers, selectedAnswer]);
    }

    var currentQuestionIndex = selectedAnswers.length;
    var isQuizActive = currentQuestionIndex < QUESTIONS.length ? true : false;
    

    return (
        <>
            <div id="quiz">
                {isQuizActive && <Question question={QUESTIONS[currentQuestionIndex]} onLockInAnswer={handleUserSelect} initialTimer={6000}/>}
                {!isQuizActive && <Summary questionsArray={extractQuestions(QUESTIONS)} userAnswersArray={selectedAnswers} correctAnswersArray={extractCorrectAnswers(QUESTIONS)} onStartOver={initiateQuiz} /> }
            </div>
        </>
    );
}