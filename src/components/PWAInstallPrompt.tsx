'use client';

import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [installError, setInstallError] = useState<string>('');
    const [canInstall, setCanInstall] = useState(false);

    useEffect(() => {
        // Check if it's iOS
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setIsIOS(iOS);

        // Check if it's Android
        const isAndroid = /Android/.test(navigator.userAgent);

        // Check if app is already installed (standalone mode)
        const standalone = window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;
        setIsStandalone(standalone);

        // Check if user already dismissed the prompt recently
        const dismissed = localStorage.getItem('pwa-dismissed');
        const dismissedTime = dismissed ? parseInt(dismissed) : 0;
        const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);

        // Listen for the beforeinstallprompt event
        const handleBeforeInstallPrompt = (e: Event) => {
            console.log('beforeinstallprompt event fired');
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setCanInstall(true);

            // Show install prompt after a shorter delay for better UX
            setTimeout(() => {
                if (daysSinceDismissed > 0.1) { // Show again after 2.4 hours for testing
                    setShowInstallPrompt(true);
                }
            }, 1000); // Show after 1 second for testing
        };

        // Also listen for custom install events
        const handleCustomInstall = () => {
            console.log('Custom install event triggered');
            setCanInstall(true);
            setShowInstallPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('custominstallprompt', handleCustomInstall);

        // Check for existing deferred prompt in case it was stored
        if ((window as any).deferredInstallPrompt) {
            console.log('Found existing deferred prompt');
            setDeferredPrompt((window as any).deferredInstallPrompt);
            setCanInstall(true);
        }

        // For iOS and Android, show manual install instructions more aggressively
        if ((iOS || isAndroid) && !standalone && daysSinceDismissed > 0.1) {
            setTimeout(() => {
                setShowInstallPrompt(true);
                // Always allow installation guidance, even without beforeinstallprompt
                setCanInstall(true);
            }, 1000);
        }

        // If no beforeinstallprompt after 3 seconds, still show install option
        setTimeout(() => {
            if (!deferredPrompt && !standalone && daysSinceDismissed > 0.1) {
                setShowInstallPrompt(true);
                setCanInstall(true); // Allow manual installation guidance
            }
        }, 3000);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('custominstallprompt', handleCustomInstall);
        };
    }, []);

    const handleInstallClick = async () => {
        console.log('Install button clicked', { deferredPrompt, canInstall, isIOS });
        setInstallError('');

        // First try the native installation if available
        if (deferredPrompt) {
            try {
                console.log('Attempting native installation...');
                await deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;

                console.log('Install prompt outcome:', outcome);

                if (outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                    setShowInstallPrompt(false);
                    // Clear the prompt so it doesn't show again
                    localStorage.setItem('pwa-installed', 'true');
                } else {
                    console.log('User dismissed the install prompt');
                    setInstallError('Installation cancelled. Try again or use manual installation.');
                }

                setDeferredPrompt(null);
                setCanInstall(false);
                return;
            } catch (error) {
                console.error('Error during native installation:', error);
                setInstallError('Native installation failed. Trying alternative method...');
            }
        }

        // If native installation fails or isn't available, try alternative methods
        console.log('Attempting alternative installation methods...');

        // For newer Android Chrome versions, try triggering install event
        if (!isIOS && 'BeforeInstallPromptEvent' in window) {
            try {
                // Try to trigger install through service worker message
                if ('serviceWorker' in navigator) {
                    const registration = await navigator.serviceWorker.ready;
                    registration.active?.postMessage({ type: 'TRIGGER_INSTALL' });
                }
            } catch (error) {
                console.log('Service worker install trigger failed:', error);
            }
        }

        // Fallback to manual instructions with better UX
        setTimeout(() => {
            if (isIOS) {
                const confirmed = confirm('📱 Install Santos Travel:\n\n1. Tap the Share button (↗️) below\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add"\n\nWould you like to proceed with manual installation?');
                if (confirmed) {
                    // Try to trigger iOS share sheet programmatically (limited support)
                    if (navigator.share) {
                        navigator.share({
                            title: 'Santos Travel',
                            text: 'Install Santos Travel App',
                            url: window.location.href
                        }).catch(console.log);
                    }
                }
            } else {
                const isChrome = /Chrome/.test(navigator.userAgent);
                if (isChrome) {
                    const confirmed = confirm('📱 Install Santos Travel:\n\n1. Tap the menu (⋮) in Chrome\n2. Select "Add to Home screen"\n3. Tap "Install"\n\nWould you like me to help you find the menu?');
                    if (confirmed) {
                        setInstallError('Look for the menu (⋮) in your browser and select "Add to Home screen"');
                    }
                } else {
                    alert('📱 For automatic installation:\n\n• Use Chrome on Android\n• Use Safari on iPhone\n• Make sure you\'re on HTTPS\n\nThen try the install button again!');
                }
            }
        }, 500);
    };

    const handleDismiss = () => {
        setShowInstallPrompt(false);
        // Store dismissal timestamp instead of just a flag
        localStorage.setItem('pwa-dismissed', Date.now().toString());
    };

    // Don't show if already installed or dismissed
    if (isStandalone || !showInstallPrompt) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 animate-slide-up">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                            <Download className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Install Santos Travel</h3>
                            <p className="text-xs text-gray-600">
                                {deferredPrompt ? '⚡ Auto-install ready' : 'Get the full app experience'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="text-gray-400 hover:text-gray-600 p-1"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {isIOS ? (
                    // iOS installation instructions
                    <div className="space-y-3">
                        <p className="text-sm text-gray-700">
                            Install this app on your iPhone:
                        </p>
                        <div className="space-y-2 text-xs text-gray-600">
                            <div className="flex items-center">
                                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">1</span>
                                Tap the Share button in Safari
                            </div>
                            <div className="flex items-center">
                                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">2</span>
                                Scroll down and tap &quot;Add to Home Screen&quot;
                            </div>
                            <div className="flex items-center">
                                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">3</span>
                                Tap &quot;Add&quot; in the top right corner
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={handleDismiss}
                                className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Maybe Later
                            </button>
                        </div>
                    </div>
                ) : (
                    // Android/Desktop installation
                    <div className="space-y-3">
                        <p className="text-sm text-gray-700">
                            ✨ Enjoy faster access, offline browsing, and push notifications
                        </p>
                        <div className="flex items-center text-xs text-gray-600 space-x-4">
                            <div className="flex items-center">
                                <Smartphone className="h-4 w-4 mr-1" />
                                Works on mobile
                            </div>
                            <div className="flex items-center">
                                <Monitor className="h-4 w-4 mr-1" />
                                Works on desktop
                            </div>
                        </div>

                        {installError && (
                            <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                                {installError}
                            </div>
                        )}

                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={handleDismiss}
                                className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Not Now
                            </button>
                            <button
                                onClick={handleInstallClick}
                                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center"
                            >
                                <Download className="h-4 w-4 mr-1" />
                                {deferredPrompt ? 'Install Now' : 'Install App'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PWAInstallPrompt;
