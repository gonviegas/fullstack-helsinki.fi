import { useEffect } from 'react'

const Notification = ({ setNotification, notification }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({ type: '', msg: '' })
    }, 5000)
    return () => clearTimeout(timer)
  })

  if (notification.type === 'error')
    return <div className="error">{notification.msg}</div>
  if (notification.type === 'success')
    return <div className="success">{notification.msg}</div>
}

export default Notification
