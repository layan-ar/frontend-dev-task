import React from "react";
import AddEmployee from "./components/AddEmployee";
import EmployeesList from "./components/EmployeeList/EmployeeList" 
import { EmployeeProvider } from "./components/Context/EmployeeContext"

const App: React.FC = () => {
  return (
    <EmployeeProvider>
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Employee Management
        </h1>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <AddEmployee />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <EmployeesList />
        </div>
      </div>
    </div>
  </EmployeeProvider>
  );
};

export default App;
