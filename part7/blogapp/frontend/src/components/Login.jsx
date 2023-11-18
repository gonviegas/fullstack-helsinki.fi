import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedUser } from '../reducers/loggedUserReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Input } from '../styles'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    dispatch(setLoggedUser({ username, password }))
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
      <h2>login</h2>
      <div>
        username
        <Input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <Input
          id='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button id='login-button' type='submit'>
        login
      </Button>
    </form>
  )
}

export default Login
