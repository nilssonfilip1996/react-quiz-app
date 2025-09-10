import { useEffect, useState } from "react";

export default function Answers({answers, onAnswer, correctAnswer, selectedAnswer}) {

    let selectedAnswerStyling;
    if(selectedAnswer===null){
        selectedAnswerStyling="";
    } else if(selectedAnswer===correctAnswer){
        selectedAnswerStyling="correct";
    } else{
        selectedAnswerStyling="wrong";
    }

    function handleAnswer(answer, e){
        e.currentTarget.blur();   // remove focus from this button
        onAnswer(answer);
    }

    return (
        <>
            <ul id="answers">
                {answers.map((answer, index) => (
                    <li key={index} className="answer">
                        <button disabled={selectedAnswer?true:false} className={answer===selectedAnswer?selectedAnswerStyling:""} onClick={(e) => handleAnswer(answer, e)}>
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
            <div id="skip-action">
                <button disabled={selectedAnswer?true:false} onClick={(e)=>handleAnswer(null, e)}>Skip</button>
            </div>
        </>
    )
}