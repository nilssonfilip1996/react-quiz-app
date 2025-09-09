import { useEffect, useRef, useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

/**
 *
 * @param {array} array, The array that should be shuffled.
 * @returns a copy of the array that is shuffled.
 */
function shuffle(array) {
  let shuffled = array.slice(); // copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // pick random index [0, i]
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
  }
  return shuffled;
}

export default function Question({ question, onLockInAnswer, initialTimer }) {
  const [scrambledAnswers, setScrambledAnswers] = useState(
    shuffle(question.answers)
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const selectedAnswerRef = useRef(null);

  useEffect(() => {
    selectedAnswerRef.current = selectedAnswer; //Using a ref for the selectedAnswer in order to pull the latest value when calling onLockInAnswer.
  }, [selectedAnswer]);

  useEffect(() => {
    setScrambledAnswers(shuffle(question.answers));
    setSelectedAnswer(null);

    const timer = setTimeout(() => {              //Start timer.
      onLockInAnswer(selectedAnswerRef.current);
    }, initialTimer);

    return () => {
      clearTimeout(timer);    //Clear timer.
    };
  }, [question]);

  function verifyAnswer(answer) {
    setSelectedAnswer(answer);
  }

  return (
    <>
      <div id="question">
        <QuestionTimer
          timer={initialTimer}
          questionId={question.id}
          isAnswered={selectedAnswer ? true : false}
        />
        <h2>{question.text}</h2>
        <Answers
          answers={scrambledAnswers}
          onAnswer={verifyAnswer}
          correctAnswer={question.answers[0]}
          selectedAnswer={selectedAnswer}
        />
      </div>
    </>
  );
}
