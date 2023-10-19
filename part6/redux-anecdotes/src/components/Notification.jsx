import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => {
    return state.notification
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    return () => clearTimeout(timer)
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification) return <div style={style}>{notification}</div>
  return null
}

export default Notification
