'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Book } from '@/types/api';
import { fileCache } from '@/services/fileCache';
import { Download, Check, ArrowRight, BookOpen, Clock, HardDrive } from 'lucide-react';

interface DocumentCardProps {
  book: Book;
  currentProgressPercent?: number;
  onOpenDetails: (book: Book) => void;
  onOpenReader: (book: Book) => void;
  onCacheUpdated?: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  book,
  currentProgressPercent = 0,
  onOpenDetails,
  onOpenReader,
  onCacheUpdated
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isCached, setIsCached] = useState(book.isDownloaded ?? false);

  const formatFileSize = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownloading || isCached) return;

    setIsDownloading(true);
    setDownloadProgress(10);

    try {
      await fileCache.downloadAndCacheBook(
        book.id,
        book.downloadUrl,
        book.fileSizeBytes,
        (progress) => setDownloadProgress(progress)
      );
      setIsCached(true);
      if (onCacheUpdated) onCacheUpdated();
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      onClick={() => onOpenDetails(book)}
      className="group relative flex flex-col sm:flex-row gap-4 p-3.5 bg-slate-900/70 hover:bg-slate-850 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.99]"
    >
      {/* Book Cover Image with Fallback Container */}
      <div className="relative w-full sm:w-28 h-44 sm:h-38 shrink-0 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/60 shadow-md">
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 100vw, 120px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300">
            <BookOpen className="w-6 h-6 mb-2 text-amber-400" />
            <span className="text-xs font-semibold line-clamp-2">{book.title}</span>
          </div>
        )}

        {/* Progress bar overlay along bottom of cover */}
        {currentProgressPercent > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/60">
            <div
              className="h-full bg-amber-400 transition-all duration-300"
              style={{ width: `${currentProgressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Book Details and Actions */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          {/* Metadata Row: Category, Pages, Read Time (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 flex-wrap">
            <span className="font-medium text-amber-400/90">{book.category}</span>
            <span aria-hidden="true">·</span>
            <span>{book.totalPages} pages</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 inline text-slate-500" />
              {book.chaptersCount} chapters
            </span>
            <span aria-hidden="true">·</span>
            <span>{formatFileSize(book.fileSizeBytes)}</span>
          </div>

          {/* Book Title */}
          <h3 className="text-base sm:text-lg font-semibold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-xs sm:text-sm text-slate-400 mb-2 truncate">
            {book.author}
          </p>

          {/* Description */}
          <p className="text-xs text-slate-400/90 line-clamp-2 leading-relaxed mb-3">
            {book.description}
          </p>
        </div>

        {/* Action Controls & Offline Caching Indicator */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
          {/* Left: Cache Status or Download Trigger */}
          <div className="flex items-center">
            {isCached ? (
              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Downloaded (Offline)</span>
              </div>
            ) : isDownloading ? (
              <div className="flex items-center gap-2 text-xs text-amber-300">
                <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span>Caching {downloadProgress}%</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700/60 rounded-lg transition-colors active:scale-95"
                title="Download for offline reading"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Save Offline</span>
              </button>
            )}
          </div>

          {/* Right: Read Chapter Button */}
          <div className="flex items-center gap-2">
            {currentProgressPercent > 0 && (
              <span className="text-xs tabular-nums text-slate-400 font-medium">
                {currentProgressPercent}%
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenReader(book);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm active:scale-95 whitespace-nowrap shrink-0"
            >
              <span>{currentProgressPercent > 0 ? 'Continue' : 'Read'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
