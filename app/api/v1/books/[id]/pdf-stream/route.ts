import { NextRequest, NextResponse } from 'next/server';
import { BOOKS_DATA } from '@/lib/booksData';
import { createMinimalPdfBuffer } from '@/lib/generatePdf';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const book = BOOKS_DATA.find((b) => b.id === id);

    if (!book) {
      return NextResponse.json(
        { success: false, message: 'Document not found' },
        { status: 404 }
      );
    }

    const pdfBuffer = createMinimalPdfBuffer(book);
    const uint8Array = new Uint8Array(pdfBuffer);

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${book.id}.pdf"`,
        'Content-Length': uint8Array.byteLength.toString(),
        'Cache-Control': 'public, max-age=86400, immutable',
        ETag: `"${book.id}-${book.publishedYear}"`
      }
    });
  } catch (error) {
    console.error('Error generating PDF stream:', error);
    return NextResponse.json(
      { success: false, message: 'PDF stream generation failed' },
      { status: 500 }
    );
  }
}
