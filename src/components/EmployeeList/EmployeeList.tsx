import React, { useState, useEffect } from "react";
import { useEmployees } from "../Context/EmployeeContext";
import EmployeeCard from "./EmployeeCard";
import EmployeeFilters, { SortableFields } from "./EmployeeFilters"; 
import AddEmployee from "../AddEmployee";

const EmployeeList: React.FC = () => {
  const { 
    employees, 
    loading, 
    error, 
    refreshEmployees 
  } = useEmployees();
  
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('searchQuery') || '';
  });
  
  const [sortField, setSortField] = useState<SortableFields>(() => {
    return (localStorage.getItem('sortField') as SortableFields) || 'first_name';
  });
  
  const [filterStatus, setFilterStatus] = useState(() => {
    return localStorage.getItem('filterStatus') || '';
  });
  
  const [showAddModal, setShowAddModal] = useState(false);

  // Calculate statistics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;

  const filteredAndSortedEmployees = React.useMemo(() => {
    let result = [...employees];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (employee) =>
          employee.first_name.toLowerCase().includes(query) ||
          employee.last_name.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filterStatus) {
      result = result.filter(
        (employee) => employee.status === filterStatus
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortField === 'first_name') {
        return a.first_name.localeCompare(b.first_name);
      }
      if (sortField === 'last_name') {
        return a.last_name.localeCompare(b.last_name);
      }
      if (sortField === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

    return result;
  }, [employees, searchQuery, filterStatus, sortField]);

  const handleCloseModal = () => {
    setShowAddModal(false);
    refreshEmployees();
  };

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('sortField', sortField);
    localStorage.setItem('filterStatus', filterStatus);
  }, [searchQuery, sortField, filterStatus]);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="max-w-[1400px] mx-auto px-4 py-8 w-full">
        {/* Stats Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Total Employees Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
              </div>
            </div>
          </div>

          {/* Active Employees Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Employees</p>
                <p className="text-2xl font-bold text-gray-900">{activeEmployees}</p>
              </div>
            </div>
          </div>

          {/* Add Employee Card */}
          <div 
            onClick={() => setShowAddModal(true)}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Add New</p>
                <p className="text-2xl font-bold text-gray-900">Employee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
          {/* Search and Filters */}
          <div className="border-b border-gray-200">
            <div className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search employees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-10 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <EmployeeFilters
                    currentStatus={filterStatus}
                    currentSort={sortField}
                    onStatusChange={setFilterStatus}
                    onSortChange={setSortField}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Employee Grid Container */}
          <div className="p-4 flex-grow">
            {loading ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <div className="text-center text-red-500">{error}</div>
              </div>
            ) : filteredAndSortedEmployees.length === 0 ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <div className="text-center text-gray-500">
                  <p className="text-xl font-semibold">No employees found</p>
                  <p className="mt-2">Try adjusting your search or filter criteria</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr min-h-[50vh]">
                {filteredAndSortedEmployees.map((employee) => (
                  <EmployeeCard 
                    key={employee.id} 
                    employee={employee}
                    onRefresh={refreshEmployees}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <AddEmployee onClose={handleCloseModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;