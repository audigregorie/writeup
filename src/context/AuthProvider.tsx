import { createContext, useContext, useState } from 'react';
import { AuthContextProps, ProviderProps } from '../utils/types/common';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<boolean>(false);

  return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = (): AuthContextProps | undefined => useContext(AuthContext);
