import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import userReducer from './reducers/userReducer'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    users: userReducer, 
    loggedUser: loggedUserReducer
  }
})
