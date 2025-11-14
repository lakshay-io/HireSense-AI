'use client';

// Context API for state management
// Provider pattern for dependency injection

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ServiceFactory from '@/services/ServiceFactory';
import { AuthContextType, AuthUser, LoginCredentials, RegisterData } from '@/types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const authService = ServiceFactory.getAuthService();

  // Initialize auth state from localStorage
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const authUser = await authService.login(credentials);
      if (authUser) {
        setUser(authUser);
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      const authUser = await authService.register(data);
      if (authUser) {
        setUser(authUser);
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: user !== null,
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
