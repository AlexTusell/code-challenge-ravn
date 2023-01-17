import { useToasts } from '../hooks/useToasts';
import React from 'react';

export const toastErrorContext = React.createContext({
  handleError: () => null,
});

export const ToastErrorContextProvider = ({ children }) => {
  const toast = useToasts();

  const handleError = (message) => {
    toast({ description: message });
  };
  return (
    <toastErrorContext.Provider value={{ handleError }}>
      {children}
    </toastErrorContext.Provider>
  );
};
