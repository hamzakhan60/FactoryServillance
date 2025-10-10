import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Eye,
  AlertTriangle,
  Settings,
  Activity,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: BarChart3, label: "Dashboard", path: "/dashboard" },
    { icon: Eye, label: "Live Monitoring", path: "/live" },
    { icon: AlertTriangle, label: "Alerts Log", path: "/alerts" },
    { icon: Users, label: "User Management", path: "/user" },
    { icon: Activity, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex min-h-screen">
    <div className="w-64 bg-gray-800 border-r border-gray-700">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold">SafetyVision</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center space-x-3 px-6 py-3 cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-blue-600/20 border-r-2 border-blue-500 text-blue-400"
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
    </div>
  );
};

export default Sidebar;
