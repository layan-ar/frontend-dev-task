import React, { useState } from 'react';
import { Employee } from '../Types/employee';
import { useEmployees } from '../Context/EmployeeContext';
import UpdateEmployee from '../UpdateEmployee';

interface EmployeeCardProps {
  employee: Employee;
  onRefresh: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onRefresh }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { deleteEmployee } = useEmployees();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Terminated': return 'bg-red-100 text-red-800';
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Leaving': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(employee.id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col h-full">
        {/* Header with Employee Info */}
        <div className="flex items-start justify-between w-full">
          {/* Avatar and Name Section */}
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#4f46e5] flex items-center justify-center text-white font-medium flex-shrink-0">
              {employee.first_name[0]}
              {employee.last_name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {employee.first_name} {employee.last_name}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {employee.email}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button 
              onClick={() => setShowUpdateModal(true)}
              className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
              aria-label="Edit employee"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button 
              onClick={handleDelete}
              className="p-1.5 text-gray-500 hover:text-red-600 rounded-md hover:bg-red-50"
              aria-label="Delete employee"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
            {employee.status}
          </span>
        </div>

        {/* Description */}
        {employee.description && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 line-clamp-2">
              {employee.description}
            </p>
          </div>
        )}
      </div>

      {/* Update Modal with Backdrop */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowUpdateModal(false)}
          />
          <div className="relative z-50 flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <UpdateEmployee 
                  employee={employee} 
                  onClose={() => setShowUpdateModal(false)} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeCard;