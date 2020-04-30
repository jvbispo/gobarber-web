import React, { useEffect } from 'react';

import {
  FiAlertCircle,
  FiXCircle,
  FiInfo,
  FiCheckCircle,
} from 'react-icons/fi';
import { Container } from './styles';
import { useToast } from '../../../hooks/toastContext';

interface ToastProps {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

interface Message {
  message: ToastProps;
  style: object;
}

const icons = {
  info: <FiInfo size={20} />,
  success: <FiCheckCircle size={20} />,
  error: <FiAlertCircle size={20} />,
};

const Toast: React.FC<Message> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);
  return (
    <Container
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle />
      </button>
    </Container>
  );
};

export default Toast;
