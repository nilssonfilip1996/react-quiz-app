import { useState, useEffect } from "react";

export default function QuestionTimer({
  initialTime,
  questionId,
  isAnswered,
  onTimerExpired,
}) {
  const [remainingTime, setRemainingTime] = useState(initialTime);

    useEffect(() => {

    const timer = setTimeout(() => {  //Start timer.
      onTimerExpired();
    }, initialTime);

    return () => {
      clearTimeout(timer); //Clear timer.
    };
  }, [questionId]);

  useEffect(() => {
    setRemainingTime(initialTime);
    const interval = setInterval(() => {  //Start interval.
      setRemainingTime((prevTime) => {
        return prevTime - 10;
      });
    }, 10);

    return () => {
      clearInterval(interval);            //Clear interval.
    };
  }, [questionId]);


  // The following useEffect is a combination of the two above. However, even though it seems to work it throws an error.
/*   useEffect(() => {
    setRemainingTime(initialTime);

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 10) {
          clearInterval(interval);
          onTimerExpired();
          return 0;
        }
        return prevTime - 10;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [questionId]); */

  return (
    <progress
      className={isAnswered ? "answered" : ""}
      value={remainingTime}
      max={initialTime}
    />
  );
}
