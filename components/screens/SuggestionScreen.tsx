'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  Sparkles,
  Bookmark,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_SUGGESTIONS } from '@/lib/educationData';

interface SuggestionScreenProps {
  onBack: () => void;
  onOpenQuestionTopic?: (topic: string) => void;
}

export const SuggestionScreen: React.FC<SuggestionScreenProps> = ({
  onBack,
  onOpenQuestionTopic
}) => {
  const [filterSubject, setFilterSubject] = useState<string>('All');
  const [savedTopics, setSavedTopics] = useState<string[]>(['sug-1']);

  const subjects = ['All', 'ICT', 'Physics', 'Chemistry', 'Mathematics', 'English'];

  const filtered = filterSubject === 'All'
    ? SAMPLE_SUGGESTIONS
    : SAMPLE_SUGGESTIONS.filter((s) => s.subject.toLowerCase() === filterSubject.toLowerCase());

  const toggleSave = (id: string) => {
    setSavedTopics((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-800 p-4 sm:p-5 min-h-full overflow-y-auto">
      {/* 1. Top Header Titled "সুপারিশসমূহ" (Suggestions) */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm transition-all"
            aria-label="Back to home"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
              <span>সুপারিশসমূহ</span>
              <span className="text-xs font-normal text-slate-500 font-sans">(Suggestions)</span>
            </h1>
            <p className="text-[11px] text-slate-500">
              Exam preparation tips & high-yield topics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>99% Common</span>
          </span>
        </div>
      </div>

      {/* Filter Tabs by Subject */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-3">
        {subjects.map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => setFilterSubject(sub)}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
              filterSubject === sub
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* 2. Card-based List Layout: Curated Suggestions Line by Line */}
      <div className="space-y-3.5 flex-1 pb-6">
        {filtered.map((item, idx) => {
          const isSaved = savedTopics.includes(item.id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100 hover:border-slate-200 transition-all space-y-3"
            >
              {/* Header row: Subject, Importance indicator, and Bookmark */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md text-[11px]">
                    {item.subject}
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-semibold text-rose-600 text-[11px] flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{item.importance} Priority</span>
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-400 text-[11px]">~{item.expectedQuestions} MCQs</span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSave(item.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isSaved ? 'text-amber-500 bg-amber-50' : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title={isSaved ? 'Saved to study list' : 'Save for later'}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                </button>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {idx + 1}. {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Soft Divider & Recommended Chapters */}
              <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>অধ্যায়সমূহ:</span>
                  <span className="font-medium text-slate-700">
                    {item.recommendedChapters.join(', ')}
                  </span>
                </div>

                {onOpenQuestionTopic && (
                  <button
                    type="button"
                    onClick={() => onOpenQuestionTopic(item.subject)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
                  >
                    <span>Practice Questions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-100">
            No suggestions found for this subject category.
          </div>
        )}
      </div>
    </div>
  );
};
