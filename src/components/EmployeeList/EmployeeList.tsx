import React from "react";
import useFetchEmployees from "./useFetchEmployees"; 

const EmployeesList: React.FC = () => {
    const { employees, loading, error } = useFetchEmployees("http://localhost:3000/employees"); 
    if (loading) return <p>Loading employees...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Employee List</h2>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.first_name} {employee.last_name} - {employee.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeesList;
