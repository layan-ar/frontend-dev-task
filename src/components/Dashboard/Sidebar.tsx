import React from 'react';
import "tailwindcss";

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex md:flex-col w-[280px] bg-white border-r border-gray-200">
      <div className="h-[70px] flex items-center px-6 border-b border-gray-200">
        <svg className="w-6 h-6 text-[#4f46e5]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M9 11C10.1046 11 11 10.1046 11 9C11 7.89543 10.1046 7 9 7C7.89543 7 7 7.89543 7 9C7 10.1046 7.89543 11 9 11Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M15 9H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15 13H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 13H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span className="ml-3 text-base font-medium text-gray-900">Employee Manager</span>
      </div>
      <nav className="flex-1 p-4">
        <a href="#" className="flex items-center h-[40px] px-3 text-sm text-[#4f46e5] bg-[#f5f3ff] rounded-md">
          <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Employees
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;