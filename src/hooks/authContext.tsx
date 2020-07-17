import React, { createContext, useCallback, useState, useContext } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(
    (): AuthState => {
      const token = localStorage.getItem('@gobarber:token');
      const user = localStorage.getItem('@gobarber:user');

      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        return {
          token,
          user: JSON.parse(user),
        };
      }

      return {} as AuthState;
    },
  );

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    localStorage.setItem('@gobarber:token', token);
    localStorage.setItem('@gobarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@gobarber:token');
    localStorage.removeItem('@gobarber:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });

      localStorage.setItem('@gobarber:user', JSON.stringify(user));
    },
    [data.token, data.user],
  );

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user: data.user, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an authProvider');
  }

  return context;
}
