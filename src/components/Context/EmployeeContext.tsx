import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Employee } from '../Types/employee';

interface EmployeeContextType {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refreshEmployees: () => Promise<void>;
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  currentView?: string;
  setCurrentView: (view: string) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('currentView') || 'list';
  });

  // Persist employees to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  // Persist current view to localStorage
  useEffect(() => {
    localStorage.setItem('currentView', currentView);
  }, [currentView]);

  const refreshEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/employees');
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const addEmployee = useCallback(async (employeeData: Omit<Employee, 'id'>) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      
      if (!response.ok) throw new Error('Failed to add employee');
      const newEmployee = await response.json();
      
      // Update state directly without refreshing
      setEmployees(prev => [...prev, newEmployee]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEmployee = useCallback(async (id: string, employeeData: Partial<Employee>) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/employees/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      
      if (!response.ok) throw new Error('Failed to update employee');
      const updatedEmployee = await response.json();
      
      // Update state directly without refreshing
      setEmployees(prev => 
        prev.map(emp => emp.id === id ? { ...emp, ...updatedEmployee } : emp)
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEmployee = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/employees/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete employee');
      
      // Update state directly without refreshing
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        refreshEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        currentView,
        setCurrentView,
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
