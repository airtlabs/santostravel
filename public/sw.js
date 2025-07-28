const CACHE_NAME = 'santos-travel-v2';
const urlsToCache = [
    '/',
    '/packages',
    '/bookings',
    '/signin',
    '/santos-logo.png',
    '/manifest.json',
    '/_next/static/css/',
    '/_next/static/js/'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    console.log('Service Worker installing');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache.filter(url => !url.includes('_next')));
            })
            .then(() => {
                // Force the waiting service worker to become the active service worker
                return self.skipWaiting();
            })
    );
});

// Listen for install trigger messages
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'TRIGGER_INSTALL') {
        console.log('Received install trigger from main thread');
        // Try to trigger beforeinstallprompt on clients
        event.ports[0]?.postMessage({ success: true });
    }
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Ensure the new service worker takes control immediately
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Push notification event
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New travel packages available!',
        icon: '/santos-logo.png',
        badge: '/santos-logo.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore Packages',
                icon: '/santos-logo.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/santos-logo.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Santos Travel', options)
    );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/packages')
        );
    } else {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
