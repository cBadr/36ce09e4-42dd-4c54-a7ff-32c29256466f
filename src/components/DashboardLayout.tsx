
import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Menu, Bell, Settings, Search } from 'lucide-react';

type DashboardLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:flex-shrink-0`}>
        <DashboardSidebar />
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="h-16 px-4 flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="ml-4 md:hidden"
              >
                <Menu size={24} />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>
            
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="block w-full pr-10 border-gray-300 rounded-md focus:ring-ocean-500 focus:border-ocean-500 sm:text-sm"
                  placeholder="بحث..."
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="ml-2 text-gray-500 hover:text-gray-700">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="ml-2 text-gray-500 hover:text-gray-700">
                <Settings size={20} />
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
