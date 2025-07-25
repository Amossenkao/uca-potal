'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const SchoolContext = createContext<any>(null);

export function useSchoolData() {
  return useContext(SchoolContext);
}

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  const [data, setSchool] = useState(null);

  useEffect(() => {
    fetch('/data/schools.json')
      .then(res => res.json())
      .then(json => setSchool(json));
  }, []);

  return (
    <SchoolContext.Provider value={data}>
      {children}
    </SchoolContext.Provider>
  );
}
