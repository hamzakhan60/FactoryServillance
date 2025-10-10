import React, { useState, useEffect } from 'react';
import { Users, Camera, Wifi, WifiOff } from 'lucide-react';

const LiveMoniter = () => {
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  
  const cameraFeeds = [
    {
      id: 'CAM001',
      name: 'Assembly Line 1',
      status: 'online',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      alerts: []
    },
    {
      id: 'CAM002', 
      name: 'Warehouse Exit',
      status: 'online',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
      alerts: ['PPE Violation', 'Safety Alert']
    },
    {
      id: 'CAM003',
      name: 'Main Entrance', 
      status: 'online',
      image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&h=300&fit=crop',
      alerts: []
    },
    {
      id: 'CAM004',
      name: 'Quality Control',
      status: 'online', 
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop',
      alerts: []
    },
    {
      id: 'CAM005',
      name: 'Loading Dock 3',
      status: 'online',
      image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop',
      alerts: []
    },
    {
      id: 'CAM006',
      name: 'Server Room',
      status: 'online',
      image: 'https://images.unsplash.com/photo-1581092786450-7bcd5c3fe85b?w=400&h=300&fit=crop',
      alerts: []
    }
  ];

  const realtimeAlerts = [
    {
      time: '2024-09-02 09:15:23',
      type: 'Equipment Alert',
      message: 'No Hardhat Detected',
      status: 'active'
    },
    {
      time: '2024-09-02 09:10:45', 
      type: 'Safety Alert',
      message: 'Restricted Area Entry',
      status: 'active'
    },
    {
      time: '2024-09-02 09:08:12',
      type: 'Loading Alert',
      message: 'Loading Dock 3',
      status: 'resolved'
    },
    {
      time: '2024-09-02 09:05:33',
      type: 'Loading Alert', 
      message: 'Loading Dock 5',
      status: 'resolved'
    },
    {
      time: '2024-09-02 09:02:07',
      type: 'Assembly Alert',
      message: 'Assembly Line 2',
      status: 'resolved'
    },
    {
      time: '2024-09-02 08:58:41',
      type: 'Safety Alert',
      message: 'Safety Vest Violation',
      status: 'resolved'
    },
    {
      time: '2024-09-02 08:55:19',
      type: 'Personnel Alert',
      message: 'Loitering Detected',
      status: 'resolved'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Live Monitoring - Factory Safety & Security</h1>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">LIVE</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">
              {currentTime.toLocaleString()}
            </span>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 flex">
          {/* Camera Grid */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {cameraFeeds.map((camera, index) => (
                <div
                  key={camera.id}
                  className="bg-gray-800 h-full rounded-lg border border-gray-700 overflow-hidden group hover:border-blue-500/50 transition-all duration-300"
                >
                  {/* Camera Header */}
                  <div className="bg-gray-900 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-white">{camera.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {camera.status === 'online' ? (
                        <Wifi className="w-4 h-4 text-green-400" />
                      ) : (
                        <WifiOff className="w-4 h-4 text-red-400" />
                      )}
                      <div className={`w-2 h-2 rounded-full ${
                        camera.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </div>

                  {/* Camera Feed */}
                  <div className="relative aspect-video bg-gray-900">
                    <img
                      src={camera.image}
                      alt={camera.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Live indicator overlay */}
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>LIVE</span>
                    </div>

                    {/* Alert overlays */}
                    {camera.alerts.map((alert, alertIndex) => (
                      <div
                        key={alertIndex}
                        className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded animate-pulse"
                      >
                        {alert}
                      </div>
                    ))}

                    {/* Camera ID overlay */}
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Camera ID: {camera.id}
                    </div>

                    {/* Recording indicator */}
                    <div className="absolute bottom-3 right-3 flex items-center space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-white text-xs">REC</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Alerts Panel */}
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-2">Real-time Alerts</h2>
              <div className="text-sm text-gray-400">
                Live monitoring status updates
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {realtimeAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                    alert.status === 'active'
                      ? 'bg-red-900/20 border-red-500/30 hover:border-red-500/50'
                      : 'bg-gray-900/50 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className={`text-sm font-medium ${
                      alert.status === 'active' ? 'text-red-400' : 'text-gray-300'
                    }`}>
                      {alert.type}
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      alert.status === 'active' ? 'bg-red-500 animate-pulse' : 'bg-gray-500'
                    }`}></div>
                  </div>
                  
                  <div className={`text-sm mb-2 ${
                    alert.status === 'active' ? 'text-white' : 'text-gray-400'
                  }`}>
                    {alert.message}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {alert.time}
                  </div>

                  {alert.status === 'active' && (
                    <div className="mt-3 pt-3 border-t border-red-500/20">
                      <button className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors duration-200">
                        Acknowledge
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Alert Summary */}
            <div className="p-4 border-t border-gray-700 bg-gray-900/50">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-400">2</div>
                  <div className="text-xs text-gray-400">Active Alerts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-400">5</div>
                  <div className="text-xs text-gray-400">Resolved Today</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveMoniter;