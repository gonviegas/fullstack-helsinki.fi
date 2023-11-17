import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import { createComment } from '../reducers/blogReducer'

const Blog = ({ blogs, loggedUser }) => {
  const [comment, setComment] = useState('')
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()
    dispatch(createComment({ id: id, comment: comment })).then(() => {
      dispatch(setNotification({ msg: `A new comment '${comment}' added` }, 3))
    })
  }

  const like = async blog => {
    dispatch(likeBlog(blog)).then(() => {
      dispatch(
        setNotification(
          { msg: `A like for the blog '${blog.title}' by '${blog.author}'` },
          3
        )
      )
    })
  }

  const remove = async blog => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      dispatch(deleteBlog(blog.id)).then(() => {
        dispatch(
          setNotification(
            { msg: `The blog' ${blog.title}' by '${blog.author} removed` },
            3
          )
        )
      })
    }
  }

  if (blog)
    return (
      <div className='blog'>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <div>
          <div>
            {' '}
            <a href={blog.url}> {blog.url}</a>{' '}
          </div>
          <div>
            {blog.likes} likes <button onClick={() => like(blog)}>like</button>
          </div>
          <div>added by {blog.user && blog.user.name}</div>
          {loggedUser && blog.user.username === loggedUser.username && (
            <button onClick={() => remove(blog)}>delete</button>
          )}
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
      </div>
    )
}

export default Blog
