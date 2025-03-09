import { createContext, useContext, useState, ReactNode } from 'react';

export interface UserData {
  email: string;
  name: {
    first: string;
    last: string;
  };
  password: string;
}

interface AuthContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return <AuthContext.Provider value={{ userData, setUserData }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
