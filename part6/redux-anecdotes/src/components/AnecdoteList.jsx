import { useDispatch, useSelector } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    )
  })

  const anecdotesVotesDescending = anecdotes.sort((a, b) => b.votes - a.votes)

  const handleClick = (anecdote) => {
    dispatch(updateVotes(anecdote))
    dispatch(setNotification(`Vote added: ${anecdote.content}`, 10))
  }

  return (
    <div>
      {anecdotesVotesDescending.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleClick(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
