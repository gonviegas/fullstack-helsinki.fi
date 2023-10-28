import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    set(state, action) {
      return action.payload
    },
    remove(state, action) {
      return ''
    }
  }
})

export const setNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch(set(notification))
    setTimeout(() => dispatch(remove()), timeout * 1000)
  }
}

export const { set, remove } = notificationSlice.actions
export default notificationSlice.reducer
