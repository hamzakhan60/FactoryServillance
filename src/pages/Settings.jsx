export default function Settings() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6 text-white">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile & Security */}
          <div className="lg:col-span-2 bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">
              User Profile & Security
            </h2>

            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border border-gray-700"
              />
              <button className="px-4 py-2 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-700 transition">
                Change Photo
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Uzair Ali"
                className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                defaultValue="uzair.al@example.com"
                className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6">
              Update Profile
            </button>

            {/* Password Section */}
            <p className="text-sm text-gray-400 mb-3">
              Change your password for enhanced security.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Confirm New Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Update Password
            </button>
          </div>

          {/* Notification Preferences */}
          <div className="bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Notification Preferences
            </h2>

            <div className="flex items-center justify-between mb-4">
              <span>Email notifications</span>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-checked:bg-blue-600 rounded-full relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span>SMS notifications</span>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 peer-checked:bg-blue-600 rounded-full relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span>In-app alerts for critical violations</span>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-checked:bg-blue-600 rounded-full relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
