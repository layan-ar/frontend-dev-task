import React from "react";
import AddEmployee from "./components/AddEmployee";
import EmployeesList from "./components/EmployeeList/EmployeeList" 


const App: React.FC = () => {
  return (
      <div>
          <h1>Employee Management</h1>
          <AddEmployee />
          <EmployeesList />
      </div>
  );
};

export default App;
