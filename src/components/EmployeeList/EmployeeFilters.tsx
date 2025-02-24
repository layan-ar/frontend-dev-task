import React from 'react';

export type SortableFields = 'first_name' | 'last_name' | 'status';

interface EmployeeFiltersProps {
  currentStatus: string;
  currentSort: SortableFields;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: SortableFields) => void;
}

const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  currentStatus,
  currentSort,
  onStatusChange,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <label className="text-gray-700 whitespace-nowrap">Filter by Status:</label>
        <select
          value={currentStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="border rounded p-2 w-full sm:w-auto"
        >
          <option value="">All</option>
          <option value="Terminated">Terminated</option>
          <option value="New">New</option>
          <option value="Leaving">Leaving</option>
          <option value="Active">Active</option>
        </select>
      </div>
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <label className="text-gray-700 whitespace-nowrap">Sort by:</label>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as SortableFields)}
          className="border rounded p-2 w-full sm:w-auto"
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