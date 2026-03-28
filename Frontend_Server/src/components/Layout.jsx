import React from 'react';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-white font-sans text-neutral-900">
      {/* Sidebar - fixed on left */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">
        <div className="flex-1 overflow-y-auto w-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};
