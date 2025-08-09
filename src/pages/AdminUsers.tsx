import React from "react";
import UserTable from "../components/admin/UserTable";

const AdminUsers: React.FC = () => {
  // TODO: Protect this page (admin only)
  // TODO: Integrate UserTable component
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User & Role Management</h1>
  <UserTable />
    </div>
  );
};

export default AdminUsers;
