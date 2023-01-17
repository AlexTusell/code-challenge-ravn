import React, { useState } from 'react';

export const IDContext = React.createContext({
  idDelete: false,
  setIdDelete: () => null,
  idUpdate: false,
  setIdUpdate: () => null,
});

export const IDContextProvider = ({ children }) => {
  const [idDelete, setIdDelete] = useState();
  const [idUpdate, setIdUpdate] = useState();

  return (
    <IDContext.Provider
      value={{ idDelete, setIdDelete, idUpdate, setIdUpdate }}
    >
      {children}
    </IDContext.Provider>
  );
};
