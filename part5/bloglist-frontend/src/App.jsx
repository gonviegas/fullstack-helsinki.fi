import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ type: '', msg: '' })

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

  const addBlogRef = useRef()

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
      setNotification({ type: 'success', msg: 'User logged in' })
    } catch (exception) {
      setNotification({ type: 'error', msg: 'Wrong username or password' })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setNotification({ type: '', msg: '' })
  }

  const addBlog = async blogObject => {
    try {
      const blog = await blogService.create(blogObject)
      addBlogRef.current.toggleVisibility()
      setBlogs(blogs.concat(blog))
      setNotification({
        type: 'success',
        msg: `new Blog created: ${blog.title} by ${blog.author}`
      })
    } catch (exception) {
      setNotification({ type: 'error', msg: 'Failed to create blog' })
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          setNotification={setNotification}
          notification={notification}
        />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={addBlogRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  if (user === null) {
    return <div>{loginForm()}</div>
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        setNotification={setNotification}
        notification={notification}
      />
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
