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

export default function Quiz() {
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    function handleUserSelect(selectedAnswer){
        setSelectedAnswers((prevSelectedAnswers) => [...prevSelectedAnswers, selectedAnswer]);
    }

    var currentQuestionIndex = selectedAnswers.length;
    //console.log(selectedAnswers);
    
    var isQuizActive = currentQuestionIndex < questions.length ? true : false;
    

    return (
        <>
            <div id="quiz">
                {isQuizActive && <Question question={questions[currentQuestionIndex]} onLockInAnswer={handleUserSelect} initialTimer={2000}/>}
                {!isQuizActive && <Summary userAnswers={selectedAnswers} correctAnswers={extractCorrectAnswers(questions)} /> }
            </div>
        </>
    );
}