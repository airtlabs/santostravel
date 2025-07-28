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
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show install prompt after a shorter delay for better UX
      setTimeout(() => {
        if (daysSinceDismissed > 1) { // Show again after 1 day instead of 7
          setShowInstallPrompt(true);
        }
      }, 2000); // Show after 2 seconds instead of 3
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS and Android, show manual install instructions more aggressively
    if ((iOS || isAndroid) && !standalone && daysSinceDismissed > 1) {
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 2000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
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
              <p className="text-xs text-gray-600">Get the full app experience</p>
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
                Install App
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
