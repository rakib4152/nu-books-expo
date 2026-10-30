import { apiClient } from './client';
import { ApiResponse, Book, Chapter, DownloadUrlResponse } from '@/types/api';

export interface GetBooksParams {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export async function fetchBooks(params?: GetBooksParams): Promise<ApiResponse<Book[]>> {
  return apiClient.get<ApiResponse<Book[]>>('/api/v1/books', {
    search: params?.search,
    category: params?.category,
    page: params?.page,
    limit: params?.limit
  });
}

export async function fetchBookById(id: string): Promise<ApiResponse<Book>> {
  return apiClient.get<ApiResponse<Book>>(`/api/v1/books/${id}`);
}

export async function fetchChaptersByBookId(bookId: string): Promise<ApiResponse<Chapter[]>> {
  return apiClient.get<ApiResponse<Chapter[]>>(`/api/v1/books/${bookId}/chapters`);
}

export async function fetchBookDownloadUrl(bookId: string): Promise<ApiResponse<DownloadUrlResponse>> {
  return apiClient.get<ApiResponse<DownloadUrlResponse>>(`/api/v1/books/${bookId}/download-url`);
}
