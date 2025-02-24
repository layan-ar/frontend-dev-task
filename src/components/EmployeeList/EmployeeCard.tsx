import React, { useState } from 'react';
import { Employee } from '../../components/Types/employee';
import { deleteEmployee } from '../DeleteEmployee';
import { updateEmployee } from '../UpdateEmployee';

interface EmployeeCardProps {
    employee: Employee;
    onRefresh: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onRefresh }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(employee);

    const handleDelete = async () => {
        await deleteEmployee(parseInt(employee.id));
        onRefresh();
    };

    const handleUpdate = async () => {
        await updateEmployee(parseInt(employee.id), editData);
        setIsEditing(false);
        onRefresh();
    };

    if (isEditing) {
        return (
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <input
                    className="w-full mb-2 p-2 border rounded"
                    value={editData.first_name}
                    onChange={e => setEditData({...editData, first_name: e.target.value})}
                />
                <input
                    className="w-full mb-2 p-2 border rounded"
                    value={editData.last_name}
                    onChange={e => setEditData({...editData, last_name: e.target.value})}
                />
                <input
                    className="w-full mb-2 p-2 border rounded"
                    value={editData.status}
                    onChange={e => setEditData({...editData, status: e.target.value})}
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold">
                {employee.first_name} {employee.last_name}
            </h3>
            <p className="text-gray-600">Status: {employee.status}</p>
            {employee.email && (
                <p className="text-gray-500 text-sm">{employee.email}</p>
            )}
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default EmployeeCard;