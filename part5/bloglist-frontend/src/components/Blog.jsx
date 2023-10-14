import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const increaseLikes = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    updateBlog(blog.id, updatedBlog)
  }

  const removeBlog = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    confirm && deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={() => setDetailsVisible(true)}>
          view
        </button>
        <button
          style={showWhenVisible}
          onClick={() => setDetailsVisible(false)}
        >
          hide
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={increaseLikes}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          {blog.user.username === user.username && <button onClick={removeBlog}>remove</button>}
        </div>
      </div>
    </div>
  )
}
export default Blog
