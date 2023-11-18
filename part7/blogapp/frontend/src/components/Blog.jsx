import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import NewComment from './NewComment'

const Blog = ({ blog, loggedUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
        navigate('/')
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
          <NewComment blog={blog} />
        </div>
      </div>
    )
}

export default Blog
