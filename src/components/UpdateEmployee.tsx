import React, { useState } from 'react';
import { Employee } from './Types/employee';
import { useEmployees } from './Context/EmployeeContext';


interface UpdateEmployeeProps {
  employee: Employee;
  onClose: () => void;
}

interface FormData {
  first_name: string;
  last_name: string;
  status: 'Terminated' | 'New' | 'Leaving' | 'Active';
  description: string;
}

const UpdateEmployee: React.FC<UpdateEmployeeProps> = ({ employee, onClose }) => {
  const { updateEmployee } = useEmployees();
  const [formData, setFormData] = useState({
    first_name: employee.first_name,
    last_name: employee.last_name,
    status: employee.status,
    description: employee.description,
    email: employee.email
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateEmployee(employee.id, formData);
      onClose();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as FormData['status'] })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="Active">Active</option>
              <option value="Terminated">Terminated</option>
              <option value="New">New</option>
              <option value="Leaving">Leaving</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-gray bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;