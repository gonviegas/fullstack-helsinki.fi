import { createSlice } from '@reduxjs/toolkit'
import storageService from '../services/storage'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: storageService.loadUser(),
  reducers: {
    set(state, action) {
      return action.payload
    },
    remove(state, action) {
      return null
    }
  }
})

export const setUser = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    storageService.saveUser(user)
    dispatch(set(user))
  }
}

export const removeUser = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(remove())
  }
}

export const { set, remove } = userSlice.actions
export default userSlice.reducer
