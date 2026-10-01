import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Local storage se active user restoration
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // const loginUser = (userData, accessToken) => {
  //   setUser(userData);
  //   localStorage.setItem('user', JSON.stringify(userData));
  //   localStorage.setItem('accessToken', accessToken);
  // };
  const loginUser = (userData, accessToken) => {
  console.log("AUTH CONTEXT TOKEN:", accessToken);

  setUser(userData);

  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('accessToken', accessToken);

  console.log(
    "TOKEN AFTER SAVE:",
    localStorage.getItem('accessToken')
  );
};

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);