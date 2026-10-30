'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Book, Chapter, ReaderSettings } from '@/types/api';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  HardDrive,
  Cloud
} from 'lucide-react';

interface PdfViewerProps {
  book: Book;
  activeChapter: Chapter;
  currentPage: number;
  totalPages: number;
  isCached: boolean;
  settings: ReaderSettings;
  bookmarks: number[];
  onPageChange: (newPage: number) => void;
  onToggleBookmark: (page: number) => void;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  book,
  activeChapter,
  currentPage,
  totalPages,
  isCached,
  settings,
  bookmarks,
  onPageChange,
  onToggleBookmark
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isJumpOpen, setIsJumpOpen] = useState<boolean>(false);
  const [jumpPageInput, setJumpPageInput] = useState<string>(String(currentPage));
  const containerRef = useRef<HTMLDivElement>(null);

  const [prevPage, setPrevPage] = useState<number>(currentPage);
  if (currentPage !== prevPage) {
    setPrevPage(currentPage);
    setJumpPageInput(String(currentPage));
  }

  // Keep page within valid chapter bounds or total pages
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setIsJumpOpen(false);
    }
  };

  // Touch swipe handling for mobile reading
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;

    // Minimum swipe threshold of 50px
    if (diff > 50) {
      handlePrevPage();
    } else if (diff < -50) {
      handleNextPage();
    }
    setTouchStartX(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (currentPage > 1) onPageChange(currentPage - 1);
      }
      if (e.key === 'ArrowRight') {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, onPageChange]);

  // Check if current page has specific rich page mock data or generic editorial text
  const currentChapterPageData = activeChapter.pages?.find(
    (p) => p.pageNumber === currentPage
  );

  // Theme style classes
  const isDark = settings.theme === 'dark';
  const isSepia = settings.theme === 'sepia';

  const readerBgColor = isDark
    ? 'bg-slate-950 text-slate-100'
    : isSepia
    ? 'bg-[#fcf8ed] text-[#332517]'
    : 'bg-white text-slate-900';

  const paperSheetBg = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-200'
    : isSepia
    ? 'bg-[#f5eedc] border-[#e2d5bd] text-[#2c1d0e]'
    : 'bg-slate-50 border-slate-200 text-slate-800';

  const fontClass =
    settings.fontFamily === 'serif'
      ? 'font-serif'
      : 'font-sans';

  const fontSizeClass =
    settings.fontSize === 'sm'
      ? 'text-sm'
      : settings.fontSize === 'lg'
      ? 'text-lg'
      : settings.fontSize === 'xl'
      ? 'text-xl'
      : 'text-base';

  const lineSpacingClass =
    settings.lineSpacing === 'tight'
      ? 'leading-relaxed'
      : settings.lineSpacing === 'relaxed'
      ? 'leading-loose'
      : 'leading-normal';

  const isCurrentPageBookmarked = bookmarks.includes(currentPage);

  // Calculate chapter relative progress
  const chapterPageSpan = Math.max(1, activeChapter.endPage - activeChapter.startPage + 1);
  const chapterRelativePage = Math.max(1, currentPage - activeChapter.startPage + 1);
  const chapterPercent = Math.min(
    100,
    Math.round((chapterRelativePage / chapterPageSpan) * 100)
  );

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative flex flex-col flex-1 h-full select-text transition-colors duration-200 overflow-hidden ${readerBgColor}`}
      style={{
        filter: `brightness(${settings.brightness}%)`
      }}
    >
      {/* Top Document Header Ribbon */}
      <div className="flex items-center justify-between px-4 py-2 text-xs border-b border-inherit/40 opacity-80 shrink-0">
        <div className="flex items-center gap-2 truncate">
          {isCached ? (
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <HardDrive className="w-3.5 h-3.5" />
              <span>Offline Cache</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-slate-400">
              <Cloud className="w-3.5 h-3.5" />
              <span>Remote Stream</span>
            </span>
          )}
          <span aria-hidden="true">·</span>
          <span className="font-semibold truncate">{activeChapter.title}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="tabular-nums font-mono text-[11px]">
            {chapterRelativePage}/{chapterPageSpan} ({chapterPercent}%)
          </span>
        </div>
      </div>

      {/* Main Reading Viewport with PDF Layout Simulation */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 flex justify-center items-start">
        <div
          className={`w-full max-w-2xl min-h-[580px] p-6 sm:p-10 rounded-2xl border shadow-sm transition-all duration-200 flex flex-col justify-between ${paperSheetBg} ${fontClass}`}
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center'
          }}
        >
          {/* Page Top Header */}
          <div className="flex items-center justify-between pb-4 border-b border-inherit/30 text-xs opacity-60">
            <span className="truncate max-w-[200px]">{book.title}</span>
            <span className="tabular-nums font-mono">Page {currentPage}</span>
          </div>

          {/* Page Body Content */}
          <div className={`py-6 space-y-5 ${fontSizeClass} ${lineSpacingClass}`}>
            {currentChapterPageData ? (
              <>
                {currentChapterPageData.heading && (
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">
                    {currentChapterPageData.heading}
                  </h3>
                )}

                {currentChapterPageData.paragraphs.map((para, i) => (
                  <p key={i} className="text-justify indent-4 leading-relaxed">
                    {para}
                  </p>
                ))}

                {currentChapterPageData.callout && (
                  <div
                    className={`my-6 p-4 rounded-xl border text-sm italic ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-amber-200/90'
                        : isSepia
                        ? 'bg-[#ece3cf] border-[#d8cca8] text-[#3d2a15]'
                        : 'bg-amber-50 border-amber-200/70 text-amber-950'
                    }`}
                  >
                    &ldquo;{currentChapterPageData.callout}&rdquo;
                  </div>
                )}

                {currentChapterPageData.keyTakeaways && (
                  <div className="mt-6 pt-4 border-t border-inherit/30 text-xs sm:text-sm">
                    <span className="font-semibold block mb-2 opacity-80 uppercase tracking-wider text-[11px]">
                      Chapter Points:
                    </span>
                    <ul className="space-y-1.5 list-disc list-inside opacity-90">
                      {currentChapterPageData.keyTakeaways.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              /* Realistic Chapter Content for pages beyond initial rich breakdown */
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs uppercase tracking-widest font-bold opacity-60">
                    {activeChapter.title}
                  </span>
                </div>

                <p className="indent-6 leading-relaxed">
                  The principles and strategies formulated within this chapter represent enduring
                  structural disciplines observed across decades of human inquiry. As the discourse
                  unfolds between pages {activeChapter.startPage} and {activeChapter.endPage}, each
                  successive proposition reinforces the fundamental axioms established at the outset.
                </p>

                <p className="indent-6 leading-relaxed">
                  When dealing with intricate systemic dependencies, the boundary crossings between
                  conceptual domains must remain explicit. Every abstraction should encapsulate a
                  single coherent policy, shielding the broader architecture from transient external
                  disturbances and technical volatility.
                </p>

                <div
                  className={`p-4 rounded-xl border my-4 text-xs sm:text-sm leading-relaxed ${
                    isDark
                      ? 'bg-slate-850 border-slate-700/60'
                      : isSepia
                      ? 'bg-[#ece3ce] border-[#ded0b1]'
                      : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <p className="font-semibold mb-1">
                    Analytical Note (Page {currentPage}):
                  </p>
                  <p className="opacity-90">
                    &ldquo;The true measure of structural mastery is not merely whether a construct
                    operates under optimal conditions, but whether it withstands unexpected stress,
                    isolated partitions, and rapid shifts in operational demands.&rdquo;
                  </p>
                </div>

                <p className="indent-6 leading-relaxed">
                  Observation and telemetry gathered from long-running implementations consistently
                  indicate that modular boundaries, once breached for temporary convenience, are
                  infinitely harder to restore later. Therefore, maintaining strict encapsulation at
                  every crossing remains the supreme imperative.
                </p>
              </div>
            )}
          </div>

          {/* Page Bottom Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-inherit/30 text-xs opacity-60">
            <span>{activeChapter.subtitle || activeChapter.title}</span>
            <div className="flex items-center gap-3">
              {isCurrentPageBookmarked && (
                <span className="flex items-center gap-1 text-amber-500 font-medium">
                  <Bookmark className="w-3.5 h-3.5 fill-amber-500" />
                  <span>Bookmarked</span>
                </span>
              )}
              <span className="tabular-nums font-mono">
                {currentPage} / {totalPages}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Reader Navigation Bar */}
      <footer className="sticky bottom-0 z-20 flex items-center justify-between px-3 py-2 border-t border-inherit/40 bg-inherit/95 backdrop-blur-md">
        {/* Previous Page Button (Ergonomic Touch Hitbox >= 44px) */}
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-800/20 hover:bg-slate-800/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Center: Interactive Page Scrubber & Quick Jump Modal */}
        <div className="flex items-center gap-2">
          {isJumpOpen ? (
            <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5">
              <input
                type="number"
                min={1}
                max={totalPages}
                value={jumpPageInput}
                onChange={(e) => setJumpPageInput(e.target.value)}
                autoFocus
                className="w-16 px-2 py-1 text-xs text-center font-mono rounded-lg border border-amber-400 bg-slate-900 text-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-2.5 py-1 text-xs font-semibold bg-amber-400 text-slate-950 rounded-lg"
              >
                Go
              </button>
              <button
                type="button"
                onClick={() => setIsJumpOpen(false)}
                className="px-2 py-1 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsJumpOpen(true)}
              className="px-3 py-1.5 rounded-xl hover:bg-slate-800/20 transition-colors flex items-center gap-1.5 text-xs font-mono tabular-nums"
              title="Click to jump to page"
            >
              <span className="font-semibold">{currentPage}</span>
              <span className="opacity-50">/</span>
              <span className="opacity-70">{totalPages}</span>
            </button>
          )}

          {/* Quick Zoom Controls */}
          <div className="hidden sm:flex items-center gap-1 ml-2 border-l border-inherit/30 pl-2">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
              aria-label="Zoom out"
              className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg hover:bg-slate-800/20 text-xs"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono tabular-nums opacity-60 w-9 text-center">
              {zoomLevel}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
              aria-label="Zoom in"
              className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg hover:bg-slate-800/20 text-xs"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Next Page Button */}
        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-800/20 hover:bg-slate-800/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
};
