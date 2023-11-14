import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear(state, action) {
      const notification = { message: '', type: '' }
      return notification
    }
  }
})

export const setUser = (notification, timeout) => {
  return async (dispatch) => {
    dispatch(set(notification))
    setTimeout(() => dispatch(reset()), timeout * 1000)
  }
}

export const { set, reset } = notificationSlice.actions
export default notificationSlice.reducer
