import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  BarChart3, 
  Settings,
  Users,
  Menu,
  X,
  LogOut,
  User
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
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isOpen) {
        const sidebar = document.querySelector('.mobile-sidebar');
        const hamburger = document.querySelector('.mobile-hamburger');
        
        if (sidebar && 
            !sidebar.contains(event.target) && 
            !hamburger?.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const filteredNavigation = navigation.filter(item => 
    !item.adminOnly || user?.role === 'admin'
  );

  return (
    <>
      {/* Mobile header - Ultra compact */}
      <div className="md:hidden flex items-center justify-between py-2 px-4 border-b bg-background sticky top-0 z-40 h-12">
        <Link to="/" className="font-semibold text-base">Expense Tracker</Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-hamburger p-1 rounded-md hover:bg-muted/80 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Menu className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "mobile-sidebar fixed inset-y-0 left-0 z-50 w-64 transform bg-background border-r p-4 transition-transform duration-300 ease-in-out md:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-6 py-1">
          <Link to="/" className="font-semibold text-lg">Expense Tracker</Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md hover:bg-muted/80 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        
        {/* User Info in Mobile Sidebar */}
        <div className="flex items-center gap-3 p-3 mb-4 border rounded-lg bg-muted/50">
          <div className="flex-shrink-0">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        
        <nav className="flex flex-col gap-1 mb-4">
          {filteredNavigation.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50",
                  isActive && "bg-primary/10 text-primary font-medium"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button in Mobile Sidebar */}
        <button
          onClick={() => {
            handleLogout();
            setIsOpen(false);
          }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-red-600 transition-all hover:bg-red-50 hover:text-red-700 mt-auto"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block md:w-64 md:flex-shrink-0">
        <div className="fixed inset-y-0 left-0 z-30 w-64 bg-background border-r flex flex-col">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
              <span>Expense Tracker</span>
            </Link>
          </div>

          {/* User Info in Desktop Sidebar */}
          <div className="flex items-center gap-3 p-4 border-b">
            <div className="flex-shrink-0">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-muted"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-muted">
                  <User className="h-5 w-5 text-primary" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="flex flex-col gap-1 px-3">
              {filteredNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50",
                      isActive && "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Logout Button in Desktop Sidebar */}
          <div className="p-3 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-red-600 transition-all hover:bg-red-50 hover:text-red-700 w-full"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}