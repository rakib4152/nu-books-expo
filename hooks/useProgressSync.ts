'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserProgress, syncUserProgress } from '@/api/progress';
import { appStorage } from '@/services/storage';
import { UserProgress, ProgressSyncPayload } from '@/types/api';

const OFFLINE_QUEUE_KEY = '@expo_pdf_reader:offline_progress_queue_v1';

export type SyncState = 'synced' | 'syncing' | 'queued' | 'offline' | 'error';

export function useProgressSync(bookId?: string) {
  const queryClient = useQueryClient();
  const [syncState, setSyncState] = useState<SyncState>('synced');
  const [queuedCount, setQueuedCount] = useState<number>(0);
  const [lastSyncedText, setLastSyncedText] = useState<string>('Just now');
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);

  // Debounce timer ref (2.5 seconds as specified in prompt constraints)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingPayloadRef = useRef<ProgressSyncPayload | null>(null);

  // Fetch current server progress
  const progressQuery = useQuery({
    queryKey: ['user-progress'],
    queryFn: async () => {
      const res = await fetchUserProgress();
      return res.data;
    },
    staleTime: 1000 * 30
  });

  // Server sync mutation
  const syncMutation = useMutation({
    mutationFn: async (payload: ProgressSyncPayload) => {
      const res = await syncUserProgress(payload);
      return res.data;
    },
    onMutate: async (newPayload) => {
      setSyncState('syncing');
      // Cancel outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ['user-progress'] });
      const previousProgress = queryClient.getQueryData<UserProgress>(['user-progress']);

      // Optimistically update cache
      if (previousProgress) {
        const updatedProgress: UserProgress = {
          ...previousProgress,
          lastReadBookId: newPayload.bookId,
          lastReadChapterId: newPayload.chapterId,
          lastReadPage: newPayload.page,
          percentCompleted: newPayload.percentCompleted,
          lastSyncedAt: new Date().toISOString(),
          bookProgress: {
            ...previousProgress.bookProgress,
            [newPayload.bookId]: {
              ...(previousProgress.bookProgress[newPayload.bookId] || {
                bookId: newPayload.bookId,
                currentChapterId: newPayload.chapterId,
                currentPage: newPayload.page,
                percent: newPayload.percentCompleted,
                bookmarks: [],
                lastReadAt: new Date().toISOString(),
                totalMinutesRead: 1
              }),
              currentChapterId: newPayload.chapterId,
              currentPage: newPayload.page,
              percent: newPayload.percentCompleted,
              bookmarks: newPayload.bookmarks !== undefined
                ? newPayload.bookmarks
                : previousProgress.bookProgress[newPayload.bookId]?.bookmarks || [],
              lastReadAt: new Date().toISOString()
            }
          }
        };
        queryClient.setQueryData(['user-progress'], updatedProgress);
      }

      return { previousProgress };
    },
    onSuccess: (data) => {
      setSyncState('synced');
      setLastSyncedText('Just now');
      queryClient.setQueryData(['user-progress'], data);
    },
    onError: (err, newPayload, context) => {
      console.warn('Progress sync network error, enqueuing to offline cache:', err);
      // Revert optimistic cache if needed
      if (context?.previousProgress) {
        queryClient.setQueryData(['user-progress'], context.previousProgress);
      }
      // Enqueue to offline storage
      enqueueOfflinePayload(newPayload);
      setSyncState(isSimulatedOffline ? 'offline' : 'queued');
    }
  });

  // Offline queue operations
  const enqueueOfflinePayload = async (payload: ProgressSyncPayload) => {
    try {
      const queue = await appStorage.getObject<ProgressSyncPayload[]>(OFFLINE_QUEUE_KEY, []);
      // Replace existing pending update for same book if present, or push
      const filtered = queue.filter((item) => item.bookId !== payload.bookId);
      const updatedQueue = [...filtered, payload];
      await appStorage.setObject(OFFLINE_QUEUE_KEY, updatedQueue);
      setQueuedCount(updatedQueue.length);
    } catch (e) {
      console.error('Failed to enqueue payload:', e);
    }
  };

  const flushOfflineQueue = useCallback(async () => {
    if (isSimulatedOffline) return;

    try {
      const queue = await appStorage.getObject<ProgressSyncPayload[]>(OFFLINE_QUEUE_KEY, []);
      if (!queue || queue.length === 0) {
        setQueuedCount(0);
        return;
      }

      setSyncState('syncing');
      for (const item of queue) {
        await syncUserProgress(item);
      }

      // Empty queue after success
      await appStorage.setObject(OFFLINE_QUEUE_KEY, []);
      setQueuedCount(0);
      setSyncState('synced');
      setLastSyncedText('Just now');
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    } catch (e) {
      console.warn('Failed to flush offline queue:', e);
      setSyncState('error');
    }
  }, [isSimulatedOffline, queryClient]);

  // Flush queue on mount or when coming back online
  useEffect(() => {
    let isCancelled = false;
    if (!isSimulatedOffline) {
      const timer = setTimeout(() => {
        if (!isCancelled) {
          flushOfflineQueue();
        }
      }, 100);
      return () => {
        isCancelled = true;
        clearTimeout(timer);
      };
    }
  }, [isSimulatedOffline, flushOfflineQueue]);

  // Debounced progress updater
  const updateProgress = useCallback(
    (payload: ProgressSyncPayload) => {
      pendingPayloadRef.current = payload;

      if (isSimulatedOffline) {
        // Direct to offline queue
        enqueueOfflinePayload(payload);
        setSyncState('offline');
        return;
      }

      setSyncState('syncing');

      // Clear any pending debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set 2.0s debounce to avoid API spamming during rapid page turns
      debounceTimerRef.current = setTimeout(() => {
        if (pendingPayloadRef.current) {
          syncMutation.mutate(pendingPayloadRef.current);
          pendingPayloadRef.current = null;
        }
      }, 2000);
    },
    [isSimulatedOffline, syncMutation]
  );

  // Toggle simulated offline mode (for testing offline first capabilities)
  const toggleOfflineMode = (offline: boolean) => {
    setIsSimulatedOffline(offline);
    if (!offline) {
      flushOfflineQueue();
    } else {
      setSyncState('offline');
    }
  };

  // Get active book record
  const currentBookRecord =
    bookId && progressQuery.data?.bookProgress
      ? progressQuery.data.bookProgress[bookId]
      : null;

  return {
    userProgress: progressQuery.data,
    currentBookRecord,
    isLoading: progressQuery.isLoading,
    syncState,
    queuedCount,
    lastSyncedText,
    isSimulatedOffline,
    toggleOfflineMode,
    updateProgress,
    flushOfflineQueue
  };
}
