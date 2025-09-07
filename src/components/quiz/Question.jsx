import { useEffect, useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";


function shuffle(array) {
  let shuffled = array.slice(); // copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // pick random index [0, i]
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
  }
  return shuffled;
}


export default function Question({ question, onLockInAnswer, initialTimer }) {
  const [questionTime, setQuestionTime] = useState(()=> {
    console.log("State reset.");
    return initialTimer;
  });
  const [answeredCorrect, setAnsweredCorrect] = useState(null);
  const [scrambledAnswers, setScrambledAnswers] = useState(shuffle(question.answers))

  useEffect(() => {
    console.log("Timer set");
    setScrambledAnswers(shuffle(question.answers))
    const timer = setTimeout(() => {
      onLockInAnswer(null);
    }, questionTime);
    return () => {
      console.log("Cleaning up timer.");
      setAnsweredCorrect("");
      setQuestionTime(initialTimer);
      clearTimeout(timer);
    };
  }, [question, questionTime]);

  function verifyAnswer(answer) {
    console.log(answer === question.answers[0]);
    
    setAnsweredCorrect(answer === question.answers[0] ? "true" : "false");

  }


  return (
    <>
      <div id="question">
        <QuestionTimer timer={questionTime} questionId={question.id}/>
        <h2>{question.text}</h2>
        <Answers answers={scrambledAnswers} onAnswer={verifyAnswer} answeredCorrect={answeredCorrect} questionId={question.id}/>
      </div>
    </>
  );
}
