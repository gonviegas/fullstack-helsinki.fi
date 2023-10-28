import {
  useNotificationValue,
  useNotificationDispatch
} from '../NotificationContext'
import { useEffect } from 'react'

const Notification = () => {
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [notification, dispatch])

  if (notification) {
    return <div style={style}>{notification}</div>
  }
  return null
}

export default Notification
