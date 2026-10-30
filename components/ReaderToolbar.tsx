'use client';

import React from 'react';
import { SyncState } from '@/hooks/useProgressSync';
import { ReaderSettings } from '@/types/api';
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Settings2,
  List,
  CloudCheck,
  CloudUpload,
  CloudOff,
  Wifi,
  WifiOff
} from 'lucide-react';

interface ReaderToolbarProps {
  bookTitle: string;
  chapterTitle: string;
  currentPage: number;
  totalPages: number;
  isBookmarked: boolean;
  syncState: SyncState;
  queuedCount: number;
  lastSyncedText: string;
  isSimulatedOffline: boolean;
  onToggleOffline: () => void;
  onToggleBookmark: () => void;
  onToggleToc: () => void;
  onToggleSettings: () => void;
  onBack: () => void;
  settings: ReaderSettings;
}

export const ReaderToolbar: React.FC<ReaderToolbarProps> = ({
  bookTitle,
  chapterTitle,
  currentPage,
  totalPages,
  isBookmarked,
  syncState,
  queuedCount,
  lastSyncedText,
  isSimulatedOffline,
  onToggleOffline,
  onToggleBookmark,
  onToggleToc,
  onToggleSettings,
  onBack,
  settings
}) => {
  // Theme-aware toolbar styling
  const isDark = settings.theme === 'dark';
  const isSepia = settings.theme === 'sepia';

  const bgClass = isDark
    ? 'bg-slate-900/90 text-slate-100 border-slate-800'
    : isSepia
    ? 'bg-[#f4ecd8]/95 text-[#433422] border-[#e2d5bd]'
    : 'bg-white/95 text-slate-800 border-slate-200';

  const buttonHoverClass = isDark
    ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
    : isSepia
    ? 'hover:bg-[#e7dcbf] text-[#5e4b33] hover:text-[#2d2215]'
    : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900';

  return (
    <header className={`sticky top-0 z-30 flex items-center justify-between px-3 py-2.5 border-b backdrop-blur-md shadow-sm transition-colors duration-200 ${bgClass}`}>
      {/* Left Slot: Back + TOC */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to library"
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors ${buttonHoverClass}`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={onToggleToc}
          aria-label="Table of Contents"
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors ${buttonHoverClass}`}
          title="Chapters & TOC"
        >
          <List className="w-5 h-5" />
        </button>
      </div>

      {/* Center Slot: Book & Chapter Info + Real-Time Sync Badge */}
      <div className="flex flex-col items-center justify-center min-w-0 px-2 text-center">
        <div className="flex items-center gap-1.5 max-w-[200px] sm:max-w-xs md:max-w-md truncate">
          <span className="text-xs sm:text-sm font-semibold truncate">
            {chapterTitle || bookTitle}
          </span>
        </div>

        {/* Sync Status Badge (Strictly informative, no garish slop) */}
        <div className="flex items-center gap-1 text-[11px] opacity-80 mt-0.5">
          {syncState === 'syncing' ? (
            <span className="flex items-center gap-1 text-amber-500 font-medium">
              <CloudUpload className="w-3 h-3 animate-pulse" />
              <span>Syncing page {currentPage}...</span>
            </span>
          ) : syncState === 'offline' || isSimulatedOffline ? (
            <span className="flex items-center gap-1 text-slate-400 font-medium">
              <CloudOff className="w-3 h-3 text-slate-400" />
              <span>Offline {queuedCount > 0 ? `(${queuedCount} queued)` : ''}</span>
            </span>
          ) : syncState === 'queued' ? (
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <CloudUpload className="w-3 h-3" />
              <span>{queuedCount} changes queued</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-500 font-medium">
              <CloudCheck className="w-3 h-3" />
              <span>Synced</span>
            </span>
          )}

          <span aria-hidden="true">·</span>
          <span className="tabular-nums font-mono text-[10px]">
            p. {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Right Slot: Actions (Simulate Offline toggle, Bookmark, Settings) */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Offline simulator switch for instant QA */}
        <button
          type="button"
          onClick={onToggleOffline}
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors ${
            isSimulatedOffline
              ? 'text-amber-400 bg-amber-400/10'
              : buttonHoverClass
          }`}
          title={isSimulatedOffline ? 'Simulating Offline: Tap to go Online' : 'Network Online: Tap to simulate Offline'}
          aria-label="Toggle network state"
        >
          {isSimulatedOffline ? (
            <WifiOff className="w-4 h-4" />
          ) : (
            <Wifi className="w-4 h-4 opacity-75" />
          )}
        </button>

        {/* Bookmark Trigger */}
        <button
          type="button"
          onClick={onToggleBookmark}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this page'}
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors ${
            isBookmarked
              ? 'text-amber-500 bg-amber-500/10'
              : buttonHoverClass
          }`}
          title={isBookmarked ? 'Page bookmarked' : 'Add bookmark'}
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-5 h-5 fill-amber-500" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>

        {/* Reader Customizations / Settings Modal */}
        <button
          type="button"
          onClick={onToggleSettings}
          aria-label="Reader customizations"
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors ${buttonHoverClass}`}
          title="Reader preferences"
        >
          <Settings2 className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
