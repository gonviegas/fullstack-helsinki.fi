import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => {
    return state.blogs
  })

  const notifyWith = (message, type) => {
    dispatch(setNotification({ message, type }, 3))
  }

  const like = async (blog) => {
    // const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    // const updatedBlog = await blogService.update(blogToUpdate)
    // notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
    // setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
  }

  const remove = async (blog) => {
    // const ok = window.confirm(
    //   `Sure you want to remove '${blog.title}' by ${blog.author}`
    // )
    // if (ok) {
    //   await blogService.remove(blog.id)
    //   notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
    //   setBlogs(blogs.filter((b) => b.id !== blog.id))
    // }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      {/*       {blogs.sort(byLikes).map((blog) => ( */}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          like={() => like(blog)}
          // canRemove={user && blog.user.username === user.username}
          remove={() => remove(blog)}
        />
      ))}
    </div>
  )
}

export default BlogList
