import { useEffect, useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

const TIMER = 3000;

export default function Question({ question, onLockInAnswer }) {
  const [answeredCorrect, setAnsweredCorrect] = useState(null);

  useEffect(() => {
    console.log("Timer set");
    const timer = setTimeout(() => {
      onLockInAnswer(null);
    }, TIMER);
    return () => {
      console.log("Cleaning up timer.");
      clearTimeout(timer);
    };
  }, [question]);

  function verifyAnswer(answer) {
    setAnsweredCorrect(answer === question.answers[0] ? true : false);
    //answer === question.answers[0] ? setAnsweredCorrect(true) : setAnsweredCorrect(false);
  }


  return (
    <>
      <div id="question">
        <QuestionTimer timer={TIMER} />
        <h2>{question.text}</h2>
        <Answers answers={question.answers} onAnswer={verifyAnswer} answeredCorrect={answeredCorrect}/>
      </div>
    </>
  );
}
