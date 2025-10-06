import React from 'react';
import { Header } from './Header';
import { Sidebar } from './SideBar';


interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-6">
          <div className="flex flex-col gap-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}