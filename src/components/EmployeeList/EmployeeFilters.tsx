import React from 'react';
import { Employee } from '../../components/Types/employee';

interface EmployeeFiltersProps {
    onStatusChange: (status: string) => void;
    onSortChange: (field: keyof Employee) => void;
    currentStatus: string;
    currentSort: keyof Employee;
}

const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
    onStatusChange,
    onSortChange,
    currentStatus,
    currentSort
}) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
                <label className="text-gray-700">Filter by Status:</label>
                <select
                    value={currentStatus}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="border rounded p-2"
                >
                    <option value="">All</option>
                    <option value="Active">Active</option>
                    <option value="New">New</option>
                    <option value="Terminated">Terminated</option>
                    <option value="Leaving">Leaving</option>
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label className="text-gray-700">Sort by:</label>
                <select
                    value={currentSort}
                    onChange={(e) => onSortChange(e.target.value as keyof Employee)}
                    className="border rounded p-2"
                >
                    <option value="first_name">First Name</option>
                    <option value="last_name">Last Name</option>
                    <option value="status">Status</option>
                </select>
            </div>
        </div>
    );
};

export default EmployeeFilters;