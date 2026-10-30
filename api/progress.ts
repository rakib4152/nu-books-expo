import { apiClient } from './client';
import { ApiResponse, UserProgress, ProgressSyncPayload } from '@/types/api';

export async function fetchUserProgress(): Promise<ApiResponse<UserProgress>> {
  return apiClient.get<ApiResponse<UserProgress>>('/api/v1/user/progress');
}

export async function syncUserProgress(payload: ProgressSyncPayload): Promise<ApiResponse<UserProgress>> {
  return apiClient.post<ApiResponse<UserProgress>>('/api/v1/user/progress', payload);
}
