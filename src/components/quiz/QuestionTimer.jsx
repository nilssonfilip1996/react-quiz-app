import { useState, useEffect } from "react";

export default function QuestionTimer({ timer, questionId, isAnswered}) {
  const [remainingTime, setRemainingTime] = useState(timer);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        return (prevTime - 10);
      });
    }, 10);

    return () => {
      setRemainingTime(timer);
      clearInterval(interval);
    };
  }, [timer, questionId]);

  return <progress className={isAnswered?"answered":""} value={remainingTime} max={timer} />;
}

