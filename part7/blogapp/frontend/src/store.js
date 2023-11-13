import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

export default configureStore({
  reducer: {
    notification: notificationReducer
  }
})
