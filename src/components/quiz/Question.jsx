import { useEffect, useRef, useState } from "react";
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
  //const [answeredCorrect, setAnsweredCorrect] = useState(null);
  const [scrambledAnswers, setScrambledAnswers] = useState(shuffle(question.answers));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const selectedAnswerRef = useRef(null);

  useEffect(() => {
    selectedAnswerRef.current = selectedAnswer; //Using a ref for the selectedAnswer in order to pull the latest value when calling onLockInAnswer.
  }, [selectedAnswer]);

  useEffect(() => {
    console.log("Timer set");
    setScrambledAnswers(shuffle(question.answers))
    setQuestionTime(initialTimer);
    setSelectedAnswer(null);

    const timer = setTimeout(() => {
      console.log("Selected answer: " + selectedAnswerRef.current);
      onLockInAnswer(selectedAnswerRef.current);
      console.log("Answer locked in.");
    }, questionTime);

    return () => {
      console.log("Cleaning up timer.");
      clearTimeout(timer);
    };
  }, [question]);

  function verifyAnswer(answer) {
    console.log(answer === question.answers[0]);
    setSelectedAnswer(answer);
    //setAnsweredCorrect(answer === question.answers[0] ? "true" : "false");

  }


  return (
    <>
      <div id="question">
        <QuestionTimer timer={questionTime} questionId={question.id} isAnswered={selectedAnswer?true:false}/>
        <h2>{question.text}</h2>
        <Answers answers={scrambledAnswers} onAnswer={verifyAnswer} correctAnswer={question.answers[0]} questionId={question.id}/>
      </div>
    </>
  );
}
