import React from "react";
import { EmployeeProvider } from "./components/Context/EmployeeContext";
import Sidebar from "./components/Dashboard/Sidebar";
import EmployeesList from "./components/EmployeeList/EmployeeList";
import "tailwindcss";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <EmployeeProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc]">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-[#4f46e5]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="ml-3 text-base font-medium text-gray-900">Employee Manager</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block md:w-[280px] bg-white border-r border-gray-200`}>
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            <EmployeesList />
          </div>
        </div>
      </div>
    </EmployeeProvider>
  );
};

export default App;