import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { // Accept children
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children} {/* Return the children components */}
      <Outlet /> {/* Use if necessary; otherwise, remove */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
