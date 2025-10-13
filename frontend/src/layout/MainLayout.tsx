import React from 'react';
import { Sidebar } from './SideBar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar handles both mobile header and desktop sidebar */}
      <Sidebar />
      
      {/* Main Content - Add margin on desktop for sidebar */}
      <main className="flex-1 w-full max-w-full md:ml-64">
        <div className="p-4 md:p-6 lg:p-8 w-full max-w-full">
          <div className="w-full max-w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}