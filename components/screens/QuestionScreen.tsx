'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Sparkles,
  RotateCcw,
  Check,
  Bookmark
} from 'lucide-react';
import { SAMPLE_QUESTIONS } from '@/lib/educationData';

interface QuestionScreenProps {
  onBack: () => void;
  initialSubjectFilter?: string;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  onBack,
  initialSubjectFilter
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(45);

  const questions = initialSubjectFilter
    ? SAMPLE_QUESTIONS.filter((q) =>
        q.subject.toLowerCase().includes(initialSubjectFilter.toLowerCase())
      ).length > 0
      ? SAMPLE_QUESTIONS.filter((q) =>
          q.subject.toLowerCase().includes(initialSubjectFilter.toLowerCase())
        )
      : SAMPLE_QUESTIONS
    : SAMPLE_QUESTIONS;

  const currentQ = questions[currentIndex] || SAMPLE_QUESTIONS[0];
  const userSelectedOptionId = selectedAnswers[currentQ.id];
  const hasAnswered = !!userSelectedOptionId;
  const isCorrect = userSelectedOptionId === currentQ.correctOptionId;

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId
    }));
    setShowExplanation(true);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowExplanation(false);
    setCurrentIndex(0);
  };

  // Option labels A, B, C, D
  const optionLetters = ['ক', 'খ', 'গ', 'ঘ'];
  const optionLettersEn = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 text-slate-800 p-4 sm:p-5 min-h-full overflow-y-auto">
      {/* 1. Top Header Container: Category Title & Question Numbering ("প্রশ্নসমূহ:") */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm transition-all"
            aria-label="Back to home"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-1.5">
              <span>প্রশ্নসমূহ:</span>
              <span className="text-indigo-600 font-semibold text-xs sm:text-sm">
                ({currentQ.subject})
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              প্রশ্ন {currentIndex + 1} / {questions.length} · {currentQ.chapter}
            </p>
          </div>
        </div>

        {/* Right tools: Timer & Bookmark */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-mono tabular-nums text-[11px] font-semibold">
              00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-white border shadow-sm transition-colors ${
              isBookmarked ? 'border-amber-400 text-amber-500' : 'border-slate-200 text-slate-400'
            }`}
            title="Bookmark question"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-1.5 rounded-full my-3 overflow-hidden">
        <div
          className="bg-indigo-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* 2. Main Central Card Area: Question Text Clearly with Ample Padding */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 my-2">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-semibold text-indigo-600">Question #{currentIndex + 1}</span>
          <span className="text-slate-500">{currentQ.difficulty}</span>
        </div>

        {/* Question Text */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {currentQ.questionText}
        </h2>

        {/* Subtitle / English formulation */}
        {currentQ.questionTextBn && (
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            {currentQ.questionTextBn}
          </p>
        )}
      </div>

      {/* 3. Multiple-Choice Option Cards with Active Touch States */}
      <div className="space-y-2.5 my-3 flex-1">
        {currentQ.options.map((opt, idx) => {
          const isSelected = userSelectedOptionId === opt.id;
          const isThisCorrect = opt.id === currentQ.correctOptionId;

          // Determine styling based on answered state
          let cardStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-800';
          let badgeStyle = 'bg-slate-100 text-slate-600 border-slate-200';

          if (hasAnswered) {
            if (isThisCorrect) {
              cardStyle = 'bg-emerald-50/70 border-emerald-500 text-emerald-950 font-medium ring-1 ring-emerald-500/20';
              badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
            } else if (isSelected && !isThisCorrect) {
              cardStyle = 'bg-rose-50/70 border-rose-400 text-rose-950 ring-1 ring-rose-400/20';
              badgeStyle = 'bg-rose-600 text-white border-rose-600';
            }
          } else if (isSelected) {
            cardStyle = 'bg-indigo-50 border-indigo-600 text-indigo-950 font-medium ring-2 ring-indigo-500/20';
            badgeStyle = 'bg-indigo-600 text-white border-indigo-600';
          }

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelectOption(opt.id)}
              className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border text-left transition-all active:scale-[0.99] shadow-sm min-h-[48px] ${cardStyle}`}
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${badgeStyle}`}
                >
                  {hasAnswered && isThisCorrect ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : hasAnswered && isSelected && !isThisCorrect ? (
                    <XCircle className="w-4 h-4" />
                  ) : (
                    <span>{optionLetters[idx]}</span>
                  )}
                </div>
                <span className="text-xs sm:text-sm font-medium leading-relaxed">
                  {opt.text}
                </span>
              </div>

              <span className="text-[11px] text-slate-400 font-mono shrink-0">
                ({optionLettersEn[idx]})
              </span>
            </button>
          );
        })}

        {/* Explanation Card upon selection */}
        {showExplanation && currentQ.explanation && (
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl mt-3 animate-fade-in text-xs leading-relaxed text-indigo-950">
            <div className="flex items-center gap-1.5 font-bold text-indigo-700 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>সঠিক উত্তরের ব্যাখ্যা (Explanation):</span>
            </div>
            <p className="text-slate-700">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* 4. Navigation Controls & Action Buttons at Bottom */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200 mt-2 gap-3">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 font-medium text-xs disabled:opacity-40 disabled:cursor-not-allowed shadow-sm min-h-[44px]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>পূর্ববর্তী (Prev)</span>
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Reset quiz"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
          className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-indigo-600/20 min-h-[44px]"
        >
          <span>পরবর্তী (Next)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
