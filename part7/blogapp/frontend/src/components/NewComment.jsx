import { useState } from 'react'
import { createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const NewComment = ({ id, blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()
    dispatch(createComment({ id: id, comment: comment })).then(() => {
      dispatch(setNotification({ msg: `A new comment '${comment}' added` }, 3))
      setComment('')
    })
  }
  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id='comment'
            placeholder='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type='submit'>add comment</button>
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
