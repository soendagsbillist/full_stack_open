/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'

const App = () => {
	const anecdotes = [
		'if it hurts, do it more often',
		'adding manpower to a late software project makes it later!',
		'the first 90 percent of the code accounts for the first 10 percent of the development time...the remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'any fool can write code that a computer can understand. good programmers write code that humans can understand.',
    'premature optimization is the root of all evil.',
    'debugging is twice as hard as writing the code in the first place. therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
	]
  
  const [selected, setSelected] = useState(0)
	const [voted, setVoted] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})

	const generateRandom = (array) => Math.floor(Math.random() * array.length)
	const nextAnecdote = (array) => {
		const chooseAnecdote = () => {
			const num = generateRandom(array)
			setSelected(num) 
		} 
		return chooseAnecdote
	}
  
  const voteForAnecdote = (anecdote) => {
    const vote = () => {
      const newVote = {
        ...voted,
      }
      newVote[anecdote] += 1
      setVoted(newVote)
      console.log(voted)
    }
    return vote
  }

	const mostVotedAnecdote = () => {
		let mostVoted = 0
		let mostVotedKey = 0
		for (const [key, value] of Object.entries(voted)) {
			console.log(`${key}: ${value}`);
			if (value > mostVoted) {
				mostVoted = value
				mostVotedKey = key
			}
		}
		return parseInt(mostVotedKey)
	}

  return (
    <>
      <Anecdote anecdote={anecdotes[selected]} />
			<Button onClick={nextAnecdote(anecdotes)} text='next anecdote' />
			<Button onClick={voteForAnecdote(selected)} text='vote'/>
      <h3>Anecdote with most votes</h3>
      <Anecdote anecdote={anecdotes[mostVotedAnecdote()]}/>
    </>
  )
}

const Anecdote = ({ anecdote }) => <div>{anecdote}</div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

export default App
