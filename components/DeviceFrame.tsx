'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, Wifi, Battery, Signal } from 'lucide-react';

export type DeviceType = 'iphone' | 'pixel' | 'tablet' | 'fullscreen';

interface DeviceFrameProps {
  children: React.ReactNode;
  activeDevice: DeviceType;
  onChangeDevice: (device: DeviceType) => void;
  isSimulatedOffline?: boolean;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  activeDevice,
  onChangeDevice,
  isSimulatedOffline = false
}) => {
  const [timeString, setTimeString] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (activeDevice === 'fullscreen') {
    return <div className="w-full min-h-screen bg-slate-950">{children}</div>;
  }

  // Dimension constraints based on device type
  const frameWidthClass =
    activeDevice === 'iphone'
      ? 'w-[400px] h-[844px]'
      : activeDevice === 'pixel'
      ? 'w-[412px] h-[860px]'
      : 'w-[768px] h-[920px]';

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 sm:p-8 bg-slate-950">
      {/* Device Chassis Outer Frame */}
      <div
        className={`relative ${frameWidthClass} max-w-full rounded-[48px] p-3.5 bg-slate-900 border-[6px] border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden transition-all duration-300 ring-1 ring-slate-800/80`}
      >
        {/* Dynamic Island / Top Camera Notch */}
        <div className="relative z-40 flex items-center justify-between px-6 pt-2 pb-1 bg-slate-950 text-slate-100 text-xs shrink-0 select-none">
          {/* Time */}
          <span className="font-semibold text-[13px] tracking-tight">{timeString}</span>

          {/* Notch / Island */}
          {activeDevice === 'iphone' ? (
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end pr-2 gap-1 border border-slate-800/50">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
            </div>
          ) : (
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800 mx-auto" />
          )}

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3.5 h-3.5" />
            {isSimulatedOffline ? (
              <span className="text-[10px] text-amber-400 font-bold">OFF</span>
            ) : (
              <Wifi className="w-3.5 h-3.5" />
            )}
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Inner Screen Display (where the app runs) */}
        <div className="relative flex-1 flex flex-col bg-slate-950 rounded-[36px] overflow-hidden">
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="pt-2 pb-1 flex justify-center bg-slate-950 shrink-0">
          <div className="w-32 h-1 bg-slate-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};
