import { useQuery } from '@tanstack/react-query';
import { fetchBooks, fetchBookById, GetBooksParams } from '@/api/books';
import { fileCache } from '@/services/fileCache';
import { Book } from '@/types/api';

export function useBooks(params?: GetBooksParams) {
  return useQuery({
    queryKey: ['books', params?.search || '', params?.category || '', params?.page || 1],
    queryFn: async () => {
      const response = await fetchBooks(params);
      const books = response.data || [];

      // Augment each book with local cached state from fileCache
      const cachedFiles = await fileCache.getAllCachedFiles();
      const cachedIds = new Set(cachedFiles.map((f) => f.bookId));

      return books.map((b) => ({
        ...b,
        isDownloaded: cachedIds.has(b.id)
      }));
    },
    staleTime: 1000 * 60 * 2 // 2 minutes stale time
  });
}

export function useBookDetails(bookId: string | null) {
  return useQuery({
    queryKey: ['book', bookId],
    queryFn: async () => {
      if (!bookId) return null;
      const res = await fetchBookById(bookId);
      const isDownloaded = await fileCache.isBookCached(bookId);
      return {
        ...res.data,
        isDownloaded
      } as Book;
    },
    enabled: !!bookId
  });
}
