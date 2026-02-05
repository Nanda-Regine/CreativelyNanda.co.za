'use client';

import { useState, useEffect } from 'react';

interface DeviceInfo {
  isTouchDevice: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  prefersReducedMotion: boolean;
  supportsGyroscope: boolean;
  isLowPowerMode: boolean;
  isStandalone: boolean; // PWA installed
}

export function useDeviceDetect(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isTouchDevice: false,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    prefersReducedMotion: false,
    supportsGyroscope: false,
    isLowPowerMode: false,
    isStandalone: false,
  });

  useEffect(() => {
    const checkDevice = () => {
      // Touch detection
      const isTouchDevice =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore - msMaxTouchPoints for older IE
        navigator.msMaxTouchPoints > 0;

      // Screen size detection
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      // Reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // Gyroscope support check
      const supportsGyroscope = 'DeviceOrientationEvent' in window;

      // PWA standalone mode detection
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        // @ts-ignore - iOS Safari specific
        window.navigator.standalone === true;

      // Low power/battery saver mode (heuristic)
      // Note: No direct API, but we can infer from reduced motion + mobile
      const isLowPowerMode = prefersReducedMotion && isMobile;

      setDeviceInfo({
        isTouchDevice,
        isMobile,
        isTablet,
        isDesktop,
        prefersReducedMotion,
        supportsGyroscope,
        isLowPowerMode,
        isStandalone,
      });
    };

    checkDevice();

    // Listen for orientation/resize changes
    window.addEventListener('resize', checkDevice);

    // Listen for reduced motion changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      motionQuery.removeEventListener('change', checkDevice);
    };
  }, []);

  return deviceInfo;
}

// Lightweight hook for just reduced motion
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

// Hook for touch device detection only
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );
  }, []);

  return isTouch;
}

// Check if running as installed PWA
export function useIsPWA(): boolean {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    setIsPWA(
      window.matchMedia('(display-mode: standalone)').matches ||
      // @ts-ignore
      window.navigator.standalone === true
    );
  }, []);

  return isPWA;
}

export default useDeviceDetect;
