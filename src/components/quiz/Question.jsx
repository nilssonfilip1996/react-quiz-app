import { useEffect } from "react";
import Answers from "./Answers";

const TIMER = 3000;

export default function Question({ question, onAnswer }) {
  useEffect(() => {
    console.log("Timer set");
    const timer = setTimeout(() => {
      onAnswer(null);
    }, TIMER);
    return () => {
      console.log("Cleaning up timer.");
      clearTimeout(timer);
    };
  }, [question]);

  return (
    <>
      <div id="question">
        <h2>{question.text}</h2>
        <Answers answers={question.answers} onAnswer={onAnswer} />
      </div>
    </>
  );
}
