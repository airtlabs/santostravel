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
            const hasBeforeInstallPrompt = 'onbeforeinstallprompt' in window;

            setDebug({
                userAgent: navigator.userAgent.substring(0, 80) + '...',
                isIOS,
                isAndroid,
                isStandalone,
                hasServiceWorker,
                hasManifest,
                hasBeforeInstallPrompt,
                dismissed: dismissed ? new Date(parseInt(dismissed)).toLocaleString() : 'No',
                dismissedAgo: dismissed ? Math.round((Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24)) + ' days' : 'N/A',
                displayMode: window.matchMedia('(display-mode: standalone)').matches ? 'standalone' :
                    window.matchMedia('(display-mode: minimal-ui)').matches ? 'minimal-ui' :
                        window.matchMedia('(display-mode: fullscreen)').matches ? 'fullscreen' : 'browser',
                windowStandalone: (window.navigator as any).standalone,
                chromeVersion: navigator.userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Not Chrome',
                isSecure: location.protocol === 'https:',
                swRegistered: 'serviceWorker' in navigator ? 'Checking...' : 'Not supported',
                deferredPromptAvailable: (window as any).deferredInstallPrompt ? 'Yes' : 'No',
                installCriteria: {
                    https: location.protocol === 'https:',
                    manifest: document.querySelector('link[rel="manifest"]') !== null,
                    serviceWorker: 'serviceWorker' in navigator,
                    notInstalled: !window.matchMedia('(display-mode: standalone)').matches
                }
            });

            // Check service worker registration
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistration().then(registration => {
                    setDebug((prev: any) => ({ ...prev, swRegistered: registration ? 'Yes' : 'No' }));
                });
            }
        };

        checkPWAStatus();

        // Update every 3 seconds
        const interval = setInterval(checkPWAStatus, 3000);

        return () => clearInterval(interval);
    }, []);

    // Only show in development or when URL has debug=true
    const showDebug = process.env.NODE_ENV === 'development' ||
        (typeof window !== 'undefined' && window.location.search.includes('debug=true'));

    const clearDismissed = () => {
        localStorage.removeItem('pwa-dismissed');
        window.location.reload();
    };

    const forceShowInstall = () => {
        localStorage.removeItem('pwa-dismissed');
        // Dispatch a custom event to trigger install prompt
        window.dispatchEvent(new Event('beforeinstallprompt'));
        window.location.reload();
    };

    // Don't show if not in debug mode or if debug data is empty
    if (!showDebug || !debug || Object.keys(debug).length === 0) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 bg-black text-white p-4 rounded text-xs max-w-xs z-50 opacity-90">
            <h3 className="font-bold mb-2">PWA Debug Info</h3>
            {Object.entries(debug).map(([key, value]) => (
                <div key={key} className="mb-1">
                    <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </div>
            ))}
            <div className="flex gap-1 mt-4">
                <button
                    onClick={clearDismissed}
                    className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                >
                    Clear
                </button>
                <button
                    onClick={forceShowInstall}
                    className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                >
                    Force
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                >
                    Reload
                </button>
            </div>
        </div>
    );
};

export default PWADebug;
