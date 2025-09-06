import { useState, useEffect } from "react";

export default function QuestionTimer({ timer, questionId }) {
  const [remainingTime, setRemainingTime] = useState(timer);
  const [initialTime, setInitialTime] = useState(timer);
  
  useEffect(() => {
    console.log("Initiasing questiontimer");
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        return (prevTime - 10);
      });
    }, 10);

    return () => {
      console.log("CLEARING INTERVAL");
      setRemainingTime(timer);
      clearInterval(interval);
    };
  }, [timer, questionId]);

  return <progress value={remainingTime} max={timer} />;
}

