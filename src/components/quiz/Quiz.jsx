import Question from "./Question";
import questions from "../../questions.js"
import { useState } from "react";

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
                {isQuizActive && <Question question={questions[currentQuestionIndex]} onLockInAnswer={handleUserSelect} />}
                {!isQuizActive && "You have answered all the questions, standby for results."}
            </div>
        </>
    );
}