import { useState, useEffect } from "react";

export default function QuestionTimer({ timer, color }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    console.log("Initiasing questiontimer");
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 10) {
          console.log("Dismounting questiontimer");
          clearInterval(interval); // stop interval
          return 0; // ensure it doesn't go negative
        };
        return (prevTime - 10);
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [color, timer]);

  return <progress value={remainingTime} max={timer} />;
}

