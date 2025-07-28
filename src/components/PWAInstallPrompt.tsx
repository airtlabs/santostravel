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

    // Check if app is already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show install prompt after a delay if not dismissed before
      setTimeout(() => {
        if (!localStorage.getItem('pwa-dismissed')) {
          setShowInstallPrompt(true);
        }
      }, 3000); // Show after 3 seconds
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, show manual install instructions
    if (iOS && !standalone && !localStorage.getItem('pwa-dismissed')) {
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
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
    localStorage.setItem('pwa-dismissed', 'true');
    
    // Clear the dismissal after 7 days
    setTimeout(() => {
      localStorage.removeItem('pwa-dismissed');
    }, 7 * 24 * 60 * 60 * 1000);
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
