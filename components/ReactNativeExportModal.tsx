'use client';

import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Smartphone, Terminal } from 'lucide-react';
import { NATIVE_SCREEN_CODES } from '@/lib/nativeScreenCodes';

interface ReactNativeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export const ReactNativeExportModal: React.FC<ReactNativeExportModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'signin'
}) => {
  const [activeKey, setActiveKey] = useState<string>(initialTab);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentSnippet = NATIVE_SCREEN_CODES[activeKey] || NATIVE_SCREEN_CODES['signin'];

  const handleCopy = () => {
    if (currentSnippet?.code) {
      navigator.clipboard.writeText(currentSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-4xl max-h-[88vh] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                React Native & NativeWind Component Source
              </h3>
              <p className="text-[11px] text-slate-400">
                Pure React Native components with Tailwind CSS utility classes (NativeWind) & TypeScript
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-850 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 7 Screen Selector Tabs */}
        <div className="flex items-center gap-1.5 p-2 bg-slate-950/90 border-b border-slate-800 overflow-x-auto text-xs font-mono no-scrollbar">
          {Object.entries(NATIVE_SCREEN_CODES).map(([key, data]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveKey(key)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeKey === key
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{data.title}</span>
            </button>
          ))}
        </div>

        {/* Code Content View */}
        <div className="relative flex-1 overflow-auto p-4 bg-slate-950 font-mono text-xs text-slate-300">
          <div className="text-[11px] text-indigo-400 mb-2 font-mono flex items-center justify-between border-b border-slate-850 pb-2">
            <span>File: components/screens/{currentSnippet.filename}</span>
            <span className="text-slate-500">NativeWind / React Native</span>
          </div>
          <pre className="leading-relaxed">
            <code>{currentSnippet.code}</code>
          </pre>
        </div>

        {/* Modal Footer with Copy Button */}
        <div className="flex items-center justify-between p-3.5 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Install: npm install nativewind tailwindcss react-native-safe-area-context</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Component Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
