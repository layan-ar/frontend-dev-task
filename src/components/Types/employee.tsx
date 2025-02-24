export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  
  status: 'Terminated' | 'New' | 'Leaving' | 'Active';
  description: string;
}

export interface EmployeeFormData {
  first_name: string;
  last_name: string;
  email: string;
  status: 'Terminated' | 'New' | 'Leaving' | 'Active';
  description: string;
}