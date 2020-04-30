import React, { createContext, useContext, useState, useCallback } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer/index';

interface ToastContextData {
  addToast(message: Omit<MessageData, 'id'>): void;
  removeToast(id: string): void;
}

interface MessageData {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const addToast = useCallback(
    ({ type, title, description }: Omit<MessageData, 'id'>) => {
      const id = uuid();

      const message = {
        id,
        type,
        title,
        description,
      };

      setMessages((state) => [...state, message]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer messages={messages} />
      {children}
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('a ToastContext mus exists to use the hook');
  }

  return context;
}

export { ToastProvider, useToast };
