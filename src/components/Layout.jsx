import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [activeNav, setActiveNav] = useState("Dashboard");

  const navItems = [
    { label: "Dashboard", icon: () => <span>📊</span> },
    { label: "Live Monitoring", icon: () => <span>🎥</span> },
    { label: "Alerts", icon: () => <span>🚨</span> },
    { label: "Analytics", icon: () => <span>📈</span> },
    { label: "Settings", icon: () => <span>⚙️</span> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar navItems={navItems} activeNav={activeNav} setActiveNav={setActiveNav} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
