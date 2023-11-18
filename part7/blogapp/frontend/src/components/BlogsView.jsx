import { useRef } from 'react'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const BlogsView = ({ blogs }) => {
  const blogFormRef = useRef()

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid'
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel='create new' ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      {blogs
        .slice()
        .sort(byLikes)
        .map(blog => (
          <div style={style} className='blog' key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default BlogsView
