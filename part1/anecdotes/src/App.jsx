import { useState } from 'react'

const Anecdote = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{anecdote}</div>
      <div>{votes}</div>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const AnecdoteMostVoted = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{anecdote}</div>
      <div>{votes}</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(8))

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const handleNextAnedocte = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const anecdoteMostVotedIndex = () => {
    const index = votes.indexOf(Math.max(...votes))
    return index
  }

  return (
    <div>
      <Anecdote
        title={'Anecdote of the day'}
        anecdote={anecdotes[selected]}
        votes={'has ' + votes[selected] + ' votes'}
      />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNextAnedocte} text="next anecdote" />
      <AnecdoteMostVoted
        title={'Anecdote with most votes'}
        anecdote={anecdotes[anecdoteMostVotedIndex()]}
        votes={'has ' + votes[anecdoteMostVotedIndex()] + ' votes'}
      />
    </div>
  )
}

export default App
