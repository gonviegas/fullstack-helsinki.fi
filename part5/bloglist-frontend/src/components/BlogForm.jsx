import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = async event => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            value={newBlog.title}
            onChange={({ target }) => {
              const newBlogCopy = { ...newBlog }
              newBlogCopy.title = target.value
              setNewBlog(newBlogCopy)
            }}
            placeholder="write title here"
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={newBlog.author}
            onChange={({ target }) => {
              const newBlogCopy = { ...newBlog }
              newBlogCopy.author = target.value
              setNewBlog(newBlogCopy)
            }}
            placeholder="write author here"
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={newBlog.url}
            onChange={({ target }) => {
              const newBlogCopy = { ...newBlog }
              newBlogCopy.url = target.value
              setNewBlog(newBlogCopy)
            }}
            placeholder="write url here"
          />
        </div>
        <button id="create-blog-button" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
