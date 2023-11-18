import { createSlice } from '@reduxjs/toolkit'
import storageService from '../services/storage'
import loginService from '../services/login'

const loggedUserSlice = createSlice({
  name: 'loggedUser',
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

export const setLoggedUser = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    storageService.saveUser(user)
    dispatch(set(user))
  }
}

export const removeLoggedUser = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(remove())
  }
}

export const { set, remove } = loggedUserSlice.actions
export default loggedUserSlice.reducer
