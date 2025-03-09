import { createContext, useContext, useState } from 'react';

export interface UserData {
  name?: { first: string; last: string };
  email: string;
  password: string;
}

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  jwtTokens: JwtTokens | null;
  setJwtTokens: (jwtTokens: JwtTokens | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [jwtTokens, setJwtTokens] = useState<JwtTokens | null>(null);

  return (
    <AuthContext.Provider value={{ userData, setUserData, jwtTokens, setJwtTokens }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
