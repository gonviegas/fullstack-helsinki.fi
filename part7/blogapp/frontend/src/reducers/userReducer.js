import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload
    },
  }
})

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(set(users))
  }
}

export const { set } = userSlice.actions
export default userSlice.reducer
