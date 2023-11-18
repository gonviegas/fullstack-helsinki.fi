import { useState } from 'react'
import { createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Button, Input } from '../styles'

const NewComment = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()
    dispatch(createComment({ id: blog.id, comment: comment })).then(() => {
      dispatch(setNotification({ msg: `A new comment '${comment}' added` }, 3))
      setComment('')
    })
  }
  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            id='comment'
            placeholder='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button type='submit'>add comment</Button>
        </div>
      </form>
      <div>
        <ul>
          {blog.comments.map((comment, idx) => (
            <li key={idx}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NewComment
