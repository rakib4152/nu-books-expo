'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  User,
  Bell,
  Moon,
  Info,
  LogOut,
  ChevronRight,
  Shield,
  BookOpen,
  Smartphone,
  CheckCircle,
  HelpCircle,
  Globe
} from 'lucide-react';
import { UserProfile } from '@/types/education';

interface SettingsScreenProps {
  user: UserProfile;
  onBack: () => void;
  onLogout: () => void;
  onNavigateToSignIn: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  user,
  onBack,
  onLogout,
  onNavigateToSignIn
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [examReminders, setExamReminders] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<'bn' | 'en'>('bn');

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-800 p-4 sm:p-5 min-h-full overflow-y-auto">
      {/* 1. Header Titled "Settings" */}
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
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              Settings
            </h1>
            <p className="text-[11px] text-slate-500">
              User preferences, account details & alerts
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 my-3 flex-1 pb-6">
        {/* User Profile Summary Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-600/20 shrink-0">
            {user.name ? user.name[0].toUpperCase() : 'S'}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {user.name || 'Student Name'}
            </h3>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
            <p className="text-[11px] text-indigo-600 font-medium truncate mt-0.5">
              {user.collegeName || 'Dhaka College, Dhaka'}
            </p>
          </div>
        </div>

        {/* Group 1: Account & Profile Preferences */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-1.5 block">
            Account Details (অ্যাকাউন্ট)
          </span>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
            {/* Account Profile Row */}
            <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-slate-900 block truncate">
                    Academic Discipline
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">
                    {user.subject || 'Science (বিজ্ঞান বিভাগ)'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </div>

            {/* Thana / Region Row */}
            <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-slate-900 block truncate">
                    Location / Thana
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">
                    {user.thana || 'Dhanmondi, Dhaka'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Group 2: Notifications & Reminders (Toggle Switch) */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-1.5 block">
            Alerts & Notifications
          </span>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
            {/* Daily Quiz Notifications */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">
                    Daily Quiz Alerts
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Receive daily exam preparation questions
                  </span>
                </div>
              </div>
              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  notificationsEnabled ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
                aria-label="Toggle notifications"
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Exam Date Reminders */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">
                    Board Exam Countdown
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Countdown alerts for upcoming board exams
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setExamReminders(!examReminders)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  examReminders ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
                aria-label="Toggle exam reminders"
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    examReminders ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Group 3: Appearance & Language */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-1.5 block">
            Appearance & System
          </span>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
            {/* Theme / Dark Mode Row */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">
                    Theme / Dark Mode
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Optimized for night study sessions
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDarkModeEnabled(!darkModeEnabled)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  darkModeEnabled ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
                aria-label="Toggle dark mode"
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    darkModeEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">
                    App Language
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    বাংলা (Bengali) / English
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedLanguage('bn')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    selectedLanguage === 'bn' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  বাং
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLanguage('en')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    selectedLanguage === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Group 4: About & Help */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-1.5 block">
            Information & Support
          </span>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
            {/* About Row */}
            <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">
                    About App (সংস্করণ v2.4.0)
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Education Quiz & Preparation Framework
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </div>

            {/* Logout Row (Red Action) */}
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center justify-between p-3.5 hover:bg-rose-50/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <LogOut className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-rose-600 block">
                    Log Out (লগআউট)
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    Sign out of this mobile device
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-rose-400 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
