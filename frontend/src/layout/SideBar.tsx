// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   CreditCard, 
//   BarChart3, 
//   Settings,
//   Users 
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { cn } from '../lib/utils';

// // Add this to the navigation array:
// const navigation = [
//   { name: 'Dashboard', href: '/', icon: LayoutDashboard },
//   { name: 'Transactions', href: '/transactions', icon: CreditCard },
//   { name: 'Analytics', href: '/analytics', icon: BarChart3 },
//   { name: 'Admin', href: '/admin', icon: Users, adminOnly: true },
//   { name: 'Profile', href: '/profile', icon: Settings },
// ];



// export function Sidebar() {
//   const location = useLocation();
//   const { user } = useAuth();

//   const filteredNavigation = navigation.filter(item => 
//     !item.adminOnly || user?.role === 'admin'
//   );

//   return (
//     <div className="hidden border-r bg-muted/40 md:block">
//       <div className="flex h-full max-h-screen flex-col gap-2">
//         <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
//           <Link to="/" className="flex items-center gap-2 font-semibold">
//             <span className="">Expense Tracker</span>
//           </Link>
//         </div>
//         <div className="flex-1">
//           <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
//             {filteredNavigation.map((item) => {
//               const Icon = item.icon;
//               const isActive = location.pathname === item.href;

//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={cn(
//                     "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
//                     isActive && "bg-muted text-primary"
//                   )}
//                 >
//                   <Icon className="h-4 w-4" />
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  BarChart3, 
  Settings,
  Users,
  Menu,
  X 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

// Navigation array
const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: CreditCard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Admin', href: '/admin', icon: Users, adminOnly: true },
  { name: 'Profile', href: '/profile', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const filteredNavigation = navigation.filter(item => 
    !item.adminOnly || user?.role === 'admin'
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-muted/40">
        <Link to="/" className="font-semibold text-lg">Expense Tracker</Link>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform bg-muted/90 p-4 transition-transform duration-300 md:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <nav className="flex flex-col gap-2 mt-4">
          {filteredNavigation.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)} // Close sidebar on link click
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  isActive && "bg-muted text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden border-r bg-muted/40 md:flex md:flex-col md:w-64 md:h-screen">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span>Expense Tracker</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-2 px-2 text-sm font-medium lg:px-4 mt-4">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive && "bg-muted text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
