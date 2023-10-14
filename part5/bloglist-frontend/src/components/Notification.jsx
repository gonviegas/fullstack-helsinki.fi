import { useEffect } from 'react'

const Notification = ({ setNotification, notification }) => {
  useEffect(() => {
    if (notification.type) {
      const timer = setTimeout(() => {
        setNotification({ type: '', msg: '' })
      }, 5000)
      return () => clearTimeout(timer)
    }
  })

  if (notification.type === 'error')
    return <div className="error">{notification.msg}</div>
  if (notification.type === 'success')
    return <div className="success">{notification.msg}</div>

  return null
}

export default Notification
