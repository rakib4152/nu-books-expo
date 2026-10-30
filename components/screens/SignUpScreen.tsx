'use client';

import React, { useState } from 'react';
import { User, BookOpen, MapPin, School, ChevronDown, CheckCircle, ArrowLeft } from 'lucide-react';
import { UserProfile } from '@/types/education';

interface SignUpScreenProps {
  onSignUpSuccess: (user: Partial<UserProfile>) => void;
  onNavigateToSignIn: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onSignUpSuccess,
  onNavigateToSignIn
}) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('Science (বিজ্ঞান বিভাগ)');
  const [thana, setThana] = useState('Dhanmondi (ধানমন্ডি)');
  const [collegeName, setCollegeName] = useState('');
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [isThanaDropdownOpen, setIsThanaDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const subjectOptions = [
    'Science (বিজ্ঞান বিভাগ)',
    'Commerce / Business Studies (ব্যবসায় শিক্ষা)',
    'Humanities / Arts (মানবিক বিভাগ)',
    'Computer Science & ICT (আইসিটি)',
    'Medical & Dental Admission (মেডিকেল ভর্তি প্রস্তুতি)',
    'Engineering & Technical (ইঞ্জিনিয়ারিং প্রস্তুতি)'
  ];

  const thanaOptions = [
    'Dhanmondi (ধানমন্ডি, ঢাকা)',
    'Mirpur (মিরপুর, ঢাকা)',
    'Uttara (উত্তরা, ঢাকা)',
    'Kotwali (কোতোয়ালী, চট্টগ্রাম)',
    'Boalia (বোয়ালিয়া, রাজশাহী)',
    'Sadar (সদর, সিলেট)',
    'Khulna Sadar (খুলনা সদর)',
    'Barisal Sadar (বরিশাল সদর)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!collegeName.trim()) {
      setErrorMessage('Please enter your College or Institution name');
      return;
    }

    setErrorMessage('');
    setIsSuccess(true);

    setTimeout(() => {
      onSignUpSuccess({
        name,
        subject,
        thana,
        collegeName,
        email: `${name.toLowerCase().replace(/\s+/g, '')}@student.edu.bd`
      });
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 text-slate-800 p-6 min-h-full overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center gap-3 mb-4 pt-1">
        <button
          type="button"
          onClick={onNavigateToSignIn}
          aria-label="Back to Sign In"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Registration Form
          </h1>
          <p className="text-xs text-slate-500">
            Create your student profile to access exams and suggestions
          </p>
        </div>
      </div>

      {/* Main Scrollable Form Body */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-4 my-2 max-w-sm mx-auto w-full">
        {errorMessage && (
          <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
            {errorMessage}
          </div>
        )}

        {/* 1. Name Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">
            Full Name (শিক্ষার্থীর নাম)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tanvir Ahmed"
              className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* 2. Subject Dropdown Selector Style */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">
            Subject / Discipline (বিষয় বা বিভাগ)
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
                setIsThanaDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between pl-3.5 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-left transition-all min-h-[44px]"
            >
              <div className="flex items-center gap-2.5 truncate">
                <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{subject}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
            </button>

            {isSubjectDropdownOpen && (
              <div className="absolute z-30 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 p-1">
                {subjectOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSubject(opt);
                      setIsSubjectDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                      subject === opt ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt}</span>
                    {subject === opt && <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3. Thana / Location Dropdown Style Container */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">
            Thana / Location (থানা / অঞ্চল)
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsThanaDropdownOpen(!isThanaDropdownOpen);
                setIsSubjectDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between pl-3.5 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-left transition-all min-h-[44px]"
            >
              <div className="flex items-center gap-2.5 truncate">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{thana}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
            </button>

            {isThanaDropdownOpen && (
              <div className="absolute z-30 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 p-1">
                {thanaOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setThana(opt);
                      setIsThanaDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                      thana === opt ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt}</span>
                    {thana === opt && <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4. College Name Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">
            College Name (কলেজের নাম)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <School className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              placeholder="e.g. Notre Dame College, Dhaka"
              className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Bottom Submit Action Button ("Sign Up") */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSuccess}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all disabled:opacity-80 min-h-[48px]"
          >
            {isSuccess ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>Account Created!</span>
              </div>
            ) : (
              <span>Sign Up (নিবন্ধন সম্পন্ন করুন)</span>
            )}
          </button>
        </div>
      </form>

      {/* Switch to Sign In */}
      <div className="text-center pt-4 pb-1 border-t border-slate-200/80">
        <p className="text-xs text-slate-500">
          Already registered?{' '}
          <button
            type="button"
            onClick={onNavigateToSignIn}
            className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center gap-0.5"
          >
            Sign In here
          </button>
        </p>
      </div>
    </div>
  );
};
