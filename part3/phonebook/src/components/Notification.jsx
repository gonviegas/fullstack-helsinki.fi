import { useEffect } from 'react'

export const Notification = ({
  successMessage,
  errorMessage,
  setSuccessMessage,
  setErrorMessage
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    }, 5000)
    return () => clearTimeout(timer)
  })

  if (!successMessage && !errorMessage) {
    return null
  } else if (successMessage) {
    return <div className="success">{successMessage}</div>
  } else if (errorMessage) {
    return <div className="error">{errorMessage}</div>
  }
}
