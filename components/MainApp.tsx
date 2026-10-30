'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useBooks, useBookDetails } from '@/hooks/useBooks';
import { useChapters } from '@/hooks/useChapters';
import { useProgressSync } from '@/hooks/useProgressSync';
import { fileCache } from '@/services/fileCache';
import { Book, Chapter, ReaderSettings } from '@/types/api';
import { UserProfile, PreviousYearExam } from '@/types/education';
import { INITIAL_USER } from '@/lib/educationData';

// Educational Screens
import { SignInScreen } from '@/components/screens/SignInScreen';
import { SignUpScreen } from '@/components/screens/SignUpScreen';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { QuestionScreen } from '@/components/screens/QuestionScreen';
import { SuggestionScreen } from '@/components/screens/SuggestionScreen';
import { PreviousYearScreen } from '@/components/screens/PreviousYearScreen';
import { SettingsScreen } from '@/components/screens/SettingsScreen';

// PDF Chapter Reader Components
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
  WifiOff,
  HelpCircle,
  FileText,
  User,
  Settings as SettingsIcon,
  Home as HomeIcon,
  History,
  Code
} from 'lucide-react';

export type AppMode = 'education' | 'pdf_reader';
export type EducationScreen = 'signin' | 'signup' | 'home' | 'question' | 'suggestion' | 'previous' | 'settings';

