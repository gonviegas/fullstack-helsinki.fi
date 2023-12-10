import { useEffect } from 'react';
import { Notification, NotificationType } from '../types';

interface NotificationProps {
  setNotification: React.Dispatch<React.SetStateAction<Notification>>;
  notification: Notification;
}

const Notifier = (props: NotificationProps) => {
  const { setNotification, notification } = props;

  const styleError = {
    color: 'red',
    fontSize: 20,
    marginBottom: 10
  };

  const styleSuccess = {
    color: 'green',
    fontSize: 20,
    padding: '10, 10, 10, 0',
    marginBottom: 10
  };

  useEffect(() => {
    if (notification.type) {
      const timer = setTimeout(() => {
        setNotification({ type: NotificationType.Success, msg: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  });

  if (notification.type === 'error')
    return <div style={styleError}>{notification.msg}</div>;
  if (notification.type === 'success')
    return <div style={styleSuccess}>{notification.msg}</div>;

  return null;
};

export default Notifier;
