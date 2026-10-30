'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  BookOpen,
  HelpCircle,
  Sparkles,
  History,
  Award,
  ChevronRight,
  Atom,
  Binary,
  Calculator,
  Compass,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { UserProfile } from '@/types/education';

interface HomeScreenProps {
  user: UserProfile;
  onNavigateToQuestions: (subjectFilter?: string) => void;
  onNavigateToSuggestions: () => void;
  onNavigateToPreviousYears: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  onNavigateToQuestions,
  onNavigateToSuggestions,
  onNavigateToPreviousYears
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const subjects = [
    { id: 'all', name: 'All Subjects', nameBn: 'সব বিষয়', count: 140, icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'ict', name: 'ICT & CS', nameBn: 'তথ্য ও প্রযুক্তি', count: 45, icon: Binary, color: 'text-blue-600 bg-blue-50' },
    { id: 'physics', name: 'Physics', nameBn: 'পদার্থবিজ্ঞান', count: 32, icon: Atom, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'math', name: 'Mathematics', nameBn: 'উচ্চতর গণিত', count: 38, icon: Calculator, color: 'text-amber-600 bg-amber-50' },
    { id: 'general', name: 'General Test', nameBn: 'সাধারণ জ্ঞান', count: 25, icon: Compass, color: 'text-purple-600 bg-purple-50' }
  ];

  const quickStats = [
    { label: 'Exams Solved', value: '18', suffix: 'tests' },
    { label: 'Accuracy', value: '88%', suffix: 'avg' },
    { label: 'Study Streak', value: '5', suffix: 'days' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-800 overflow-y-auto">
      {/* 1. Top Hero Area: Greeting Card / Banner titled "Education" */}
      <div className="p-4 sm:p-5">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 text-white p-5 sm:p-6 shadow-md border border-indigo-500/30">
          {/* Subtle background illustration overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none">
            <Image
              src="/images/education_hero_banner.jpg"
              alt="Education Study Desk"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-200">
                EDUCATION PORTAL
              </span>
              <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-medium text-white">
                HSC & Admission
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
              Education & Quiz Prep
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/90 max-w-xs leading-relaxed">
              Hello, {user.name || 'Scholar'}! Prepare for exams with curated questions and verified suggestions.
            </p>

            {/* Quick KPI Strip inside Hero */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/15">
              {quickStats.map((st, i) => (
                <div key={i} className="text-left">
                  <div className="text-base sm:text-lg font-bold text-white tabular-nums">
                    {st.value}
                  </div>
                  <div className="text-[10px] text-indigo-200 font-medium">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar Component */}
      <div className="px-4 sm:px-5 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, topics, formulas..."
            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* 3. Subjects Horizontal Scroll / Content Grid Section */}
      <div className="px-4 sm:px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900">
            Featured Subjects (বিষয়সমূহ)
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            5 Categories
          </span>
        </div>

        {/* Horizontal scroll cards representing subjects */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {subjects.map((sub) => {
            const Icon = sub.icon;
            const isSelected = selectedSubject === sub.id;

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => {
                  setSelectedSubject(sub.id);
                  onNavigateToQuestions(sub.id === 'all' ? undefined : sub.name);
                }}
                className={`flex-shrink-0 w-36 p-3.5 rounded-2xl bg-white border text-left transition-all active:scale-[0.98] shadow-sm ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                    : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 ${sub.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  {sub.name}
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {sub.nameBn}
                </div>
                <div className="text-[10px] text-indigo-600 font-semibold mt-2">
                  {sub.count} Questions
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Section with Secondary Feature Blocks */}
      <div className="px-4 sm:px-5 pb-6 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 mb-2">
          Exam Modules & Shortcuts
        </h2>

        {/* Feature Block A: Question Bank / Practice Tests */}
        <div
          onClick={() => onNavigateToQuestions()}
          className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-300 shadow-sm cursor-pointer transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Question Bank (প্রশ্নসমূহ)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Practice chapterwise MCQs with instant answer validation
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Feature Block B: Suggestions ("সুপারিশসমূহ") */}
        <div
          onClick={onNavigateToSuggestions}
          className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-300 shadow-sm cursor-pointer transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Exam Suggestions (সুপারিশসমূহ)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Hand-picked high-yield topics and expected question topics
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Feature Block C: Previous Year Questions ("বিগত বছরের প্রশ্ন") */}
        <div
          onClick={onNavigateToPreviousYears}
          className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-300 shadow-sm cursor-pointer transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Past Year Papers (বিগত বছরের প্রশ্ন)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Solve board and university question papers from 2021–2024
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
