import SummaryStats from "./SummaryStats";

function getStatistics(userAnswers, correctAnswers) {
    console.log("CorrectAnswers:");
    console.log(correctAnswers);
    console.log("UserAnswers:");
    console.log(userAnswers);
    
    
    let skipped = 0;
    let correct = 0;
    let incorrect = 0;

    for (let i = 0; i < userAnswers.length; i++) {
        if(userAnswers[i] === null) {
            console.log("Skipped");
            skipped++;
        } else if(userAnswers[i]===correctAnswers[i]){
            console.log("Correct");
            correct++;
        } else {
            console.log("Incorrect");
            incorrect++;
        }
    }

    let stats = {
        skippedPercentage: Math.floor(100*(skipped/correctAnswers.length)),
        correctPercentage: Math.floor(100*(correct/correctAnswers.length)),
        inCorrectPercentage: Math.floor(100*(incorrect/correctAnswers.length))
    };

    return stats;
}

export default function Summary({userAnswers, correctAnswers}) {

    console.log(getStatistics(userAnswers, correctAnswers));
    //getStatistics(userAnswers, correctAnswers)
    return (
        <div id="summary">
            <img src="/quiz-complete.png" alt="" />
            <h2>QUIZ COMPLETED</h2>
            <SummaryStats />
        </div>
    )
}