import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const adminNavItems = [
    { label: 'Dashboard', to: '/admin/dashboard' },
    { label: 'User Management', to: '/admin/users' },
    { label: 'Lesson Management', to: '/admin/lessons' },
  ];

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">Admin Menu</h2>
        <nav className="flex flex-col space-y-2">
          {adminNavItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end // Use 'end' to match the exact path for the dashboard
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-gray-200'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
