import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '../components/ui/Toast';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    // Check local storage for mocked session
    const storedAuth = localStorage.getItem('wedi_admin_auth');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        setUser(parsed);
      } catch (e) {
        localStorage.removeItem('wedi_admin_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === 'admin@wedi.com' && password === 'Admin123!') {
      const mockUser = {
        email,
        name: 'منى عبد الرحمن',
        role: 'مسؤول النظام',
      };
      setUser(mockUser);
      localStorage.setItem('wedi_admin_auth', JSON.stringify(mockUser));
    } else {
      throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wedi_admin_auth');
    toast('info', 'تم تسجيل الخروج', 'لقد قمت بتسجيل الخروج من النظام.');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
