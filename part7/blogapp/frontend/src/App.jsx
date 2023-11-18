import { useEffect } from 'react'
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'

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
  const matchedBlog = useMatch('/blogs/:id')
  const matchedUser = useMatch('/users/:id')
  const blog = matchedBlog
    ? blogs.find(b => b.id === matchedBlog.params.id)
    : null
  const user = matchedUser
    ? users.find(u => u.id === matchedUser.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  if (!loggedUser) {
    return (
      <div>
        <Notification />
        <Navigate replace to='/login' />
        <Login />
      </div>
    )
  }

  return (
    <div>
      <NavMenu loggedUser={loggedUser} />
      <Notification />
      <Routes>
        <Route path='*' element={<Navigate replace to='/' />} />
        <Route path='/' element={<BlogsView blogs={blogs} />} />
        <Route
          path='/blogs/:id'
          element={<Blog blog={blog} loggedUser={loggedUser} />}
        />
        <Route path='/users' element={<UsersView users={users} />} />
        <Route path='/users/:id' element={<UserBlogs user={user} />} />
      </Routes>
    </div>
  )
}

export default App
