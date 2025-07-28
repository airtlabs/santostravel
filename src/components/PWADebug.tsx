'use client';

import { useState, useEffect } from 'react';

const PWADebug = () => {
  const [debug, setDebug] = useState<any>({});

  useEffect(() => {
    const checkPWAStatus = () => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          (window.navigator as any).standalone === true;
      const hasServiceWorker = 'serviceWorker' in navigator;
      const hasManifest = document.querySelector('link[rel="manifest"]') !== null;
      const dismissed = localStorage.getItem('pwa-dismissed');
      
      setDebug({
        userAgent: navigator.userAgent.substring(0, 50) + '...',
        isIOS,
        isAndroid,
        isStandalone,
        hasServiceWorker,
        hasManifest,
        dismissed,
        displayMode: window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 
                    window.matchMedia('(display-mode: minimal-ui)').matches ? 'minimal-ui' :
                    window.matchMedia('(display-mode: fullscreen)').matches ? 'fullscreen' : 'browser',
        windowStandalone: (window.navigator as any).standalone
      });
    };

    checkPWAStatus();
    
    // Update every 2 seconds
    const interval = setInterval(checkPWAStatus, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Only show in development or when URL has debug=true
  const showDebug = process.env.NODE_ENV === 'development' || 
                   (typeof window !== 'undefined' && window.location.search.includes('debug=true'));

  if (!showDebug) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-black text-white p-4 rounded text-xs max-w-xs z-50 opacity-90">
      <h3 className="font-bold mb-2">PWA Debug Info</h3>
      {Object.entries(debug).map(([key, value]) => (
        <div key={key} className="mb-1">
          <strong>{key}:</strong> {String(value)}
        </div>
      ))}
      <button 
        onClick={() => localStorage.removeItem('pwa-dismissed')}
        className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
      >
        Clear PWA Dismissed
      </button>
    </div>
  );
};

export default PWADebug;
