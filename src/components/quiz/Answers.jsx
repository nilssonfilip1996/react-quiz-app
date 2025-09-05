import { useEffect } from "react";

export default function Answers({answers, onAnswer, answeredCorrect}) {
    

    let chosenButtonClass;

    if(answeredCorrect){
        chosenButtonClass = "correct";
    } else if(!answeredCorrect){
        chosenButtonClass = "wrong";
    }
    console.log(chosenButtonClass);

    useEffect(() => {
        chosenButtonClass = "";
        console.log("reseting button class");
        

        return () => chosenButtonClass = "";
    }, [answers, onAnswer, answeredCorrect])
    

    return (
        <>
            <ul id="answers">
                {answers.map((answer, index) => (
                    <li key={index} className="answer">
                        <button className={index===0?chosenButtonClass:""} onClick={() => onAnswer(answer)}>
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}