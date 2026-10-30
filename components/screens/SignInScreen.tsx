'use client';

import React, { useState } from 'react';
import { User, Mail, ArrowRight, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '@/types/education';

interface SignInScreenProps {
  onSignInSuccess: (user: Partial<UserProfile>) => void;
  onNavigateToSignUp: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onSignInSuccess,
  onNavigateToSignUp
}) => {
  const [name, setName] = useState('Md. Rakibul Hasan');
  const [email, setEmail] = useState('rakib.edu.bd@gmail.com');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess({ name, email });
    }, 600);
  };

  const handleSocialSignIn = (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess({
        name: provider === 'google' ? 'Google Student' : 'Facebook Scholar',
        email: `student@${provider}.com`
      });
    }, 500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 text-slate-800 p-6 min-h-full">
      {/* Top Branding & Welcoming Header */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full py-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
            Sign in to continue your educational quiz preparation and practice
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
              {errorMessage}
            </div>
          )}

          {/* Name Input Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Email Input Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all disabled:opacity-70 min-h-[48px]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-slate-50 text-slate-400 font-medium">Or continue with</span>
          </div>
        </div>

        {/* Social Sign-In Buttons Section */}
        <div className="grid grid-cols-2 gap-3">
          {/* Google Button */}
          <button
            type="button"
            onClick={() => handleSocialSignIn('google')}
            className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700 text-xs font-semibold shadow-sm transition-all active:scale-[0.98] min-h-[44px]"
          >
            <span className="font-bold text-red-500 text-sm">G</span>
            <span>Google</span>
          </button>

          {/* Facebook Button */}
          <button
            type="button"
            onClick={() => handleSocialSignIn('facebook')}
            className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700 text-xs font-semibold shadow-sm transition-all active:scale-[0.98] min-h-[44px]"
          >
            <span className="font-bold text-blue-600 text-sm">F</span>
            <span>Facebook</span>
          </button>
        </div>
      </div>

      {/* Footer Switch to Sign Up */}
      <div className="text-center pt-4 pb-2 border-t border-slate-200/80">
        <p className="text-xs text-slate-500">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onNavigateToSignUp}
            className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center gap-0.5"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};
