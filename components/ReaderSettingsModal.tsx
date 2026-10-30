'use client';

import React from 'react';
import { ReaderSettings } from '@/types/api';
import { Sun, Moon, Coffee, X } from 'lucide-react';

interface ReaderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
}

export const ReaderSettingsModal: React.FC<ReaderSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full sm:max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl text-slate-100 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-semibold text-slate-100">Reader Preferences</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Selector (Segmented Buttons) */}
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-2">
            Reading Theme
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => onUpdateSettings({ theme: 'dark' })}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                settings.theme === 'dark'
                  ? 'bg-slate-950 border-amber-400 text-amber-300 shadow-sm'
                  : 'bg-slate-850 border-slate-850 hover:border-slate-700 text-slate-300'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>Dark</span>
            </button>

            <button
              type="button"
              onClick={() => onUpdateSettings({ theme: 'sepia' })}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                settings.theme === 'sepia'
                  ? 'bg-[#f4ecd8] border-amber-600 text-[#433422] shadow-sm font-semibold'
                  : 'bg-[#ede5ce] border-transparent text-[#5c4a35] hover:opacity-90'
              }`}
            >
              <Coffee className="w-4 h-4 text-[#8b5a2b]" />
              <span>Sepia</span>
            </button>

            <button
              type="button"
              onClick={() => onUpdateSettings({ theme: 'light' })}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                settings.theme === 'light'
                  ? 'bg-white border-amber-400 text-slate-900 shadow-sm font-semibold'
                  : 'bg-slate-200 border-transparent text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Light</span>
            </button>
          </div>
        </div>

        {/* Typography Selection */}
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-2">
            Font Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onUpdateSettings({ fontFamily: 'serif' })}
              className={`py-2 px-3 rounded-xl text-xs font-serif font-medium border transition-all ${
                settings.fontFamily === 'serif'
                  ? 'bg-slate-800 border-amber-400 text-amber-300'
                  : 'bg-slate-850 border-slate-800 text-slate-300'
              }`}
            >
              Book Serif (Editorial)
            </button>

            <button
              type="button"
              onClick={() => onUpdateSettings({ fontFamily: 'sans' })}
              className={`py-2 px-3 rounded-xl text-xs font-sans font-medium border transition-all ${
                settings.fontFamily === 'sans'
                  ? 'bg-slate-800 border-amber-400 text-amber-300'
                  : 'bg-slate-850 border-slate-800 text-slate-300'
              }`}
            >
              Clean Sans (Modern)
            </button>
          </div>
        </div>

        {/* Font Size Selector */}
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-2">
            Font Size
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => onUpdateSettings({ fontSize: sz })}
                className={`py-2 rounded-xl text-xs font-medium border uppercase tracking-wider transition-all ${
                  settings.fontSize === sz
                    ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                    : 'bg-slate-850 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Brightness Slider */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Reading Surface Brightness</span>
            <span className="font-mono tabular-nums">{settings.brightness}%</span>
          </div>
          <input
            type="range"
            min={50}
            max={100}
            value={settings.brightness}
            onChange={(e) => onUpdateSettings({ brightness: parseInt(e.target.value, 10) })}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>

        {/* Done Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
        >
          Apply Preferences
        </button>
      </div>
    </div>
  );
};
