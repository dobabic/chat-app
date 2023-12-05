import React, {
  useState, useEffect, createContext, useContext, useMemo,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'Config';

// 1. Create context
const UserContext = createContext();

// 2. Consume context
export function useAuth() {
  return useContext(UserContext);
}

// 3. Provide context
export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        console.log(`User: ${null}`);
      }
    });
    return unsubscribe;
  }, []);

  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>

  );
}
