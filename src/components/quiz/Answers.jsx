import { useEffect, useState } from "react";

export default function Answers({answers, onAnswer, correctAnswer}) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        setSelectedAnswer(null);        //Reset the selected answer from the previous question.
    }, [answers]);

    let correctAnswerClass;
    if(selectedAnswer===null){
        correctAnswerClass="";
    } else if(selectedAnswer===correctAnswer){
        correctAnswerClass="correct";
    } else{
        correctAnswerClass="wrong";
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
                        <button disabled={selectedAnswer?true:false} className={answer===selectedAnswer?correctAnswerClass:""} onClick={(e) => handleAnswer(answer, e)}>
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}