export default function MainApp() {
  // Mode: Educational Mobile Screens vs PDF Reader
  const [appMode, setAppMode] = useState<AppMode>('education');
  const [eduScreen, setEduScreen] = useState<EducationScreen>('home');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string | undefined>(undefined);

  // User Profile State
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  // PDF Reader View State
  const [pdfView, setPdfView] = useState<'library' | 'details' | 'reader' | 'storage'>('library');
  const [activeBookId, setActiveBookId] = useState<string>('book-clean-arch');
  const [activeChapterId, setActiveChapterId] = useState<string>('ca-ch-1');
  const [activePage, setActivePage] = useState<number>(1);

  // Device Frame State
  const [deviceType, setDeviceType] = useState<DeviceType>('iphone');

  // Modals & Drawers State
  const [isReaderSettingsOpen, setIsReaderSettingsOpen] = useState(false);
  const [isTocDrawerOpen, setIsTocDrawerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportInitialTab, setExportInitialTab] = useState<string>('home');

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

  // Queries & Mutations for PDF reader
  const {
    data: books,
    isLoading: isBooksLoading,
    refetch: refetchBooks,
    isRefetching
  } = useBooks();

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

  // Refresh storage usage
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
  }, [pdfView]);

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

  const handleOpenExportForCurrentScreen = (screenKey?: string) => {
    setExportInitialTab(screenKey || eduScreen);
    setIsExportModalOpen(true);
  };

  const screensList: { id: EducationScreen; label: string; number: string }[] = [
    { id: 'signin', label: 'Sign In', number: '1' },
    { id: 'signup', label: 'Sign Up', number: '2' },
    { id: 'home', label: 'Home', number: '3' },
    { id: 'question', label: 'Questions', number: '4' },
    { id: 'suggestion', label: 'Suggestions', number: '5' },
    { id: 'previous', label: 'Past Papers', number: '6' },
    { id: 'settings', label: 'Settings', number: '7' }
  ];

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
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-600/30">
            RN
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-100 whitespace-nowrap">
            EduPrep Mobile
          </span>
        </div>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            type="button"
            onClick={() => {
              setAppMode('education');
              setEduScreen('home');
            }}
            className={`whitespace-nowrap transition-colors ${
              appMode === 'education' && eduScreen === 'home'
                ? 'text-indigo-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            Education Home
          </button>

          <button
            type="button"
            onClick={() => {
              setAppMode('education');
              setEduScreen('question');
            }}
            className={`whitespace-nowrap transition-colors ${
              appMode === 'education' && eduScreen === 'question'
                ? 'text-indigo-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            Question Bank
          </button>

          <button
            type="button"
            onClick={() => {
              setAppMode('education');
              setEduScreen('suggestion');
            }}
            className={`whitespace-nowrap transition-colors ${
              appMode === 'education' && eduScreen === 'suggestion'
                ? 'text-indigo-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            Suggestions
          </button>

          <button
            type="button"
            onClick={() => {
              setAppMode('education');
              setEduScreen('previous');
            }}
            className={`whitespace-nowrap transition-colors ${
              appMode === 'education' && eduScreen === 'previous'
                ? 'text-indigo-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            Past Papers
          </button>

          <button
            type="button"
            onClick={() => {
              setAppMode('pdf_reader');
              setPdfView('library');
            }}
            className={`whitespace-nowrap transition-colors ${
              appMode === 'pdf_reader'
                ? 'text-amber-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            PDF Reader
          </button>
        </nav>

        {/* Zone 3: 1 primary action (Device Switcher & React Native Code Export) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Chassis Switcher */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setDeviceType('iphone')}
              aria-label="iPhone 16 Pro View"
              className={`p-1.5 rounded-lg transition-colors ${
                deviceType === 'iphone'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="iPhone 16 Pro Viewport"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceType('pixel')}
              aria-label="Google Pixel View"
              className={`p-1.5 rounded-lg transition-colors ${
                deviceType === 'pixel'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Google Pixel 9 Viewport"
            >
              <Smartphone className="w-4 h-4 rotate-90" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceType('tablet')}
              aria-label="Tablet View"
              className={`p-1.5 rounded-lg transition-colors ${
                deviceType === 'tablet'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="iPad / Tablet Viewport"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceType('fullscreen')}
              aria-label="Fullscreen Canvas"
              className={`p-1.5 rounded-lg transition-colors ${
                deviceType === 'fullscreen'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop Fullscreen"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>

          {/* Export Code Modal Trigger */}
          <button
            type="button"
            onClick={() => handleOpenExportForCurrentScreen()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/20 active:scale-95 whitespace-nowrap shrink-0"
          >
            <Code className="w-3.5 h-3.5" />
            <span>RN Code</span>
          </button>
        </div>
      </header>

      {/* Screen Quick Jumper Ribbon */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-4 sm:px-8 py-2 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Mobile Screens:
          </span>
          <div className="flex items-center gap-1">
            {screensList.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setAppMode('education');
                  setEduScreen(sc.id);
                }}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-colors ${
                  appMode === 'education' && eduScreen === sc.id
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span className="opacity-60 mr-1">{sc.number}.</span>
                <span>{sc.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleOpenExportForCurrentScreen(eduScreen)}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            <span>View {screensList.find((s) => s.id === eduScreen)?.label} NativeWind Code</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Container Wrapped in Device Frame */}
      <main className="flex-1 flex flex-col">
        <DeviceFrame
          activeDevice={deviceType}
          onChangeDevice={setDeviceType}
          isSimulatedOffline={isSimulatedOffline}
        >
          {appMode === 'education' ? (
            <div className="flex flex-col h-full bg-slate-50 text-slate-800 overflow-hidden">
              {/* Screen Body */}
              <div className="flex-1 flex flex-col overflow-y-auto">
                {/* 1. Sign In Screen */}
                {eduScreen === 'signin' && (
                  <SignInScreen
                    onSignInSuccess={(profile) => {
                      setUser((prev) => ({ ...prev, ...profile, isAuthenticated: true }));
                      setEduScreen('home');
                    }}
                    onNavigateToSignUp={() => setEduScreen('signup')}
                  />
                )}

                {/* 2. Registration Form / Sign Up Screen */}
                {eduScreen === 'signup' && (
                  <SignUpScreen
                    onSignUpSuccess={(profile) => {
                      setUser((prev) => ({ ...prev, ...profile, isAuthenticated: true }));
                      setEduScreen('home');
                    }}
                    onNavigateToSignIn={() => setEduScreen('signin')}
                  />
                )}

                {/* 3. Home Screen */}
                {eduScreen === 'home' && (
                  <HomeScreen
                    user={user}
                    onNavigateToQuestions={(subjectFilter) => {
                      setSelectedSubjectFilter(subjectFilter);
                      setEduScreen('question');
                    }}
                    onNavigateToSuggestions={() => setEduScreen('suggestion')}
                    onNavigateToPreviousYears={() => setEduScreen('previous')}
                  />
                )}

                {/* 4. Question Screen */}
                {eduScreen === 'question' && (
                  <QuestionScreen
                    initialSubjectFilter={selectedSubjectFilter}
                    onBack={() => setEduScreen('home')}
                  />
                )}

                {/* 5. Suggestion Screen */}
                {eduScreen === 'suggestion' && (
                  <SuggestionScreen
                    onBack={() => setEduScreen('home')}
                    onOpenQuestionTopic={(subject) => {
                      setSelectedSubjectFilter(subject);
                      setEduScreen('question');
                    }}
                  />
                )}

                {/* 6. Previous Year Question Screen */}
                {eduScreen === 'previous' && (
                  <PreviousYearScreen
                    onBack={() => setEduScreen('home')}
                    onSolveExam={(exam) => {
                      setSelectedSubjectFilter(exam.subject);
                      setEduScreen('question');
                    }}
                  />
                )}

                {/* 7. Settings Screen */}
                {eduScreen === 'settings' && (
                  <SettingsScreen
                    user={user}
                    onBack={() => setEduScreen('home')}
                    onLogout={() => {
                      setUser((prev) => ({ ...prev, isAuthenticated: false }));
                      setEduScreen('signin');
                    }}
                    onNavigateToSignIn={() => setEduScreen('signin')}
                  />
                )}
              </div>

              {/* Fixed Bottom Tab Bar for Main App Screens (Hidden on Sign In / Sign Up) */}
              {eduScreen !== 'signin' && eduScreen !== 'signup' && (
                <nav className="sticky bottom-0 z-30 grid grid-cols-5 items-center h-16 bg-white border-t border-slate-200/80 shadow-lg px-2">
                  <button
                    type="button"
                    onClick={() => setEduScreen('home')}
                    className={`flex flex-col items-center justify-center py-1 ${
                      eduScreen === 'home'
                        ? 'text-indigo-600 font-bold'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <HomeIcon className="w-5 h-5" />
                    <span className="text-[10px] mt-1 font-medium">Home</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEduScreen('question')}
                    className={`flex flex-col items-center justify-center py-1 ${
                      eduScreen === 'question'
                        ? 'text-indigo-600 font-bold'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <HelpCircle className="w-5 h-5" />
                    <span className="text-[10px] mt-1 font-medium">Quiz</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEduScreen('suggestion')}
                    className={`flex flex-col items-center justify-center py-1 ${
                      eduScreen === 'suggestion'
                        ? 'text-indigo-600 font-bold'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Sparkles className="w-5 h-5" />
                    <span className="text-[10px] mt-1 font-medium">Tips</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEduScreen('previous')}
                    className={`flex flex-col items-center justify-center py-1 ${
                      eduScreen === 'previous'
                        ? 'text-indigo-600 font-bold'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <History className="w-5 h-5" />
                    <span className="text-[10px] mt-1 font-medium">Past</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEduScreen('settings')}
                    className={`flex flex-col items-center justify-center py-1 ${
                      eduScreen === 'settings'
                        ? 'text-indigo-600 font-bold'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <SettingsIcon className="w-5 h-5" />
                    <span className="text-[10px] mt-1 font-medium">Settings</span>
                  </button>
                </nav>
              )}
            </div>
          ) : (
            /* PDF Chapter Reader View */
            <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
              {pdfView === 'library' && (
                <div className="flex flex-col h-full bg-slate-950 p-4 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-base font-bold text-slate-100">PDF Chapter Reader</h2>
                      <p className="text-xs text-slate-400">Offline caching & chapterwise reading</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAppMode('education')}
                      className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-xl"
                    >
                      Back to Quiz App
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(books || []).map((book) => (
                      <DocumentCard
                        key={book.id}
                        book={book}
                        currentProgressPercent={userProgress?.bookProgress[book.id]?.percent || 0}
                        onOpenDetails={(b) => {
                          setActiveBookId(b.id);
                          setPdfView('details');
                        }}
                        onOpenReader={(b) => {
                          setActiveBookId(b.id);
                          setPdfView('reader');
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {pdfView === 'details' && activeBook && (
                <div className="flex flex-col h-full bg-slate-950 p-4 overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <button
                      type="button"
                      onClick={() => setPdfView('library')}
                      className="p-2 rounded-xl bg-slate-900 text-slate-300"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <h3 className="text-xs font-bold truncate">{activeBook.title}</h3>
                    <button
                      type="button"
                      onClick={() => setPdfView('reader')}
                      className="px-3 py-1 text-xs font-semibold bg-amber-400 text-slate-950 rounded-lg"
                    >
                      Read
                    </button>
                  </div>
                  <ChapterList
                    chapters={chapters}
                    currentChapterId={activeChapterId}
                    currentPage={activePage}
                    onSelectChapter={(ch, p) => {
                      setActiveChapterId(ch.id);
                      setActivePage(p !== undefined ? p : ch.startPage);
                      setPdfView('reader');
                    }}
                  />
                </div>
              )}

              {pdfView === 'reader' && activeBook && (
                <div className="relative flex flex-col h-full bg-slate-950 overflow-hidden">
                  <ReaderToolbar
                    bookTitle={activeBook.title}
                    chapterTitle={activeChapter.title}
                    currentPage={activePage}
                    totalPages={activeBook.totalPages}
                    isBookmarked={currentBookRecord?.bookmarks?.includes(activePage) || false}
                    syncState={syncState}
                    queuedCount={queuedCount}
                    lastSyncedText={lastSyncedText}
                    isSimulatedOffline={isSimulatedOffline}
                    onToggleOffline={() => toggleOfflineMode(!isSimulatedOffline)}
                    onToggleBookmark={() => {
                      const cur = currentBookRecord?.bookmarks || [];
                      const updated = cur.includes(activePage)
                        ? cur.filter((p) => p !== activePage)
                        : [...cur, activePage];
                      updateProgress({
                        bookId: activeBook.id,
                        chapterId: activeChapter.id,
                        page: activePage,
                        percentCompleted: Math.round((activePage / activeBook.totalPages) * 100),
                        bookmarks: updated
                      });
                    }}
                    onToggleToc={() => setIsTocDrawerOpen(!isTocDrawerOpen)}
                    onToggleSettings={() => setIsReaderSettingsOpen(true)}
                    onBack={() => setPdfView('details')}
                    settings={readerSettings}
                  />

                  <PdfViewer
                    book={activeBook}
                    activeChapter={activeChapter}
                    currentPage={activePage}
                    totalPages={activeBook.totalPages}
                    isCached={activeBook.isDownloaded ?? false}
                    settings={readerSettings}
                    bookmarks={currentBookRecord?.bookmarks || []}
                    onPageChange={(p) => {
                      setActivePage(p);
                      updateProgress({
                        bookId: activeBook.id,
                        chapterId: activeChapter.id,
                        page: p,
                        percentCompleted: Math.round((p / activeBook.totalPages) * 100)
                      });
                    }}
                    onToggleBookmark={() => {}}
                  />
                </div>
              )}
            </div>
          )}
        </DeviceFrame>
      </main>

      {/* Reader Settings Modal */}
      <ReaderSettingsModal
        isOpen={isReaderSettingsOpen}
        onClose={() => setIsReaderSettingsOpen(false)}
        settings={readerSettings}
        onUpdateSettings={(newSettings) =>
          setReaderSettings((prev) => ({ ...prev, ...newSettings }))
        }
      />

      {/* React Native & NativeWind Component Source Code Modal */}
      <ReactNativeExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        initialTab={exportInitialTab}
      />
    </div>
  );
}
