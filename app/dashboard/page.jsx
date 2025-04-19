import React from 'react';
import SideNav from '@/components/SideNav';
import ControlPanel from '@/components/ControlPanel';
import LogoPlayGround from '@/components/LogoPlayGround';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      

      {/* Main content below Navbar */}
      <div className="flex flex-1">
        {/* SideNav */}
        <div className="w-64 bg-gray-100 dark:bg-gray-900 p-4 border-r">
          <SideNav />
        </div>

        {/* Dashboard content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 p-4">
          <div className="md:col-span-2">
            <ControlPanel />
          </div>

          <div className="md:col-span-3">
            <LogoPlayGround />
          </div>

          <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-center text-black dark:text-white">Welcome to the Dashboard</h1>
            <p className="text-center text-gray-800 dark:text-gray-300">Here you can customize your logo and settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
