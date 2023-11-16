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

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  if (!user) {
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
        <NavMenu user={user} />
        <Notification />
        <Routes>
          <Route path='/' element={<BlogsView user={user} blogs={blogs} />} />
          <Route path='/users' element={<UsersView blogs={blogs} />} />
          <Route
            path='/blogs/:id'
            element={<Blog blogs={blogs} user={user} />}
          />
          <Route path='/users/:id' element={<UserBlogs blogs={blogs} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
