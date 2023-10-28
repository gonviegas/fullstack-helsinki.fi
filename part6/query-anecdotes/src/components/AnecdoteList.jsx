import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../../requests'
import { useNotificationDispatch } from '../NotificationContext'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useNotificationDispatch()
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  const anecdotes = result.data

  const queryClient = useQueryClient()
  const newVoteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = anecdote => {
    newVoteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'SET', payload: `Voted on anecdote: '${anecdote.content}'` })
  }

  if (result.isLoading) {
    return null
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
