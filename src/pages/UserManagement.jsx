import { useState } from "react";

export default function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: "U001", name: "Alice Johnson", email: "alice.johnson@example.com", role: "Admin", status: "Active" },
    { id: "U002", name: "Eve Adams", email: "eve.adams@example.com", role: "Supervisor", status: "Inactive" },
    { id: "U003", name: "Frank Miller", email: "frank.miller@example.com", role: "Admin", status: "Active" },
  ];

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-white">User Management</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            + Add New User
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="bg-gray-800 border border-gray-700 p-2 rounded w-1/2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="bg-gray-800 border border-gray-700 p-2 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Supervisor</option>
          </select>
        </div>

        {/* User Table */}
        <table className="w-full bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-gray-300 text-left">
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-700 hover:bg-gray-700/50 transition"
              >
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  {user.status === "Active" ? (
                    <span className="px-2 py-1 text-sm text-white bg-green-600 rounded">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-sm text-white bg-red-600 rounded">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => openModal(user)}
                    className="text-blue-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button className="text-red-400 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Edit User Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg w-96 p-6 relative text-gray-200">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
              onClick={closeModal}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4 text-white">Edit User</h2>
            <p className="text-sm text-gray-400 mb-4">
              Make changes to the user profile here.
            </p>

            {/* Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-gray-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-gray-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-gray-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  defaultValue={selectedUser.role}
                  className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-gray-200 focus:ring-2 focus:ring-blue-500"
                >
                  <option>Admin</option>
                  <option>Supervisor</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Status</label>
                <input
                  type="checkbox"
                  defaultChecked={selectedUser.status === "Active"}
                  className="h-4 w-4"
                />
                <span>{selectedUser.status}</span>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded border border-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
