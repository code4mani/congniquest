import React from "react";
import UserTable from "../components/admin/UserTable";

const AdminUsers: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User & Role Management</h1>
      <UserTable />
    </div>
  );
};

export default AdminUsers;
