'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Smartphone, X, Check } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallButton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'footer' }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (typeof window !== 'undefined') {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (isStandalone) {
        setIsInstalled(true);
        return;
      }
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Show manual instructions for iOS/Safari
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Install prompt error:', error);
    }
  };

  // Already installed state
  if (isInstalled) {
    if (variant === 'footer') {
      return (
        <span className="text-beige/60 text-sm flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          App Installed
        </span>
      );
    }
    return null;
  }

  // Footer variant
  if (variant === 'footer') {
    return (
      <div className="relative">
        <motion.button
          onClick={handleInstallClick}
          className="flex items-center gap-2 text-beige/70 hover:text-cherry transition-colors text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-4 h-4" />
          <span>Install App</span>
        </motion.button>

        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-navy-light rounded-lg shadow-xl border border-beige/10 text-xs text-beige/80"
            >
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute top-2 right-2 text-beige/40 hover:text-beige"
              >
                <X className="w-3 h-3" />
              </button>
              <p className="font-medium mb-1 text-beige">Install on iOS/Safari:</p>
              <p>Tap the Share button, then "Add to Home Screen"</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <motion.button
        onClick={handleInstallClick}
        className="p-2 rounded-full bg-cherry/10 text-cherry hover:bg-cherry hover:text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Install App"
      >
        <Download className="w-5 h-5" />
      </motion.button>
    );
  }

  // Default variant - Full button
  return (
    <div className="relative inline-block">
      <motion.button
        onClick={handleInstallClick}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cherry to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Smartphone className="w-5 h-5" />
        <span>Install App</span>
        <Download className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 p-4 bg-navy rounded-xl shadow-2xl border border-beige/10 text-sm text-beige/80 z-50"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-beige/40 hover:text-beige"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cherry/20">
                <Smartphone className="w-5 h-5 text-cherry" />
              </div>
              <div>
                <p className="font-medium mb-1 text-beige">Install on iOS/Safari</p>
                <p className="text-beige/70 text-xs leading-relaxed">
                  Tap the <span className="font-medium">Share</span> button in your browser, then select{' '}
                  <span className="font-medium">"Add to Home Screen"</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PWAInstallButton;
