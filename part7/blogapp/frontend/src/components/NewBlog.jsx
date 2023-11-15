import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()
    dispatch(createBlog({ title, author, url })).then(() => {
      dispatch(
        setNotification(
          { msg: `A new blog '${title}' by '${author}' added` },
          3
        )
      )
    })
  }

  return (
    <div>
      <h4>Create a new blog</h4>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            id='title'
            placeholder='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id='author'
            placeholder='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            placeholder='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default NewBlog
