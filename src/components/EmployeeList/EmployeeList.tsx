import React, { useState, useEffect } from "react";
import { useEmployees } from "../../components/Context/EmployeeContext";
import EmployeeCard from "./EmployeeCard";
import EmployeeFilters from "./EmployeeFilters";
import { Employee } from "../../components/Types/employee";

const EmployeesList: React.FC = () => {
    const { employees, loading, error, refreshEmployees } = useEmployees();
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
    const [sortField, setSortField] = useState<keyof Employee>("first_name");
    const [filterStatus, setFilterStatus] = useState<string>("");

    useEffect(() => {
        refreshEmployees();
    }, [refreshEmployees]);

    useEffect(() => {
        let result = [...employees];
        
        // filters
        if (filterStatus) {
            result = result.filter(emp => emp.status === filterStatus);
        }

        //  sorting
        result.sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return aValue.localeCompare(bValue);
            }
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return aValue - bValue;
            }
            return 0;
        });

        setFilteredEmployees(result);
    }, [employees, filterStatus, sortField]);

    if (loading) return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
        </div>
    );

    return (
        <div>
            <EmployeeFilters
                onStatusChange={setFilterStatus}
                onSortChange={setSortField}
                currentStatus={filterStatus}
                currentSort={sortField}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {filteredEmployees.map((employee) => (
                    <EmployeeCard 
                        key={employee.id}
                        employee={employee}
                        onRefresh={refreshEmployees}
                    />
                ))}
            </div>
        </div>
    );
};

export default EmployeesList;