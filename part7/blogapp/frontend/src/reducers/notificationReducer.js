import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: '' },
  reducers: {
    set(state, action) {
      return action.payload
    },
    reset(state, action) {
      const notification = { message: '', type: '' }
      return notification
    }
  }
})

export const setNotification = (notification, timeout) => {
  return async (dispatch) => {
    dispatch(set(notification))
    setTimeout(() => dispatch(reset()), timeout * 1000)
  }
}

export const { set, reset } = notificationSlice.actions
export default notificationSlice.reducer
