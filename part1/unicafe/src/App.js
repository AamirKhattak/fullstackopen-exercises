import { useState } from "react";

const Button = ({ btnLabel, handleClick }) => (
  <button onClick={handleClick}>{btnLabel}</button>
);

const StatisticLine = ({text, count, symbol=''}) => {
  return (<tr><td>{text}</td><td>{count}{symbol}</td></tr>)
}

const Statistics = ({ good, neutral, bad }) => {
  let totalFeedback = good + neutral + bad;
  let avgScore = (good * 1 + bad * -1) / totalFeedback;
  let positiveScore = (100 / totalFeedback) * good;

  if (!totalFeedback) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <table>
            <tbody>
                <StatisticLine text='good' count={good}/>
                <StatisticLine text='neutral' count={neutral}/>
                <StatisticLine text='bad' count={bad}/>
                <StatisticLine text='all' count={totalFeedback} />
                <StatisticLine text='average' count={avgScore} />
                <StatisticLine text='positive' count={positiveScore} symbol={'%'} />
            </tbody>
        </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button btnLabel={"good"} handleClick={() => setGood(good + 1)} />
      <Button
        btnLabel={"neutral"}
        handleClick={() => setNeutral(neutral + 1)}
      />
      <Button btnLabel={"bad"} handleClick={() => setBad(bad + 1)} />

      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
