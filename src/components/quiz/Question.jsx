import { useEffect, useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";



export default function Question({ question, onLockInAnswer, initialTimer }) {
  const [questionTime, setQuestionTime] = useState(initialTimer);
  const [answeredCorrect, setAnsweredCorrect] = useState(null);

  useEffect(() => {
    console.log("Timer set");
    const timer = setTimeout(() => {
      onLockInAnswer(null);
    }, questionTime);
    return () => {
      console.log("Cleaning up timer.");
      clearTimeout(timer);
    };
  }, [question, questionTime]);

  function verifyAnswer(answer) {
    setAnsweredCorrect(answer === question.answers[0] ? "true" : "false");

  }


  return (
    <>
      <div id="question">
        <QuestionTimer timer={questionTime} questionId={question.id}/>
        <h2>{question.text}</h2>
        <Answers answers={question.answers} onAnswer={verifyAnswer} correctAnswerColorCLass={answeredCorrect}/>
      </div>
    </>
  );
}
