import React, { useState,useEffect } from 'react';
import {Download, Calendar, Filter, ChevronDown } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

const Alerts = () => {
  const [cameraFilter, setCameraFilter] = useState('All Cameras');
  const [violationFilter, setViolationFilter] = useState('All Violation Types');
  const [messages, setMessages] = useState([]);
  const [alertsData,setAlertData]=useState([
    {
      cameraId: 'CAM-001',
      timestamp: '2024-03-08 09:30:00',
      violationType: 'No Helmet',
      screenshot: 'https://images.unsplash.com/photo-1581092786450-7bcd5c3fe85b?w=80&h=60&fit=crop',
      severity: 'critical'
    },
    {
      cameraId: 'CAM-005',
      timestamp: '2024-03-08 09:45:45',
      violationType: 'Loitering',
      screenshot: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=80&h=60&fit=crop',
      severity: 'normal'
    },
    {
      cameraId: 'CAM-003',
      timestamp: '2024-03-08 09:23:05',
      violationType: 'Unauthorized Access',
      screenshot: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=80&h=60&fit=crop',
      severity: 'critical'
    },
    {
      cameraId: 'CAM-001',
      timestamp: '2024-03-08 09:20:22',
      violationType: 'Anomalous Activity',
      screenshot: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&h=60&fit=crop',
      severity: 'normal'
    },
    {
      cameraId: 'CAM-003',
      timestamp: '2024-03-08 09:18:08',
      violationType: 'No Helmet',
      screenshot: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=80&h=60&fit=crop',
      severity: 'critical'
    },
    {
      cameraId: 'CAM-004',
      timestamp: '2024-03-08 14:28:20',
      violationType: 'Intrusion',
      screenshot: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=80&h=60&fit=crop',
      severity: 'normal'
    },
    {
      cameraId: 'CAM-003',
      timestamp: '2024-03-08 11:55:43',
      violationType: 'Unauthorized Access',
      screenshot: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=80&h=60&fit=crop',
      severity: 'normal'
    },
    {
      cameraId: 'CAM-005',
      timestamp: '2024-03-01 07:30:00',
      violationType: 'Loitering',
      screenshot: 'https://images.unsplash.com/photo-1581092786450-7bcd5c3fe85b?w=80&h=60&fit=crop',
      severity: 'critical'
    }
  ]);

  useEffect(() => {
    // Subscribe to INSERT events in your table (e.g., "notifications")
    const channel = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "alerts" },
        (payload) => {
          console.log("New row inserted:", payload.new);
          setMessages((prev) => [...prev, payload.new]); // Update state
          const data={
               
            cameraId: 'CAM-005',
            timestamp: payload.new.timestamp,
            violationType: payload.new.alert_type,
            screenshot:payload.new.image_url,
            severity: 'critical'
          
          }
          console.log(data)
          setAlertData((prev)=> [data,...prev]);  

        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "entry_exit_alerts" },
        (payload) => {
          console.log("New row inserted:", payload.new);
          const data={
               
            cameraId: 'CAM-005',
            timestamp: payload.new.timestamp,
            violationType: payload.new.event_type,
            screenshot:payload.new.image_url,
            severity: 'normal'
          
          }
          console.log(data)
          setAlertData((prev)=> [data,...prev]);  

        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "ppe_violations" },
        (payload) => {
          console.log("New row inserted:", payload.new);
          const data={
               
            cameraId: 'CAM-005',
            timestamp: payload.new.timestamp,
            violationType: payload.new.missing_equipment,
            screenshot:payload.new.image_url,
            severity: payload.new.severity =="high" ? 'critical':'normal'
          
          }
          console.log(data)
          setAlertData((prev)=> [data,...prev]);  

        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);




 

  const cameraOptions = ['All Cameras', 'CAM-001', 'CAM-002', 'CAM-003', 'CAM-004', 'CAM-005'];
  const violationOptions = ['All Violation Types', 'No Helmet', 'Loitering', 'Unauthorized Access', 'Anomalous Activity', 'Intrusion'];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
     

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header with Filters and Export */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Camera Filter */}
              <div className="relative">
                <select
                  value={cameraFilter}
                  onChange={(e) => setCameraFilter(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                >
                  {cameraOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Violation Type Filter */}
              <div className="relative">
                <select
                  value={violationFilter}
                  onChange={(e) => setViolationFilter(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                >
                  {violationOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Date Range */}
              <div className="flex items-center space-x-2 bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">Pick a date range</span>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Detections</h1>

          {/* Alerts Table */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 bg-gray-900/50 px-6 py-4 border-b border-gray-700 text-sm font-medium text-gray-300">
              <div className="col-span-2">Camera ID</div>
              <div className="col-span-3">Timestamp</div>
              <div className="col-span-3">Violation Type</div>
              <div className="col-span-4">Screenshot</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-700">
              {alertsData.map((alert, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-700/30 transition-colors duration-200 ${
                    alert.severity === 'critical' ? 'border-l-4 border-red-500 bg-red-900/10' : ''
                  }`}
                >
                  {/* Camera ID */}
                  <div className="col-span-2 flex items-center">
                    <span className="text-gray-300 font-mono">{alert.cameraId}</span>
                  </div>

                  {/* Timestamp */}
                  <div className="col-span-3 flex items-center">
                    <span className="text-gray-300 font-mono text-sm">{alert.timestamp}</span>
                  </div>

                  {/* Violation Type */}
                  <div className="col-span-3 flex items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        alert.severity === 'critical'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-600 text-gray-200'
                      }`}
                    >
                      {alert.violationType}
                    </span>
                  </div>

                  {/* Screenshot */}
                  <div className="col-span-4 flex items-center">
                    <div className="relative w-20 h-12 bg-gray-700 rounded overflow-hidden border border-gray-600">
                      <img
                        src={alert.screenshot}
                        alt="Detection screenshot"
                        className="w-full h-full object-cover"
                      />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-gray-800 rounded-full ml-0.5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-400">
              Showing 1-8 of 147 detections
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
                2
              </button>
              <button className="px-3 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
                3
              </button>
              <button className="px-3 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Alerts;