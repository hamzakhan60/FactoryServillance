import React, { useState, useEffect, useRef } from 'react';
import { Users, Camera, Wifi, WifiOff, RefreshCw, AlertCircle, X, Maximize2 } from 'lucide-react';

const LiveMonitor = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [streamStatus1, setStreamStatus1] = useState('disconnected');
  const [streamStatus2, setStreamStatus2] = useState('disconnected');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [fullscreenCamera, setFullscreenCamera] = useState(null);
  
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const fullscreenVideoRef = useRef(null);
  const pcRef1 = useRef(null);
  const pcRef2 = useRef(null);
  
  const API_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const startStream = async (cameraId, videoRef, pcRef, setStatus, setError) => {
    try {
      setStatus('connecting');
      setError('');
      
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      });
      pcRef.current = pc;

      pc.addTransceiver('video', { direction: 'recvonly' });

      pc.ontrack = (event) => {
        if (videoRef.current && event.streams[0]) {
          videoRef.current.srcObject = event.streams[0];
          setStatus('connected');
          
          // If fullscreen is open for this camera, also set the fullscreen video
          if (fullscreenVideoRef.current && fullscreenCamera?.cameraId === cameraId) {
            fullscreenVideoRef.current.srcObject = event.streams[0];
          }
        }
      };

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === 'connected') {
          setStatus('connected');
        } else if (pc.connectionState === 'failed' || pc.connectionState === 'closed') {
          setStatus('error');
          setError('Connection failed');
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      if (pc.iceGatheringState !== 'complete') {
        await new Promise((resolve) => {
          const checkState = () => {
            if (pc.iceGatheringState === 'complete') {
              pc.removeEventListener('icegatheringstatechange', checkState);
              resolve();
            }
          };
          pc.addEventListener('icegatheringstatechange', checkState);
        });
      }

      const response = await fetch(`${API_URL}/offer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sdp: pc.localDescription.sdp,
          type: pc.localDescription.type,
          camera_id: cameraId
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status}`);
      }

      const answer = await response.json();
      await pc.setRemoteDescription(new RTCSessionDescription({
        sdp: answer.sdp,
        type: answer.type,
      }));

    } catch (error) {
      console.error(`Error starting stream ${cameraId}:`, error);
      setStatus('error');
      setError(error.message);
      
      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }
    }
  };

  const stopStream = (videoRef, pcRef, setStatus, setError) => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStatus('disconnected');
    setError('');
  };

  useEffect(() => {
    startStream('CAM001', videoRef1, pcRef1, setStreamStatus1, setErrorMessage1);
    startStream('CAM002', videoRef2, pcRef2, setStreamStatus2, setErrorMessage2);
    
    return () => {
      stopStream(videoRef1, pcRef1, setStreamStatus1, setErrorMessage1);
      stopStream(videoRef2, pcRef2, setStreamStatus2, setErrorMessage2);
    };
  }, []);

  // Update fullscreen video when it opens
  useEffect(() => {
    if (fullscreenCamera && fullscreenCamera.isLive && fullscreenVideoRef.current) {
      const videoRef = fullscreenCamera.videoRef;
      if (videoRef.current && videoRef.current.srcObject) {
        fullscreenVideoRef.current.srcObject = videoRef.current.srcObject;
      }
    }
  }, [fullscreenCamera]);

  const staticCameraFeeds = [
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
      message: 'Forklift Safety Violation',
      status: 'active'
    },
    {
      time: '2024-09-02 09:08:12',
      type: 'Loading Alert',
      message: 'Loading Dock 3',
      status: 'resolved'
    }
  ];

  const renderVideoFeed = (cameraId, name, videoRef, status, errorMessage, onStart, onStop, isLive = false) => {
    const getStatusColor = () => {
      switch(status) {
        case 'connected': return 'text-green-400';
        case 'connecting': return 'text-yellow-400';
        case 'error': return 'text-red-400';
        default: return 'text-gray-400';
      }
    };

    const getStatusText = () => {
      switch(status) {
        case 'connected': return 'CONNECTED';
        case 'connecting': return 'CONNECTING...';
        case 'error': return 'CONNECTION ERROR';
        default: return 'DISCONNECTED';
      }
    };

    return (
      <div 
        className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden group hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
        onClick={() => setFullscreenCamera({ cameraId, name, videoRef, status, errorMessage, onStart, onStop, isLive })}
      >
        <div className="bg-gray-900 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-white">{name}</span>
          </div>
          <div className="flex items-center space-x-2">
            {isLive && (
              <>
                {status === 'connected' ? (
                  <Wifi className="w-4 h-4 text-green-400" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-400" />
                )}
              </>
            )}
            {!isLive && <Wifi className="w-4 h-4 text-green-400" />}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isLive) {
                  status === 'connected' ? onStop() : onStart();
                }
              }}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              {isLive ? (
                <RefreshCw className="w-4 h-4 text-gray-400 hover:text-white" />
              ) : (
                <Maximize2 className="w-4 h-4 text-gray-400 hover:text-white" />
              )}
            </button>
          </div>
        </div>

        <div className="relative aspect-video bg-gray-900">
          {isLive ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              
              {status !== 'connected' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${getStatusColor()}`}>
                      {getStatusText()}
                    </div>
                    {errorMessage && (
                      <div className="mt-2 text-sm text-red-400 flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errorMessage}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <img src={videoRef} alt={name} className="w-full h-full object-cover" />
          )}

          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>{isLive ? 'LIVE AI' : 'LIVE'}</span>
          </div>

          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            Camera ID: {cameraId}
          </div>

          <div className="absolute bottom-3 right-3 flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white text-xs">REC</span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-3">
              <Maximize2 className="w-6 h-6 text-gray-900" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fullscreen Modal
  const renderFullscreenModal = () => {
    if (!fullscreenCamera) return null;

    const { cameraId, name, videoRef, status, errorMessage, onStart, onStop, isLive } = fullscreenCamera;

    const getStatusColor = () => {
      switch(status) {
        case 'connected': return 'text-green-400';
        case 'connecting': return 'text-yellow-400';
        case 'error': return 'text-red-400';
        default: return 'text-gray-400';
      }
    };

    const getStatusText = () => {
      switch(status) {
        case 'connected': return 'CONNECTED';
        case 'connecting': return 'CONNECTING...';
        case 'error': return 'CONNECTION ERROR';
        default: return 'DISCONNECTED';
      }
    };

    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8 animate-fadeIn">
        <div className="w-full h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Camera className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">{name}</h2>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400 text-sm">Camera ID: {cameraId}</span>
              {isLive && (
                <>
                  <span className="text-gray-400">|</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      status === 'connected' ? 'bg-green-500 animate-pulse' : 
                      status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 
                      'bg-red-500'
                    }`}></div>
                    <span className={`text-sm font-medium ${getStatusColor()}`}>
                      {getStatusText()}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {isLive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    status === 'connected' ? onStop() : onStart();
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reconnect</span>
                </button>
              )}
              <button
                onClick={() => setFullscreenCamera(null)}
                className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Video Container */}
          <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden relative">
            {isLive ? (
              <>
                <video
                  ref={fullscreenVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-contain"
                />
                
                {status !== 'connected' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                    <div className="text-center">
                      <div className={`text-2xl font-semibold ${getStatusColor()}`}>
                        {getStatusText()}
                      </div>
                      {errorMessage && (
                        <div className="mt-4 text-lg text-red-400 flex items-center justify-center gap-2">
                          <AlertCircle className="w-6 h-6" />
                          {errorMessage}
                        </div>
                      )}
                      {status === 'error' && (
                        <button
                          onClick={onStart}
                          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                        >
                          Retry Connection
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <img src={videoRef} alt={name} className="w-full h-full object-contain" />
            )}

            {/* Overlays */}
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-2 rounded flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="font-semibold">{isLive ? 'LIVE AI DETECTION' : 'LIVE'}</span>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-black/70 px-3 py-2 rounded">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold">RECORDING</span>
            </div>

            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded">
              <div className="text-xs text-gray-400">Timestamp</div>
              <div className="text-sm font-mono">{currentTime.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Live Monitoring - Factory Safety & Security</h1>
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

        <main className="flex-1 flex">
          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Camera 1 - Authorized Detection */}
              {renderVideoFeed(
                'CAM001',
                'Assembly Line 1 - Authorized Detection',
                videoRef1,
                streamStatus1,
                errorMessage1,
                () => startStream('CAM001', videoRef1, pcRef1, setStreamStatus1, setErrorMessage1),
                () => stopStream(videoRef1, pcRef1, setStreamStatus1, setErrorMessage1),
                true
              )}

              {/* Camera 2 - Forklift Safety */}
              {renderVideoFeed(
                'CAM002',
                'Warehouse - Forklift Safety',
                videoRef2,
                streamStatus2,
                errorMessage2,
                () => startStream('CAM002', videoRef2, pcRef2, setStreamStatus2, setErrorMessage2),
                () => stopStream(videoRef2, pcRef2, setStreamStatus2, setErrorMessage2),
                true
              )}

              {/* Static Camera Feeds */}
              {staticCameraFeeds.map((camera) => 
                renderVideoFeed(
                  camera.id,
                  camera.name,
                  camera.image,
                  'connected',
                  '',
                  () => {},
                  () => {},
                  false
                )
              )}
            </div>
          </div>

          {/* Real-time Alerts Panel */}
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-2">Real-time Alerts</h2>
              <div className="text-sm text-gray-400">Live monitoring status updates</div>
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
                  
                  <div className="text-xs text-gray-500">{alert.time}</div>

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

            <div className="p-4 border-t border-gray-700 bg-gray-900/50">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-400">2</div>
                  <div className="text-xs text-gray-400">Active Alerts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-400">1</div>
                  <div className="text-xs text-gray-400">Resolved Today</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Fullscreen Modal */}
      {renderFullscreenModal()}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LiveMonitor;