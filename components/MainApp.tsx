'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useBooks, useBookDetails } from '@/hooks/useBooks';
import { useChapters } from '@/hooks/useChapters';
import { useProgressSync } from '@/hooks/useProgressSync';
import { fileCache } from '@/services/fileCache';
import { Book, Chapter, ReaderSettings } from '@/types/api';
import { DocumentCard } from '@/components/DocumentCard';
import { ChapterList } from '@/components/ChapterList';
import { PdfViewer } from '@/components/PdfViewer';
import { ReaderToolbar } from '@/components/ReaderToolbar';
import { ReaderSettingsModal } from '@/components/ReaderSettingsModal';
import { DeviceFrame, DeviceType } from '@/components/DeviceFrame';
import { ReactNativeExportModal } from '@/components/ReactNativeExportModal';

import {
  BookOpen,
  Search,
  RefreshCw,
  SlidersHorizontal,
  Bookmark,
  HardDrive,
  CloudOff,
  CloudCheck,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Smartphone,
  Tablet,
  Monitor,
  ArrowLeft,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  Wifi,
  WifiOff
} from 'lucide-react';

export default function MainApp() {
  // Navigation State
  const [currentView, setCurrentView] = useState<'library' | 'details' | 'reader' | 'settings'>('library');
  const [activeBookId, setActiveBookId] = useState<string>('book-clean-arch');
  const [activeChapterId, setActiveChapterId] = useState<string>('ca-ch-1');
  const [activePage, setActivePage] = useState<number>(1);

  // Device Frame State
  const [deviceType, setDeviceType] = useState<DeviceType>('iphone');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modals & Drawers State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTocDrawerOpen, setIsTocDrawerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Storage Stats State
  const [storageStats, setStorageStats] = useState<{ totalBytes: number; count: number }>({
    totalBytes: 0,
    count: 0
  });

  // Reader Customization Preferences
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>({
    theme: 'dark',
    fontSize: 'base',
    fontFamily: 'serif',
    lineSpacing: 'normal',
    brightness: 100,
    continuousScroll: false,
    pageTransition: 'slide'
  });

  // Queries & Mutations
  const {
    data: books,
    isLoading: isBooksLoading,
    refetch: refetchBooks,
    isRefetching
  } = useBooks({
    search: searchQuery,
    category: selectedCategory === 'All' ? undefined : selectedCategory
  });

  const { data: bookDetails } = useBookDetails(activeBookId);
  const { data: chapters = [] } = useChapters(activeBookId);

  // Progress sync hook with debounced auto-sync & offline queueing
  const {
    userProgress,
    currentBookRecord,
    syncState,
    queuedCount,
    lastSyncedText,
    isSimulatedOffline,
    toggleOfflineMode,
    updateProgress,
    flushOfflineQueue
  } = useProgressSync(activeBookId);

  // Refresh storage usage on mount
  const refreshStorageInfo = React.useCallback(async () => {
    const usage = await fileCache.getStorageUsage();
    setStorageStats(usage);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    fileCache.getStorageUsage().then((usage) => {
      if (!isCancelled) {
        setStorageStats(usage);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [currentView]);

  // Find active book & chapter objects
  const activeBook = books?.find((b) => b.id === activeBookId) || bookDetails || books?.[0];
  const activeChapter =
    chapters.find((c) => c.id === activeChapterId) ||
    chapters[0] || {
      id: 'default',
      bookId: activeBookId,
      chapterIndex: 1,
      title: 'Chapter 1',
      startPage: 1,
      endPage: 25,
      estimatedReadTimeMinutes: 15,
      pagesCount: 25
    };

  // Switch book and resume last-read position
  const handleOpenBookDetails = (book: Book) => {
    setActiveBookId(book.id);
    const existingProgress = userProgress?.bookProgress[book.id];
    if (existingProgress) {
      setActiveChapterId(existingProgress.currentChapterId);
      setActivePage(existingProgress.currentPage);
    } else {
      setActiveChapterId(book.chapters?.[0]?.id || 'ch-1');
      setActivePage(1);
    }
    setCurrentView('details');
  };

  const handleOpenReader = (book: Book, chapter?: Chapter, page?: number) => {
    setActiveBookId(book.id);
    if (chapter) {
      setActiveChapterId(chapter.id);
      setActivePage(page !== undefined ? page : chapter.startPage);
    } else {
      const existingProgress = userProgress?.bookProgress[book.id];
      if (existingProgress) {
        setActiveChapterId(existingProgress.currentChapterId);
        setActivePage(existingProgress.currentPage);
      } else {
        const firstCh = book.chapters?.[0];
        setActiveChapterId(firstCh?.id || 'ch-1');
        setActivePage(firstCh?.startPage || 1);
      }
    }
    setCurrentView('reader');
  };

  // Page navigation within reader with debounced progress sync
  const handlePageChange = (newPage: number) => {
    setActivePage(newPage);

    // Auto-detect chapter containing this page if outside active chapter range
    if (newPage < activeChapter.startPage || newPage > activeChapter.endPage) {
      const matchedChapter = chapters.find(
        (c) => newPage >= c.startPage && newPage <= c.endPage
      );
      if (matchedChapter) {
        setActiveChapterId(matchedChapter.id);
      }
    }

    if (activeBook) {
      const percent = Math.min(100, Math.round((newPage / activeBook.totalPages) * 100));
      updateProgress({
        bookId: activeBook.id,
        chapterId: activeChapter.id,
        page: newPage,
        percentCompleted: percent,
        bookmarks: currentBookRecord?.bookmarks || []
      });
    }
  };

  // Toggle bookmark on active page
  const handleToggleBookmark = () => {
    if (!activeBook) return;
    const currentBookmarks = currentBookRecord?.bookmarks || [];
    const isBookmarked = currentBookmarks.includes(activePage);
    const updatedBookmarks = isBookmarked
      ? currentBookmarks.filter((p) => p !== activePage)
      : [...currentBookmarks, activePage].sort((a, b) => a - b);

    const percent = Math.min(100, Math.round((activePage / activeBook.totalPages) * 100));
    updateProgress({
      bookId: activeBook.id,
      chapterId: activeChapter.id,
      page: activePage,
      percentCompleted: percent,
      bookmarks: updatedBookmarks
    });
  };

  // Format bytes helper
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 MB';
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const categories = ['All', 'Engineering', 'Classics', 'Philosophy', 'Literature'];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* ========================================================
          TOP BAR CONTRACT (Anti-Slop Strict 3-Zone Architecture)
          Zone 1: Brand title wordmark (1 text element, whitespace-nowrap)
          Zone 2: 4-5 concise single-line nav links
          Zone 3: 1 primary action button
          ======================================================== */}
      <header className="flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-100 whitespace-nowrap">
            ChapterFlow
          </span>
        </div>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            type="button"
            onClick={() => setCurrentView('library')}
            className={`whitespace-nowrap transition-colors ${
              currentView === 'library' ? 'text-amber-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Library
          </button>
          <button
            type="button"
            onClick={() => {
              if (activeBook) handleOpenReader(activeBook);
              else setCurrentView('library');
            }}
            className={`whitespace-nowrap transition-colors ${
              currentView === 'reader' ? 'text-amber-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Reader
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('settings')}
            className={`whitespace-nowrap transition-colors ${
              currentView === 'settings' ? 'text-amber-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Offline Storage
          </button>
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="whitespace-nowrap transition-colors hover:text-amber-300"
          >
            Expo Native Code
          </button>
        </nav>

        {/* Zone 3: 1 primary action (Device Viewport Switcher & Simulator) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setDeviceType('iphone')}
              aria-label="iPhone 16 Pro View"
              className={`p-1.5 rounded-lg transition-colors ${
                deviceType === 'iphone'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="iPhone Viewport (393px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceType('pixel')}
              aria-label="Google Pixel View"
              className={`p-1.5 rounded-lg transition-colors ${
                deviceType === 'pixel'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Google Pixel Viewport (412px)"
            >
              <Smartphone className="w-4 h-4 rotate-90" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceType('tablet')}
              aria-label="Tablet View"
              className={`p-1.5 rounded-lg transition-colors ${
                deviceType === 'tablet'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet Viewport (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceType('fullscreen')}
              aria-label="Desktop Fullscreen"
              className={`p-1.5 rounded-lg transition-colors ${
                deviceType === 'fullscreen'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop Fullscreen Canvas"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
          >
            <span>Expo Code</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Application Container wrapped in Device Frame */}
      <main className="flex-1 flex flex-col">
        <DeviceFrame
          activeDevice={deviceType}
          onChangeDevice={setDeviceType}
          isSimulatedOffline={isSimulatedOffline}
        >
          {/* ========================================================
              VIEW 1: REMOTE LIBRARY SCREEN (app/index.tsx)
              ======================================================== */}
          {currentView === 'library' && (
            <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto">
              {/* Library Hero & Search Bar */}
              <div className="p-4 sm:p-5 border-b border-slate-900 bg-gradient-to-b from-slate-900/90 to-slate-950">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
                      ChapterFlow Library
                    </h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Stream, cache & read PDF books by chapter
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => refetchBooks()}
                    disabled={isRefetching}
                    className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Pull to refresh library"
                    aria-label="Refresh library"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {/* Search Bar Trigger */}
                <div className="relative mb-3">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, author, or keyword..."
                    className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-900/90 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/80 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Category Segmented Tabs (Functional Buttons) */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                        selectedCategory === cat
                          ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Continue Reading Spotlight Card */}
              {userProgress?.lastReadBookId && activeBook && (
                <div className="px-4 py-3 bg-slate-900/40 border-b border-slate-900">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      Continue Reading
                    </span>
                    <span className="text-[11px] tabular-nums">
                      {userProgress.percentCompleted}% Completed
                    </span>
                  </div>

                  <div
                    onClick={() => handleOpenReader(activeBook)}
                    className="flex items-center gap-3 p-3 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 rounded-xl cursor-pointer transition-all active:scale-[0.99]"
                  >
                    <div className="relative w-12 h-16 rounded-md overflow-hidden bg-slate-950 shrink-0">
                      {activeBook.coverUrl && (
                        <Image
                          src={activeBook.coverUrl}
                          alt={activeBook.title}
                          fill
                          sizes="60px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-100 truncate">
                        {activeBook.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        Current: Page {userProgress.lastReadPage} of {activeBook.totalPages}
                      </p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${userProgress.percentCompleted}%` }}
                        />
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                  </div>
                </div>
              )}

              {/* Document List */}
              <div className="flex-1 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>Available Documents</span>
                  <span className="tabular-nums">{books?.length || 0} books</span>
                </div>

                {isBooksLoading ? (
                  <div className="space-y-3 py-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-32 bg-slate-900/60 rounded-2xl animate-pulse border border-slate-800"
                      />
                    ))}
                  </div>
                ) : (books || []).length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500 bg-slate-900/30 rounded-2xl border border-slate-900">
                    No books found matching &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  (books || []).map((book) => {
                    const prog = userProgress?.bookProgress[book.id]?.percent || 0;
                    return (
                      <DocumentCard
                        key={book.id}
                        book={book}
                        currentProgressPercent={prog}
                        onOpenDetails={handleOpenBookDetails}
                        onOpenReader={handleOpenReader}
                        onCacheUpdated={() => {
                          refetchBooks();
                          refreshStorageInfo();
                        }}
                      />
                    );
                  })
                )}
              </div>

              {/* Fixed Bottom Tab Navigation Bar */}
              <nav className="sticky bottom-0 z-30 grid grid-cols-3 items-center h-16 bg-slate-900/95 border-t border-slate-800/80 backdrop-blur-md px-4">
                <button
                  type="button"
                  onClick={() => setCurrentView('library')}
                  className="flex flex-col items-center justify-center text-amber-400 font-semibold"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-[10px] mt-1">Library</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (activeBook) handleOpenReader(activeBook);
                  }}
                  className="flex flex-col items-center justify-center text-slate-400 hover:text-slate-200"
                >
                  <Bookmark className="w-5 h-5" />
                  <span className="text-[10px] mt-1">Reader</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentView('settings')}
                  className="flex flex-col items-center justify-center text-slate-400 hover:text-slate-200"
                >
                  <HardDrive className="w-5 h-5" />
                  <span className="text-[10px] mt-1">Storage</span>
                </button>
              </nav>
            </div>
          )}

          {/* ========================================================
              VIEW 2: BOOK DETAILS & CHAPTER BREAKDOWN (app/details/[id].tsx)
              ======================================================== */}
          {currentView === 'details' && activeBook && (
            <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto">
              {/* Top Navigation */}
              <div className="sticky top-0 z-30 flex items-center justify-between p-3 bg-slate-950/90 border-b border-slate-800 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setCurrentView('library')}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-semibold text-slate-300 truncate max-w-[220px]">
                  Book Overview
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenReader(activeBook)}
                  className="px-3 py-1.5 text-xs font-semibold bg-amber-400 text-slate-950 rounded-xl active:scale-95 transition-all"
                >
                  Read
                </button>
              </div>

              {/* Book Header Card */}
              <div className="p-4 sm:p-6 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
                  {/* Cover */}
                  <div className="relative w-32 h-44 rounded-xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800 shrink-0">
                    {activeBook.coverUrl && (
                      <Image
                        src={activeBook.coverUrl}
                        alt={activeBook.title}
                        fill
                        sizes="140px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-400 mb-1">
                      <span className="font-semibold text-amber-400">{activeBook.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Published {activeBook.publishedYear}</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-100 leading-snug">
                      {activeBook.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">{activeBook.author}</p>

                    <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                      {activeBook.description}
                    </p>

                    {/* Quick Specs (Unboxed metadata) */}
                    <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 mt-4 pt-3 border-t border-slate-800/80 flex-wrap">
                      <span className="tabular-nums font-medium text-slate-300">
                        {activeBook.totalPages} Pages
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums font-medium text-slate-300">
                        {chapters.length} Chapters
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums font-medium text-slate-300">
                        {formatBytes(activeBook.fileSizeBytes)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chapter Table of Contents Section */}
              <div className="flex-1 p-4">
                <ChapterList
                  chapters={chapters}
                  currentChapterId={activeChapterId}
                  currentPage={activePage}
                  onSelectChapter={(chapter, page) => {
                    handleOpenReader(activeBook, chapter, page);
                  }}
                />
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW 3: PDF CHAPTERWISE READER (app/reader/[id].tsx)
              ======================================================== */}
          {currentView === 'reader' && activeBook && (
            <div className="relative flex flex-col h-full bg-slate-950 overflow-hidden">
              {/* Overlay Reader Toolbar */}
              <ReaderToolbar
                bookTitle={activeBook.title}
                chapterTitle={activeChapter.title}
                currentPage={activePage}
                totalPages={activeBook.totalPages}
                isBookmarked={
                  currentBookRecord?.bookmarks?.includes(activePage) || false
                }
                syncState={syncState}
                queuedCount={queuedCount}
                lastSyncedText={lastSyncedText}
                isSimulatedOffline={isSimulatedOffline}
                onToggleOffline={() => toggleOfflineMode(!isSimulatedOffline)}
                onToggleBookmark={handleToggleBookmark}
                onToggleToc={() => setIsTocDrawerOpen(!isTocDrawerOpen)}
                onToggleSettings={() => setIsSettingsOpen(true)}
                onBack={() => setCurrentView('details')}
                settings={readerSettings}
              />

              {/* Main Chapterwise PDF Viewer */}
              <PdfViewer
                book={activeBook}
                activeChapter={activeChapter}
                currentPage={activePage}
                totalPages={activeBook.totalPages}
                isCached={activeBook.isDownloaded ?? false}
                settings={readerSettings}
                bookmarks={currentBookRecord?.bookmarks || []}
                onPageChange={handlePageChange}
                onToggleBookmark={handleToggleBookmark}
              />

              {/* Slide-over Table of Contents Drawer */}
              {isTocDrawerOpen && (
                <div className="absolute inset-0 z-40 flex bg-black/60 backdrop-blur-sm animate-fade-in">
                  <div className="w-5/6 sm:w-80 h-full bg-slate-900 border-r border-slate-800 flex flex-col p-2 shadow-2xl">
                    <div className="flex items-center justify-between p-3 border-b border-slate-800">
                      <span className="text-xs font-semibold text-slate-200">
                        Document Chapters
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsTocDrawerOpen(false)}
                        className="text-xs text-slate-400 hover:text-white px-2 py-1"
                      >
                        Close
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      <ChapterList
                        chapters={chapters}
                        currentChapterId={activeChapterId}
                        currentPage={activePage}
                        onSelectChapter={(ch, p) => {
                          setActiveChapterId(ch.id);
                          setActivePage(p !== undefined ? p : ch.startPage);
                          setIsTocDrawerOpen(false);
                          handlePageChange(p !== undefined ? p : ch.startPage);
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="flex-1"
                    onClick={() => setIsTocDrawerOpen(false)}
                  />
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              VIEW 4: APP SETTINGS & OFFLINE CACHE (app/settings.tsx)
              ======================================================== */}
          {currentView === 'settings' && (
            <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentView('library')}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h2 className="text-base font-semibold text-slate-100">
                    Storage & Sync Center
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExportModalOpen(true)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium"
                >
                  Expo Config
                </button>
              </div>

              {/* Network Connectivity & Offline Simulation Card */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isSimulatedOffline ? (
                      <WifiOff className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Wifi className="w-5 h-5 text-emerald-400" />
                    )}
                    <div>
                      <h3 className="text-xs font-semibold text-slate-100">
                        {isSimulatedOffline ? 'Simulating Offline Mode' : 'Online & Connected'}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {isSimulatedOffline
                          ? 'Progress updates are queued locally in AsyncStorage'
                          : 'Connected to REST backend /api/v1/user/progress'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleOfflineMode(!isSimulatedOffline)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
                      isSimulatedOffline
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {isSimulatedOffline ? 'Go Online' : 'Simulate Offline'}
                  </button>
                </div>

                {queuedCount > 0 && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <span className="text-amber-400">
                      {queuedCount} reading progress update{queuedCount > 1 ? 's' : ''} queued
                    </span>
                    <button
                      type="button"
                      onClick={() => flushOfflineQueue()}
                      disabled={isSimulatedOffline}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 rounded-lg disabled:opacity-40"
                    >
                      Flush Queue Now
                    </button>
                  </div>
                )}
              </div>

              {/* Local File Cache Status (Expo FileSystem emulation) */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-amber-400" />
                    <div>
                      <h3 className="text-xs font-semibold text-slate-100">
                        Local Document Storage
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {storageStats.count} cached book{storageStats.count !== 1 ? 's' : ''} ({formatBytes(storageStats.totalBytes)})
                      </p>
                    </div>
                  </div>

                  {storageStats.count > 0 && (
                    <button
                      type="button"
                      onClick={async () => {
                        for (const b of books || []) {
                          await fileCache.removeCachedFile(b.id);
                        }
                        refreshStorageInfo();
                        refetchBooks();
                      }}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All Cache</span>
                    </button>
                  )}
                </div>

                {/* List of cached books */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {(books || [])
                    .filter((b) => b.isDownloaded)
                    .map((cachedBook) => (
                      <div
                        key={cachedBook.id}
                        className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs"
                      >
                        <div className="min-w-0 pr-2">
                          <span className="font-semibold text-slate-200 truncate block">
                            {cachedBook.title}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {formatBytes(cachedBook.fileSizeBytes)} · Available offline
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={async () => {
                            await fileCache.removeCachedFile(cachedBook.id);
                            refreshStorageInfo();
                            refetchBooks();
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete from cache"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                  {storageStats.count === 0 && (
                    <div className="text-xs text-slate-500 py-2">
                      No documents cached yet. Tap &ldquo;Save Offline&rdquo; on any book in the
                      library to download and cache its PDF stream.
                    </div>
                  )}
                </div>
              </div>

              {/* API Endpoints Health Specs */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <h3 className="text-xs font-semibold text-slate-200">
                  Configured API Endpoints
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 bg-slate-950 rounded-lg">
                    <span className="text-emerald-400">GET /api/v1/books</span>
                    <span className="text-slate-500 text-[11px]">Library search</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-950 rounded-lg">
                    <span className="text-emerald-400">GET /api/v1/books/:id/chapters</span>
                    <span className="text-slate-500 text-[11px]">TOC breakdown</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-950 rounded-lg">
                    <span className="text-emerald-400">GET /api/v1/books/:id/download-url</span>
                    <span className="text-slate-500 text-[11px]">Signed PDF url</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-950 rounded-lg">
                    <span className="text-amber-400">POST /api/v1/user/progress</span>
                    <span className="text-slate-500 text-[11px]">Debounced sync</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentView('library')}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-200 text-xs font-semibold rounded-xl border border-slate-800"
                >
                  Return to Library
                </button>
              </div>
            </div>
          )}
        </DeviceFrame>
      </main>

      {/* Reader Settings Modal */}
      <ReaderSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={readerSettings}
        onUpdateSettings={(newSettings) =>
          setReaderSettings((prev) => ({ ...prev, ...newSettings }))
        }
      />

      {/* React Native & Expo Source Code Inspector Modal */}
      <ReactNativeExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
