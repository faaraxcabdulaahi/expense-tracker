import React from 'react';
import { Header } from './Header';
import { Sidebar } from './SideBar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 bg-background border-b">
        <Header />
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block md:w-64 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <Sidebar />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 w-full max-w-full">
          <div className="p-4 md:p-6 lg:p-8 w-full max-w-full">
            <div className="w-full max-w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}