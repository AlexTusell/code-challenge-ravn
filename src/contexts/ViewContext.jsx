import React, { useState } from 'react';

export const ViewContext = React.createContext({
  isDashboard: false,
  setIsDashboard: () => null,
});

export const ViewContextProvider = ({ children }) => {
  const exist = localStorage.getItem('dashboard-view');
  const [isDashboard, setIsDashboardHook] = useState(
    exist ? localStorage.getItem('dashboard-view') === 'true' : true
  );

  const setIsDashboard = (value) => {
    localStorage.setItem('dashboard-view', value);
    setIsDashboardHook(value);
  };
  return (
    <ViewContext.Provider value={{ isDashboard, setIsDashboard }}>
      {children}
    </ViewContext.Provider>
  );
};
