'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  Calendar,
  Users,
  Clock,
  BookOpen,
  ArrowRight,
  Filter,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { PREVIOUS_YEAR_EXAMS } from '@/lib/educationData';
import { PreviousYearExam } from '@/types/education';

interface PreviousYearScreenProps {
  onBack: () => void;
  onSolveExam: (exam: PreviousYearExam) => void;
}

export const PreviousYearScreen: React.FC<PreviousYearScreenProps> = ({
  onBack,
  onSolveExam
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const years = ['All', '2024', '2023', '2022', '2021'];

  const filteredExams = selectedYear === 'All'
    ? PREVIOUS_YEAR_EXAMS
    : PREVIOUS_YEAR_EXAMS.filter((e) => e.year === parseInt(selectedYear, 10));

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-800 p-4 sm:p-5 min-h-full overflow-y-auto">
      {/* 1. Header Section Titled "বিগত বছরের প্রশ্ন" (Previous Year Questions) */}
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
              <span>বিগত বছরের প্রশ্ন</span>
              <span className="text-xs font-normal text-slate-500 font-sans">(Past Papers)</span>
            </h1>
            <p className="text-[11px] text-slate-500">
              Board & Admission test archives from 2021 to 2024
            </p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <FileText className="w-4 h-4" />
        </div>
      </div>

      {/* Year Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-3">
        {years.map((yr) => (
          <button
            key={yr}
            type="button"
            onClick={() => setSelectedYear(yr)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
              selectedYear === yr
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {yr === 'All' ? 'সব বছর (All Years)' : `${yr} সাল`}
          </button>
        ))}
      </div>

      {/* 2. List Layout: Cards representing past exam year sets */}
      <div className="space-y-3.5 flex-1 pb-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100 hover:border-slate-300 transition-all space-y-3"
          >
            {/* Top row: Year Badge and Board Info */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs tabular-nums shadow-sm">
                  {exam.year}
                </span>
                <span className="font-semibold text-slate-700">
                  {exam.boardOrUniversity}
                </span>
              </div>

              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{(exam.participantsCount / 1000).toFixed(0)}k+ Candidates</span>
              </span>
            </div>

            {/* Exam Title & Subject */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {exam.examName}
              </h3>
              <p className="text-xs text-indigo-600 font-medium mt-1">
                বিষয়: {exam.subject}
              </p>
            </div>

            {/* Bottom Row: Metadata & Action Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span className="tabular-nums font-medium">{exam.totalQuestions} প্রশ্ন</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="tabular-nums font-medium">{exam.timeMinutes} মিনিট</span>
                </span>
              </div>

              {/* Action Button to View Details / Solve */}
              <button
                type="button"
                onClick={() => onSolveExam(exam)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold shadow-sm transition-all min-h-[38px]"
              >
                <span>সমাধান করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredExams.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-100">
            No past exam papers found for this year selection.
          </div>
        )}
      </div>
    </div>
  );
};
