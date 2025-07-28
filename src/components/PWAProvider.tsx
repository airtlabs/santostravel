'use client';

import { useEffect } from 'react';

const PWAProvider = () => {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            // Wait for page load to register service worker
            window.addEventListener('load', () => {
                // Register service worker
                navigator.serviceWorker
                    .register('/sw.js', { scope: '/' })
                    .then((registration) => {
                        console.log('Service Worker registration successful with scope: ', registration.scope);

                        // Check for updates immediately
                        registration.update();

                        // Check for updates
                        registration.addEventListener('updatefound', () => {
                            const newWorker = registration.installing;
                            if (newWorker) {
                                newWorker.addEventListener('statechange', () => {
                                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                        // New content is available, show update notification
                                        if (confirm('New version available! Reload to update?')) {
                                            window.location.reload();
                                        }
                                    }
                                });
                            }
                        });
                    })
                    .catch((error) => {
                        console.log('Service Worker registration failed: ', error);
                    });
            });

            // Handle service worker messages
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'SKIP_WAITING') {
                    window.location.reload();
                }
            });

            // Request notification permission for mobile
            if ('Notification' in window && Notification.permission === 'default') {
                // Only ask on mobile devices and after user interaction
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (isMobile) {
                    setTimeout(() => {
                        Notification.requestPermission().then((permission) => {
                            if (permission === 'granted') {
                                console.log('Notification permission granted');
                            }
                        });
                    }, 5000); // Ask after 5 seconds
                }
            }
        }
    }, []);

    return null;
};

export default PWAProvider;
