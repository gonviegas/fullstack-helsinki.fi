import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    dispatch(setUser({ username, password }))
      .then(() => {
        dispatch(setNotification({ msg: 'welcome' }, 3))
      })
      .catch(() => {
        dispatch(
          setNotification(
            { msg: 'wrong username or password', type: 'error' },
            3
          )
        )
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )
}

export default Login
