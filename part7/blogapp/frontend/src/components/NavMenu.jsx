import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeLoggedUser } from '../reducers/loggedUserReducer'
import { setNotification } from '../reducers/notificationReducer'

const NavMenu = ({ loggedUser }) => {
  const dispatch = useDispatch()
  const padding = {
    paddingRight: 5
  }

  const logout = async () => {
    dispatch(removeLoggedUser()).then(() => {
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
      {loggedUser.name} logged in
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default NavMenu
