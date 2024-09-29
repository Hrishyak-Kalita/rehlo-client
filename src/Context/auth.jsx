import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mainUser,setMainUser]= useState(null)

  useEffect(() => {
    // Check if user is already logged in (e.g., check for a token in local storage)
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const setUser=(email)=>{
    localStorage.setItem('authEmail', email);
    setMainUser(email)

  }

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authEmail');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, setUser,mainUser}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
}; 