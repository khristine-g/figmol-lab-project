import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setUser = (user) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  useEffect(() => {
    // Load user from localStorage on initial render
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ user: state.user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };


