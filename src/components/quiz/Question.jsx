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
  }, [question])


  function timerExpired(){
    onLockInAnswer(selectedAnswerRef.current);
  }

  function handleAnswer(answer) {
    if(answer===null) {   //User skipped the question. Immediately proceed to next question.
      onLockInAnswer(null);
    }
    setSelectedAnswer(answer);
  }

  return (
    <>
      <div id="question">
        <QuestionTimer
          initialTime={initialTimer}
          questionId={question.id}
          isAnswered={selectedAnswer ? true : false}
          onTimerExpired={timerExpired}
        />
        <h2>{question.text}</h2>
        <Answers
          answers={scrambledAnswers}
          onAnswer={handleAnswer}
          correctAnswer={question.answers[0]}
          selectedAnswer={selectedAnswer}
        />
      </div>
    </>
  );
}
