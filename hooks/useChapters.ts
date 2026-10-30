import { useQuery } from '@tanstack/react-query';
import { fetchChaptersByBookId } from '@/api/books';
import { Chapter } from '@/types/api';

export function useChapters(bookId: string | null) {
  return useQuery({
    queryKey: ['chapters', bookId],
    queryFn: async (): Promise<Chapter[]> => {
      if (!bookId) return [];
      const res = await fetchChaptersByBookId(bookId);
      return res.data || [];
    },
    enabled: !!bookId,
    staleTime: 1000 * 60 * 5 // 5 minutes cache
  });
}
