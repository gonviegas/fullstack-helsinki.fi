import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogList = ({ user }) => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const notifyWith = (message, type) => {
    dispatch(setNotification({ message, type }, 3))
  }

  const like = async blog => {
    dispatch(likeBlog(blog)).then(() => {
      notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
    })
  }

  const remove = async blog => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      dispatch(deleteBlog(blog.id)).then(() => {
        notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
      })
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      {blogs
        .slice()
        .sort(byLikes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
    </div>
  )
}

export default BlogList
