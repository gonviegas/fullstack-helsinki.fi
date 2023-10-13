import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const handleAddBlog = async event => {
    event.preventDefault()
    try {
      const blog = await blogService.create({newBlog})
      setBlogs(blogs.concat(blog))
      setNewBlog({ title: '', author: '', url: '' })
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleAddBlog}>
          <div>
            title:
            <input
              value={newBlog.title}
              onChange={({ target }) => {
                const newBlogCopy = { ...newBlog }
                newBlogCopy.title = target.value
                setNewBlog(newBlogCopy)
              }}
            />
          </div>
          <div>
            author:
            <input
              value={newBlog.author}
              onChange={({ target }) => {
                const newBlogCopy = { ...newBlog }
                newBlogCopy.author = target.value
                setNewBlog(newBlogCopy)
              }}
            />
          </div>
          <div>
            url:
            <input
              value={newBlog.url}
              onChange={({ target }) => {
                const newBlogCopy = { ...newBlog }
                newBlogCopy.url = target.value
                setNewBlog(newBlogCopy)
              }}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }

  if (user === null) {
    return <div>{loginForm()}</div>
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      {blogForm()}
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
