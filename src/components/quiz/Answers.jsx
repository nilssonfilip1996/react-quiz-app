import { useEffect } from "react";

export default function Answers({answers, onAnswer, answeredCorrect}) {

    let correctAnswerClass;
    if(answeredCorrect==="true"){
        correctAnswerClass="correct";
    } else if(answeredCorrect==="false"){
        correctAnswerClass="false";
    } else{
        correctAnswerClass="";
    }

    return (
        <>
            <ul id="answers">
                {answers.map((answer, index) => (
                    <li key={index} className="answer">
                        <button className={index===0?correctAnswerClass:""} onClick={() => onAnswer(answer)}>
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}