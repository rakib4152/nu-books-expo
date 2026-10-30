export interface Chapter {
  id: string;
  bookId: string;
  chapterIndex: number;
  title: string;
  subtitle?: string;
  startPage: number;
  endPage: number;
  estimatedReadTimeMinutes: number;
  summary?: string;
  pagesCount: number;
  pages?: ChapterPageContent[];
}

export interface ChapterPageContent {
  pageNumber: number;
  heading?: string;
  paragraphs: string[];
  callout?: string;
  diagramTitle?: string;
  keyTakeaways?: string[];
  footnotes?: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  category: 'Engineering' | 'Classics' | 'Philosophy' | 'Literature' | 'Sci-Fi';
  totalPages: number;
  fileSizeBytes: number;
  downloadUrl: string;
  publishedYear: number;
  language: string;
  rating: number;
  chaptersCount: number;
  chapters?: Chapter[];
  isDownloaded?: boolean;
}

export interface BookProgressRecord {
  bookId: string;
  currentChapterId: string;
  currentPage: number;
  percent: number;
  bookmarks: number[];
  lastReadAt: string;
  totalMinutesRead: number;
}

export interface UserProgress {
  userId: string;
  lastReadBookId: string;
  lastReadChapterId: string;
  lastReadPage: number;
  percentCompleted: number;
  lastSyncedAt: string;
  bookProgress: Record<string, BookProgressRecord>;
}

export interface ProgressSyncPayload {
  bookId: string;
  chapterId: string;
  page: number;
  percentCompleted: number;
  bookmarks?: number[];
  timestamp?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DownloadUrlResponse {
  bookId: string;
  downloadUrl: string;
  fileSizeBytes: number;
  checksumSha256: string;
  expiresInSeconds: number;
}

export interface CachedFileMetadata {
  bookId: string;
  fileName: string;
  localUri: string;
  fileSizeBytes: number;
  downloadedAt: string;
  lastAccessedAt: string;
}

export interface ReaderSettings {
  theme: 'dark' | 'sepia' | 'light';
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  fontFamily: 'serif' | 'sans';
  lineSpacing: 'tight' | 'normal' | 'relaxed';
  brightness: number; // 50 to 100
  continuousScroll: boolean;
  pageTransition: 'slide' | 'curl' | 'fade';
}
