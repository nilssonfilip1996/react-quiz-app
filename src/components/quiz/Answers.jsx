export default function Answers({answers, onAnswer}) {
    

    return (
        <>
            <ul id="answers">
                {answers.map((answer, index) => (
                    <li key={index} className="answer">
                        <button onClick={() => onAnswer(index)}>
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}