import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextProps, ProviderProps } from '../utils/types/common';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import Loading from '../components/Loading';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{loading ? <Loading /> : children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
