import React, { useState } from 'react';

export const ViewContext = React.createContext({
  isDashboard: false,
  setIsDashboard: () => null,
});

export const ViewContextProvider = ({ children }) => {
  const [isDashboard, setIsDashboard] = useState(true);
  return (
    <ViewContext.Provider value={{ isDashboard, setIsDashboard }}>
      {children}
    </ViewContext.Provider>
  );
};
