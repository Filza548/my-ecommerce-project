// context/AuthContext.js
'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem('auth_user');
    const storedToken = localStorage.getItem('auth_token');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      }
    }
    setLoading(false);
  }, []);

  const signup = async (email, password, userData) => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.find(u => u.email === email);
      
      if (userExists) {
        throw new Error('User already exists with this email');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        ...userData,
        createdAt: new Date().toISOString(),
        verified: false
      };

      // Add to users list
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Auto login after signup
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2)}`;
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      localStorage.setItem('auth_token', token);

      setUser(newUser);
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error('User not found. Please sign up first.');
      }

      // In real app, verify password hash
      // For demo, we'll use simple password check
      if (password !== foundUser.password) {
        throw new Error('Invalid password');
      }

      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2)}`;
      
      if (rememberMe) {
        localStorage.setItem('auth_user', JSON.stringify(foundUser));
        localStorage.setItem('auth_token', token);
      } else {
        sessionStorage.setItem('auth_user', JSON.stringify(foundUser));
        sessionStorage.setItem('auth_token', token);
      }

      setUser(foundUser);
      return { success: true, user: foundUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_token');
    setUser(null);
    router.push('/auth/login');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    
    // Update in localStorage
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    
    // Update in users list
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    return { success: true, user: updatedUser };
  };

  const forgotPassword = (email) => {
    // In real app, send password reset email
    // For demo, just return success
    return { success: true, message: 'Password reset link sent to email' };
  };

  const resetPassword = (email, newPassword) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    // Update current user if logged in
    if (user && user.email === email) {
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }

    return { success: true };
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};