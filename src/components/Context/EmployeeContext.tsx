import React, { createContext, useContext, useState, useCallback } from 'react';
import { Employee } from '../Types/employee'


interface EmployeeContextType {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    refreshEmployees: () => Promise<void>;
  }
  
  const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);
  
  export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const refreshEmployees = useCallback(async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/employees');
        if (!response.ok) throw new Error('Failed to fetch employees');
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }, []);
  
    return (
      <EmployeeContext.Provider 
        value={{ 
          employees, 
          setEmployees, 
          loading, 
          setLoading, 
          error, 
          setError,
          refreshEmployees 
        }}
      >
        {children}
      </EmployeeContext.Provider>
    );
  };
  
  
export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
  