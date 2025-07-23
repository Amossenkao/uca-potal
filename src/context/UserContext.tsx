'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext<any>(null);

export function useUserData() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/students.json')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
}
