'use client';

import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Smartphone, Terminal } from 'lucide-react';

interface ReactNativeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReactNativeExportModal: React.FC<ReactNativeExportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeFile, setActiveFile] = useState<string>('App.tsx');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const CODE_SNIPPETS: Record<string, string> = {
    'App.tsx': `import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './app/index';
import DetailsScreen from './app/details/[id]';
import ReaderScreen from './app/reader/[id]';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: 1000 * 60 * 2 }
  }
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: '#0f172a' },
              headerTintColor: '#f8fafc',
              headerTitleStyle: { fontWeight: '600' }
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ChapterFlow Library' }} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Book Chapters' }} />
            <Stack.Screen name="Reader" component={ReaderScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}`,

    'fileCache.ts (Expo FileSystem)': `import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_INDEX_KEY = '@expo_pdf_reader:cached_files';

export async function downloadAndCachePdf(
  bookId: string,
  downloadUrl: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  const dir = \`\${FileSystem.documentDirectory}pdfs/\`;
  await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  const localUri = \`\${dir}\${bookId}.pdf\`;

  const info = await FileSystem.getInfoAsync(localUri);
  if (info.exists) {
    return localUri;
  }

  const downloadResumable = FileSystem.createDownloadResumable(
    downloadUrl,
    localUri,
    {},
    (downloadProgress) => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      if (onProgress) onProgress(Math.round(progress * 100));
    }
  );

  const result = await downloadResumable.downloadAsync();
  if (!result?.uri) throw new Error('Download failed');

  // Record in AsyncStorage
  const rawList = await AsyncStorage.getItem(CACHE_INDEX_KEY);
  const list = rawList ? JSON.parse(rawList) : [];
  list.push({ bookId, localUri: result.uri, cachedAt: new Date().toISOString() });
  await AsyncStorage.setItem(CACHE_INDEX_KEY, JSON.stringify(list));

  return result.uri;
}`,

    'useProgressSync.ts': `import { useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { syncUserProgress } from '../api/progress';

export function useProgressSync(bookId: string) {
  const queryClient = useQueryClient();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const mutation = useMutation({
    mutationFn: syncUserProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    },
    onError: async (err, payload) => {
      // Save to offline queue in AsyncStorage
      const queueRaw = await AsyncStorage.getItem('@offline_queue');
      const queue = queueRaw ? JSON.parse(queueRaw) : [];
      queue.push(payload);
      await AsyncStorage.setItem('@offline_queue', JSON.stringify(queue));
    }
  });

  const updateProgress = useCallback((chapterId: string, page: number, totalPages: number) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      mutation.mutate({
        bookId,
        chapterId,
        page,
        percentCompleted: Math.round((page / totalPages) * 100)
      });
    }, 2500); // 2.5s debounce to preserve network bandwidth
  }, [bookId, mutation]);

  return { updateProgress, isSyncing: mutation.isPending };
}`,

    'package.json (Expo SDK 50+)': `{
  "name": "chapterwise-pdf-reader",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "@react-native-async-storage/async-storage": "1.21.0",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "@tanstack/react-query": "^5.28.0",
    "expo": "~50.0.14",
    "expo-file-system": "~16.0.8",
    "expo-status-bar": "~1.11.1",
    "nativewind": "^2.0.11",
    "react": "18.2.0",
    "react-native": "0.73.6",
    "react-native-pdf": "^6.7.4",
    "react-native-safe-area-context": "4.8.2",
    "react-native-screens": "~3.29.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.45",
    "tailwindcss": "3.3.2",
    "typescript": "^5.1.3"
  }
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeFile] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                React Native & Expo Project Source
              </h3>
              <p className="text-[11px] text-slate-400">
                Native Expo SDK 50+ implementation with NativeWind, expo-file-system, and React Query
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-850 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File Tabs */}
        <div className="flex items-center gap-1.5 p-2 bg-slate-950/80 border-b border-slate-800 overflow-x-auto text-xs font-mono">
          {Object.keys(CODE_SNIPPETS).map((fileName) => (
            <button
              key={fileName}
              type="button"
              onClick={() => setActiveFile(fileName)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeFile === fileName
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{fileName}</span>
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="relative flex-1 overflow-auto p-4 bg-slate-950 font-mono text-xs text-slate-300">
          <pre className="leading-relaxed">
            <code>{CODE_SNIPPETS[activeFile]}</code>
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-3 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>npx create-expo-app --template blank-typescript</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold transition-colors active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-800" />
                <span>Copied Code</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy File Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
