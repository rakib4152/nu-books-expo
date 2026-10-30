import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_USER_PROGRESS, BOOKS_DATA } from '@/lib/booksData';
import { ApiResponse, UserProgress, ProgressSyncPayload } from '@/types/api';

// In-memory server store for user progress in runtime session
let currentProgress: UserProgress = { ...INITIAL_USER_PROGRESS };

export async function GET(request: NextRequest) {
  try {
    const response: ApiResponse<UserProgress> = {
      success: true,
      data: currentProgress,
      message: 'User progress retrieved successfully'
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { success: false, data: null, message: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload: ProgressSyncPayload = await request.json();

    if (!payload.bookId || !payload.chapterId || payload.page === undefined) {
      return NextResponse.json(
        { success: false, message: 'Invalid payload: bookId, chapterId, and page are required.' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const book = BOOKS_DATA.find((b) => b.id === payload.bookId);
    const existingBookRecord = currentProgress.bookProgress[payload.bookId] || {
      bookId: payload.bookId,
      currentChapterId: payload.chapterId,
      currentPage: payload.page,
      percent: 0,
      bookmarks: [],
      lastReadAt: now,
      totalMinutesRead: 0
    };

    const calculatedPercent =
      book && book.totalPages > 0
        ? Math.min(100, Math.round((payload.page / book.totalPages) * 100))
        : payload.percentCompleted || 0;

    const updatedBookmarks = payload.bookmarks !== undefined
      ? payload.bookmarks
      : existingBookRecord.bookmarks;

    // Update book-specific progress
    currentProgress.bookProgress[payload.bookId] = {
      ...existingBookRecord,
      currentChapterId: payload.chapterId,
      currentPage: payload.page,
      percent: calculatedPercent,
      bookmarks: updatedBookmarks,
      lastReadAt: now,
      totalMinutesRead: existingBookRecord.totalMinutesRead + 1
    };

    // Update global last-read pointers
    currentProgress.lastReadBookId = payload.bookId;
    currentProgress.lastReadChapterId = payload.chapterId;
    currentProgress.lastReadPage = payload.page;
    currentProgress.percentCompleted = calculatedPercent;
    currentProgress.lastSyncedAt = now;

    const response: ApiResponse<UserProgress> = {
      success: true,
      data: currentProgress,
      message: 'Reading progress synchronized successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error syncing progress:', error);
    return NextResponse.json(
      { success: false, data: null, message: 'Failed to sync reading progress' },
      { status: 500 }
    );
  }
}
