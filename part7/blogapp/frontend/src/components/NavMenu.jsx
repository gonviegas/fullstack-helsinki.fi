import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const NavMenu = ({ user }) => {
  const dispatch = useDispatch()
  const padding = {
    paddingRight: 5
  }

  const logout = async () => {
    dispatch(removeUser()).then(() => {
      dispatch(setNotification({ msg: 'logged out' }, 3))
    })
  }

  return (
    <div>
      <Link style={padding} to='/'>
        blogs
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      {user.name} logged in
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default NavMenu
