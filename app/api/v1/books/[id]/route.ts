import { NextRequest, NextResponse } from 'next/server';
import { BOOKS_DATA } from '@/lib/booksData';
import { ApiResponse, Book } from '@/types/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const book = BOOKS_DATA.find((b) => b.id === id);

    if (!book) {
      return NextResponse.json(
        { success: false, data: null, message: `Book with ID "${id}" not found` },
        { status: 404 }
      );
    }

    const response: ApiResponse<Book> = {
      success: true,
      data: book
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching book details:', error);
    return NextResponse.json(
      { success: false, data: null, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
