/* eslint-disable react/prop-types */
import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

	const increaseStat = (feedbackType) => {
		const increaseGood = () => {
			setGood(good + 1)
		}
		const increaseBad = () => {
			setBad(bad + 1)
		}
		const increaseNeutral = () => {
			setNeutral(neutral + 1)
		}

		if (feedbackType === 'bad') {
			return increaseBad
		}
		if (feedbackType === 'good') {
			return increaseGood
		}
		if (feedbackType === 'neutral') {
			return increaseNeutral
		}

	}

  return (
    <>
      <h2>Please leave your feedback</h2>
      <Button title='good' onClick={increaseStat('good')} />
      <Button title='neutral' onClick={increaseStat('neutral')} />
      <Button title='bad' onClick={increaseStat('bad')} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const Button = ({ title, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{title}</button>
    </>
  )
}

const StatisticLine = ({ text, stat }) => <tr><td>{text}</td><td>{stat}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  const allClicks = good + neutral + bad
  const average = (good + (neutral * 0) + (bad * -1)) / allClicks
  const positive = (good / allClicks)
  if (allClicks === 0) {
    return (
      <div>
        <h3>Statistics</h3>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <>
      <div>
        <h3>Statistics</h3>
        <table>
          <tbody>
            <StatisticLine text='Good' stat={good}/>
            <StatisticLine text='Neutral' stat={neutral}/>
            <StatisticLine text='Bad' stat={bad}/>
            <StatisticLine text='All' stat={allClicks}/>
            <StatisticLine text='Average' stat={average}/>
            <StatisticLine text='Positive' stat={positive + '%'}/>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
