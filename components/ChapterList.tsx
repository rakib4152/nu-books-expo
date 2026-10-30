'use client';

import React, { useState } from 'react';
import { Chapter } from '@/types/api';
import { Clock, BookMarked, ChevronRight, Search, CheckCircle2 } from 'lucide-react';

interface ChapterListProps {
  chapters: Chapter[];
  currentChapterId?: string;
  currentPage?: number;
  onSelectChapter: (chapter: Chapter, targetPage?: number) => void;
}

export const ChapterList: React.FC<ChapterListProps> = ({
  chapters,
  currentChapterId,
  currentPage,
  onSelectChapter
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredChapters = chapters.filter(
    (ch) =>
      ch.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      ch.subtitle?.toLowerCase().includes(filterQuery.toLowerCase()) ||
      ch.summary?.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
      {/* Header and Filter */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-semibold text-slate-100">Table of Contents</h4>
          </div>
          <span className="text-xs text-slate-400 tabular-nums">
            {chapters.length} chapters
          </span>
        </div>

        {/* Quick Chapter Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search chapters or topics..."
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-950/70 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/70 transition-colors"
          />
        </div>
      </div>

      {/* Chapters Scrollable List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2 space-y-1">
        {filteredChapters.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No chapters match your query
          </div>
        ) : (
          filteredChapters.map((chapter) => {
            const isCurrent = chapter.id === currentChapterId;
            const isCompleted =
              currentPage !== undefined && currentPage > chapter.endPage;

            return (
              <div
                key={chapter.id}
                onClick={() => onSelectChapter(chapter, chapter.startPage)}
                className={`group flex items-start gap-3.5 p-3 rounded-xl transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-400/10 border border-amber-400/30 text-amber-300'
                    : 'hover:bg-slate-800/60 text-slate-200'
                }`}
              >
                {/* Chapter Index Badge */}
                <div
                  className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-xs font-semibold tabular-nums mt-0.5 ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : isCompleted
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    chapter.chapterIndex
                  )}
                </div>

                {/* Chapter Title & Range */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h5
                      className={`text-xs sm:text-sm font-semibold truncate ${
                        isCurrent ? 'text-amber-300' : 'text-slate-100 group-hover:text-amber-200'
                      }`}
                    >
                      {chapter.title}
                    </h5>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>

                  {chapter.subtitle && (
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {chapter.subtitle}
                    </p>
                  )}

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1.5 flex-wrap">
                    <span className="tabular-nums">
                      Pages {chapter.startPage}–{chapter.endPage}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{chapter.pagesCount} pages</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500 inline" />
                      <span className="tabular-nums">{chapter.estimatedReadTimeMinutes} min</span>
                    </span>
                  </div>

                  {chapter.summary && (
                    <p className="text-[11px] text-slate-400/90 line-clamp-2 mt-2 leading-relaxed">
                      {chapter.summary}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
