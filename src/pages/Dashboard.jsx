import React, { useState } from 'react';
import { BarChart3, Eye, AlertTriangle, Settings, Activity, Users } from 'lucide-react';

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const navItems = [
    { icon: BarChart3, label: 'Dashboard', active: true },
    { icon: Eye, label: 'Live Monitoring' },
    { icon: AlertTriangle, label: 'Alerts Log' },
    { icon: Activity, label: 'Analytics' },
    { icon: Settings, label: 'Settings' }
  ];

  const statsData = [
    {
      title: 'Total Cameras Online',
      value: '28',
      subtitle: '28 systems operational',
      icon: '📹',
      color: 'blue'
    },
    {
      title: 'Safety Violations Today',
      value: '3',
      subtitle: 'Requires immediate attention',
      icon: '⚠️',
      color: 'red'
    },
    {
      title: 'Critical Alerts',
      value: '1',
      subtitle: 'Investigate urgently',
      icon: '🚨',
      color: 'red'
    },
    {
      title: 'Workers Detected',
      value: '156',
      subtitle: 'Current count per detection',
      icon: '👥',
      color: 'blue'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Overview</h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className={`bg-gray-800 rounded-lg p-6 border ${
                  stat.color === 'red' 
                    ? 'border-red-500/30 bg-red-900/10' 
                    : 'border-gray-700'
                } transition-all duration-300 hover:shadow-lg ${
                  stat.color === 'red' 
                    ? 'hover:shadow-red-500/20' 
                    : 'hover:shadow-blue-500/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl">{stat.icon}</div>
                  {stat.color === 'red' && (
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm text-gray-400 font-medium">{stat.title}</h3>
                  <div className={`text-4xl font-bold ${
                    stat.color === 'red' ? 'text-red-400' : 'text-blue-400'
                  }`}>
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Violations Trend Chart */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-6 text-white">Violations Trend Over Time</h2>
            
            <div className="relative">
              {/* Chart Container */}
              <div className="bg-gray-900/50 rounded-lg p-6 h-80">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-300">Monthly Violations</h3>
                  <div className="flex space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-400">Recent Violations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-400">Critical Violations</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Chart Area */}
                <div className="relative h-56 border-l border-b border-gray-600">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
                    <span>25</span>
                    <span>20</span>
                    <span>15</span>
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                  </div>

                  {/* Chart Lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="80" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 80 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Recent Violations Line (Gray) */}
                    <path
                      d="M 20 160 L 100 140 L 180 120 L 260 110 L 340 100"
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="2"
                      className="drop-shadow-lg"
                    />
                    
                    {/* Critical Violations Line (Red) */}
                    <path
                      d="M 20 180 L 100 175 L 180 170 L 260 160 L 340 150"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                      className="drop-shadow-lg"
                    />

                    {/* Data points */}
                    <circle cx="20" cy="160" r="3" fill="#6b7280" className="drop-shadow-lg" />
                    <circle cx="100" cy="140" r="3" fill="#6b7280" className="drop-shadow-lg" />
                    <circle cx="180" cy="120" r="3" fill="#6b7280" className="drop-shadow-lg" />
                    <circle cx="260" cy="110" r="3" fill="#6b7280" className="drop-shadow-lg" />
                    <circle cx="340" cy="100" r="3" fill="#6b7280" className="drop-shadow-lg" />

                    <circle cx="20" cy="180" r="3" fill="#ef4444" className="drop-shadow-lg" />
                    <circle cx="100" cy="175" r="3" fill="#ef4444" className="drop-shadow-lg" />
                    <circle cx="180" cy="170" r="3" fill="#ef4444" className="drop-shadow-lg" />
                    <circle cx="260" cy="160" r="3" fill="#ef4444" className="drop-shadow-lg" />
                    <circle cx="340" cy="150" r="3" fill="#ef4444" className="drop-shadow-lg" />
                  </svg>

                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 -mb-6 px-4">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-white">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">Safety violation detected</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">Camera 12 back online</p>
                    <p className="text-xs text-gray-500">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">Maintenance scheduled</p>
                    <p className="text-xs text-gray-500">10 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-white">System Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Network Status</span>
                  <span className="text-green-400 text-sm font-medium">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Database</span>
                  <span className="text-green-400 text-sm font-medium">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">AI Processing</span>
                  <span className="text-green-400 text-sm font-medium">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Storage</span>
                  <span className="text-yellow-400 text-sm font-medium">87% Full</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Generate Report
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Export Data
                </button>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Emergency Stop
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700 px-8 py-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex space-x-6">
              <span className="hover:text-white cursor-pointer transition-colors">Resources</span>
              <span className="hover:text-white cursor-pointer transition-colors">Company</span>
              <span className="hover:text-white cursor-pointer transition-colors">Legal</span>
            </div>
            <div className="flex space-x-4">
              <div className="w-5 h-5 bg-gray-600 rounded hover:bg-gray-500 cursor-pointer transition-colors"></div>
              <div className="w-5 h-5 bg-gray-600 rounded hover:bg-gray-500 cursor-pointer transition-colors"></div>
              <div className="w-5 h-5 bg-gray-600 rounded hover:bg-gray-500 cursor-pointer transition-colors"></div>
            </div>
          </div>
        </footer>
      </div>

   
    </div>
  );
};

export default Dashboard;