import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Notification from './components/Notification'
import Login from './components/Login'
import BlogsView from './components/BlogsView'
import UsersView from './components/UsersView'
import NavMenu from './components/NavMenu'
import Blog from './components/Blog'
import UserBlogs from './components/UserBlogs.jsx'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  if (!loggedUser) {
    return (
      <div>
        <h2>login</h2>
        <Notification />
        <Login />
      </div>
    )
  }

  return (
    <div>
      <Router>
        <NavMenu loggedUser={loggedUser} />
        <Notification />
        <Routes>
          <Route path='/' element={<BlogsView blogs={blogs} />} />
          <Route
            path='/blogs/:id'
            element={<Blog blogs={blogs} loggedUser={loggedUser} />}
          />
          <Route path='/users' element={<UsersView users={users} />} />
          <Route path='/users/:id' element={<UserBlogs users={users} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
