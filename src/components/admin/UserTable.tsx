import React from "react";

// TODO: Replace with real user data and actions
const mockUsers = [
  { id: "1", email: "admin@example.com", displayName: "Admin User", role: "admin", allowed: true },
  { id: "2", email: "teacher@example.com", displayName: "Teacher User", role: "teacher", allowed: true },
];

const UserTable: React.FC = () => {
  return (
    <table className="min-w-full border text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Role</th>
          <th className="p-2 border">Allowed</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {mockUsers.map((user) => (
          <tr key={user.id}>
            <td className="p-2 border">{user.email}</td>
            <td className="p-2 border">{user.displayName}</td>
            <td className="p-2 border">{user.role}</td>
            <td className="p-2 border">{user.allowed ? "Yes" : "No"}</td>
            <td className="p-2 border">
              {/* TODO: Edit/Delete actions */}
              <button className="text-blue-600 hover:underline mr-2">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
