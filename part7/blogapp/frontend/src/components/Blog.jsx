import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blogs, user }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const dispatch = useDispatch()

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
            likes {blog.likes} <button onClick={() => like(blog)}>like</button>
          </div>
          <div>{blog.user && blog.user.name}</div>
          {user && blog.user.username === user.username && (
            <button onClick={() => remove(blog)}>delete</button>
          )}
        </div>
      </div>
    )
}

export default Blog
