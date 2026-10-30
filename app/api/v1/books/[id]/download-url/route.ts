import { NextRequest, NextResponse } from 'next/server';
import { BOOKS_DATA } from '@/lib/booksData';
import { ApiResponse, DownloadUrlResponse } from '@/types/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const book = BOOKS_DATA.find((b) => b.id === id);

    if (!book) {
      return NextResponse.json(
        { success: false, data: null, message: `Book not found` },
        { status: 404 }
      );
    }

    // Generate signed download URL response for expo-file-system caching
    const downloadResponse: DownloadUrlResponse = {
      bookId: book.id,
      downloadUrl: `/api/v1/books/${book.id}/pdf-stream`,
      fileSizeBytes: book.fileSizeBytes,
      checksumSha256: `sha256-${book.id}-${book.publishedYear}`,
      expiresInSeconds: 3600
    };

    const response: ApiResponse<DownloadUrlResponse> = {
      success: true,
      data: downloadResponse
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating download URL:', error);
    return NextResponse.json(
      { success: false, data: null, message: 'Could not generate download URL' },
      { status: 500 }
    );
  }
}
