import { NextRequest, NextResponse } from 'next/server';
import { BOOKS_DATA } from '@/lib/booksData';
import { ApiResponse, Book } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase().trim() || '';
    const category = searchParams.get('category')?.trim() || '';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get('limit') || '10', 10)));

    let filtered = [...BOOKS_DATA];

    if (search) {
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(search) ||
          b.author.toLowerCase().includes(search) ||
          b.description.toLowerCase().includes(search)
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter((b) => b.category.toLowerCase() === category.toLowerCase());
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedBooks = filtered.slice(startIndex, startIndex + limit);

    // Return books without bloated chapter page contents in listing for high network performance
    const lightBooks: Book[] = paginatedBooks.map((b) => ({
      ...b,
      chapters: b.chapters?.map((c) => ({
        ...c,
        pages: undefined
      }))
    }));

    const response: ApiResponse<Book[]> = {
      success: true,
      data: lightBooks,
      meta: {
        page,
        limit,
        total,
        totalPages
      }
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
      }
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { success: false, data: [], message: 'Failed to fetch book library' },
      { status: 500 }
    );
  }
}
