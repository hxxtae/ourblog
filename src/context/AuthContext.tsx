import { createContext, ReactNode, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from 'firebaseApp';

export const AuthContext = createContext({
  user: null as User | null,
});

interface AuthContextProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthContextProps) {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
      } else {
        // User is signed out
        setCurrentUser(user);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
