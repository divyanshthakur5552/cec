import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Card, CardBody, Button, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import DashboardHome from './home';
import ManageEvents from './manage-events';
import Registrations from './registrations';
import Analytics from './analytics';

const DashboardPage: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(path);
  };
  
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: 'lucide:layout-dashboard',
      exact: true
    },
    { 
      name: 'Manage Events', 
      path: '/dashboard/events', 
      icon: 'lucide:calendar'
    },
    { 
      name: 'Registrations', 
      path: '/dashboard/registrations', 
      icon: 'lucide:users'
    },
    { 
      name: 'Analytics', 
      path: '/dashboard/analytics', 
      icon: 'lucide:bar-chart-2'
    },
    { 
      name: 'Settings', 
      path: '/dashboard/settings', 
      icon: 'lucide:settings'
    }
  ];

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <Card className="border border-divider bg-content1 sticky top-20" shadow="none">
              <CardBody className="p-0">
                <div className="p-4 border-b border-divider">
                  <h2 className="text-lg font-semibold text-foreground">Admin Dashboard</h2>
                </div>
                
                <nav className="p-2">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <li key={item.path}>
                        <Link 
                          to={item.path}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                            isActive(item.path) && (item.exact ? currentPath === item.path : true)
                              ? 'bg-primary text-white'
                              : 'text-foreground-500 hover:bg-content2 hover:text-foreground'
                          }`}
                        >
                          <Icon icon={item.icon} width={18} />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </CardBody>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            <Routes>
              <Route index element={<DashboardHome />} />
              <Route path="events/*" element={<ManageEvents />} />
              <Route path="registrations" element={<Registrations />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<div>Settings Page</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
