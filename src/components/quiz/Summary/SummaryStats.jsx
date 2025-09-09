export default function SummaryStats({ statistics }) {
  return (
    <div id="summary-stats">
      <p id="skipped">
        <span className="number">{statistics.skippedPercentage}%</span>
        <span className="text">Skipped</span>
      </p>
      <p id="correct">
        <span className="number">{statistics.correctPercentage}%</span>
        <span className="text">Answered Correct</span>
      </p>
      <p id="inCorrect">
        <span className="number">{statistics.inCorrectPercentage}%</span>
        <span className="text">Answered InCorrect</span>
      </p>
    </div>
  );
}
