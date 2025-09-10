import SummaryStats from "./SummaryStats";

function getStatistics(userAnswers, correctAnswers) {
  const total = correctAnswers.length;
  let skipped = 0,
    correct = 0,
    incorrect = 0;

  userAnswers.forEach((answer, i) => {
    if (answer === null) {
      console.log("Skipped");
      skipped++;
    } else if (answer === correctAnswers[i]) {
      console.log("Correct");
      correct++;
    } else {
      console.log("Incorrect");
      incorrect++;
    }
  });

  const toPercentage = (count) => Math.floor((count / total) * 100);

  return {
    skippedPercentage: toPercentage(skipped),
    correctPercentage: toPercentage(correct),
    inCorrectPercentage: toPercentage(incorrect),
  };
}

export default function Summary({
  questionsArray,
  userAnswersArray,
  correctAnswersArray,
  onStartOver
}) {
  function getCorrectedAnswersList() {
    let answerList = [];
    {
      for (let i = 0; i < userAnswersArray.length; i++) {
        let colorClass = "";
        if (userAnswersArray[i] === null) {
          colorClass = "skipped";
        } else if (userAnswersArray[i] === correctAnswersArray[i]) {
          colorClass = "correct";
        } else {
          colorClass = "wrong";
        }
        answerList.push(
          <li key={i}>
            <h3>{i + 1}</h3>
            <p className="question">{questionsArray[i]}</p>
            <p className={"user-answer " + colorClass}>
              {userAnswersArray[i] || "Skipped"}
            </p>
          </li>
        );
      }
    }
    return answerList;
  }
  return (
    <div id="summary">
      <img src="/quiz-complete.png" alt="" />
      <h2>QUIZ COMPLETED</h2>
      <SummaryStats
        statistics={getStatistics(userAnswersArray, correctAnswersArray)}
      />
      <ol>{getCorrectedAnswersList()}</ol>
      <div id="start-over">
        <button onClick={()=>onStartOver()}>Try again</button>
      </div>
    </div>
  );
}
