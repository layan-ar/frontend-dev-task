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

// function App() {
//   return (
//     <div className="p-5">
//       <h1 className="text-xl font-bold">Employee Management</h1>
//       <AddEmployee />
//       <EmployeesList />
//     </div>
//   );
// }

// export default App;
