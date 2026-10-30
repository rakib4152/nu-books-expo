import { NextRequest, NextResponse } from 'next/server';
import { BOOKS_DATA } from '@/lib/booksData';
import { ApiResponse, Chapter } from '@/types/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const book = BOOKS_DATA.find((b) => b.id === id);

    if (!book) {
      return NextResponse.json(
        { success: false, data: [], message: `Book not found` },
        { status: 404 }
      );
    }

    const chapters: Chapter[] = (book.chapters || []).sort(
      (a, b) => a.chapterIndex - b.chapterIndex
    );

    const response: ApiResponse<Chapter[]> = {
      success: true,
      data: chapters
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return NextResponse.json(
      { success: false, data: [], message: 'Failed to fetch chapters' },
      { status: 500 }
    );
  }
}
