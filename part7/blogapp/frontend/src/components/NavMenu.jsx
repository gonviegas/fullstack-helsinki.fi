import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeLoggedUser } from '../reducers/loggedUserReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Navigation, Button } from '../styles.js'

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
    <Navigation>
      <Link style={padding} to='/'>
        blogs
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      {loggedUser.name} logged in
      <Button onClick={logout}>logout</Button>
    </Navigation>
  )
}

export default NavMenu
