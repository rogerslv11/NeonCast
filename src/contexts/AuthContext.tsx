// ============================================================
// Auth Context - Gerencia autenticação mock com localStorage
// ============================================================
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { mockUser } from '../data/data';

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  role: string; // 'user' | 'admin'
  memberSince: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Verifica se há user salvo no localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('neoncast_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Se o email for do admin, força o role como admin
        if (parsedUser.email === 'roger@email.com' || parsedUser.email === 'admin@neoncast.com') {
          const adminUser = { ...parsedUser, role: 'admin' };
          setUser(adminUser);
          localStorage.setItem('neoncast_user', JSON.stringify(adminUser));
        } else {
          setUser(parsedUser);
        }
      } catch {
        localStorage.removeItem('neoncast_user');
      }
    } else {
      // Auto-login mock com o usuário Roger (admin)
      setUser(mockUser);
      localStorage.setItem('neoncast_user', JSON.stringify(mockUser));
    }
  }, []);

  const login = (email: string, _password: string): boolean => {
    // Mock: admin@neoncast.com = admin, outros = user
    const isAdmin = email === 'admin@neoncast.com' || email === 'roger@email.com';
    const loggedInUser = { ...mockUser, email, role: isAdmin ? 'admin' : 'user' };
    setUser(loggedInUser);
    localStorage.setItem('neoncast_user', JSON.stringify(loggedInUser));
    return true;
  };

  const register = (name: string, email: string, _password: string): void => {
    const isAdmin = email === 'admin@neoncast.com' || email === 'roger@email.com';
    const newUser = { ...mockUser, name, email, role: isAdmin ? 'admin' : 'user' };
    setUser(newUser);
    localStorage.setItem('neoncast_user', JSON.stringify(newUser));
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('neoncast_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
