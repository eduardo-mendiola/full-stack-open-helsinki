import { use, useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
);

const StatisticLine = (props) => {
  return (
    <tr>
      <td> {props.text} </td>
      <td> {props.value} </td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, all }) => {

  const average = ((good - bad) / all).toFixed(2)
  const positive = ((good / all) * 100).toFixed(2) 

  if (all > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={all} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positive + " %"} />
        </tbody>
      </table>
    );
  } else {
    return <h3>No Feedback given</h3>
  }
};

const Display = props => <div>{props.value}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [counter, setCounter] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setCounter(counter + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setCounter(counter + 1);
  }

  const handleBad = () => {
    setBad(bad + 1)
    setCounter(counter + 1)
  }


  return (
    <>
      <header>
        <h1>Give Feedback</h1>
      </header>
      <main>
        <Button onClick={handleGood} text="Good" />
        <Button onClick={handleNeutral} text="Nautral" />
        <Button onClick={handleBad} text="Bad" />

        <h2>Statistics</h2>

        <Statistics good={good} neutral={neutral} bad={bad} all={counter} />

      </main>
    </>
  )
}

export default App