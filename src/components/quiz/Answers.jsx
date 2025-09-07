import { useEffect, useState } from "react";

export default function Answers({answers, onAnswer, answeredCorrect}) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        setSelectedAnswer(null);        //Reset the selected answer from the previous question.
    }, [answers]);

    let correctAnswerClass;
    if(answeredCorrect==="true"){
        correctAnswerClass="correct";
    } else if(answeredCorrect==="false"){
        correctAnswerClass="wrong";
    } else{
        correctAnswerClass="";
    }

    function handleAnswer(answer, e){
        e.currentTarget.blur();   // remove focus from this button
        setSelectedAnswer(answer);
        onAnswer(answer);
    }

    return (
        <>
            <ul id="answers">
                {answers.map((answer, index) => (
                    <li key={index} className="answer">
                        <button className={answer===selectedAnswer?correctAnswerClass:""} onClick={(e) => handleAnswer(answer, e)}>
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}