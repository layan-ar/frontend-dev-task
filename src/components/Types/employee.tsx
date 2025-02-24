export interface Employee {
    id: string;
    first_name: string;
    last_name: string;
    email?: string;
    gender?: string;
    status: string;
  }
  
  export interface EmployeeFormData {
    first_name: string;
    last_name: string;
    status: string;
  }