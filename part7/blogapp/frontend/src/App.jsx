import { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'

import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { removeUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const logout = async () => {
    dispatch(removeUser())
    dispatch(setNotification({ msg: 'logged out' }, 3))
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <Login />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <BlogList user={user} />
    </div>
  )
}

export default App
