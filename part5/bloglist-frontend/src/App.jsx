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
  const blogsLikesDescending = [...blogs].sort((a, b) => b.likes - a.likes)

  const handleLogin = async event => {
    event.preventDefault()

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
      console.log(exception)
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
      const response = await blogService.create(blogObject)
      addBlogRef.current.toggleVisibility()
      const userId = response.user
      const blog = response
      blog.user = { name: user.name, username: user.username, id: userId }
      setBlogs(blogs.concat(blog))
      setNotification({
        type: 'success',
        msg: `new Blog created: ${blog.title} by ${blog.author}`
      })
    } catch (exception) {
      console.log(exception)
      setNotification({ type: 'error', msg: 'Failed to create blog' })
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const blog = await blogService.update(id, blogObject)
      const currentBlogIndex = blogs.findIndex(blog => blog.id === id)
      const updatedBlog = { ...blogs[currentBlogIndex], likes: blog.likes }
      const newBlogs = [
        ...blogs.slice(0, currentBlogIndex),
        updatedBlog,
        ...blogs.slice(currentBlogIndex + 1)
      ]
      setBlogs(newBlogs)
      setNotification({
        type: 'success',
        msg: `Blog updated: ${blog.title} by ${blog.author}`
      })
    } catch (exception) {
      console.log(exception)
      setNotification({ type: 'error', msg: 'Failed to update blog' })
    }
  }

  const deleteBlog = async id => {
    try {
      await blogService.remove(id)
      const newBlogs = blogs.filter(b => b.id !== id)
      setBlogs(newBlogs)
      setNotification({
        type: 'success',
        msg: `Blog deleted`
      })
    } catch (exception) {
      console.log(exception)
      setNotification({ type: 'error', msg: 'Failed to update blog' })
    }
  }

  return (
    <div>
      {!user ? <h2>Log in to application</h2> : <h2>blogs</h2>}
      <Notification
        setNotification={setNotification}
        notification={notification}
      />
      {!user ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <div>
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <br />
          <Togglable buttonLabel="create new blog" ref={addBlogRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogsLikesDescending.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
