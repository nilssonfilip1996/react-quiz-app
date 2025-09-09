import Question from "./Question";
import questions from "../../questions.js"
import { useState } from "react";
import Summary from "./Summary/Summary.jsx";

function extractCorrectAnswers(questions) {
    let correctAnswers = [];
    correctAnswers = questions.map((question) => {
        return question.answers[0];
    });
    
    return correctAnswers;
}

function extractQuestions(questions) {
    let questionsArray = [];
    questionsArray = questions.map((question) => {
        return question.text;
    });
    
    return questionsArray;
}

export default function Quiz() {
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    /**
     * Adds an answer to the latest question and updates the selectedAnswers state.
     * @param {*} selectedAnswer answer to the latest question.
     */
    function handleUserSelect(selectedAnswer){
        setSelectedAnswers((prevSelectedAnswers) => [...prevSelectedAnswers, selectedAnswer]);
    }

    var currentQuestionIndex = selectedAnswers.length;
    var isQuizActive = currentQuestionIndex < questions.length ? true : false;
    

    return (
        <>
            <div id="quiz">
                {isQuizActive && <Question question={questions[currentQuestionIndex]} onLockInAnswer={handleUserSelect} initialTimer={6000}/>}
                {!isQuizActive && <Summary questionsArray={extractQuestions(questions)} userAnswersArray={selectedAnswers} correctAnswersArray={extractCorrectAnswers(questions)} /> }
            </div>
        </>
    );
}