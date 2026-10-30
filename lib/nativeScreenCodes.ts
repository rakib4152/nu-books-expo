export const NATIVE_SCREEN_CODES: Record<string, { title: string; filename: string; code: string }> = {
  'signin': {
    title: '1. Sign In Screen',
    filename: 'SignInScreen.tsx',
    code: `import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { User, Mail, ArrowRight } from 'lucide-react-native';

export default function SignInScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation?.navigate('Home');
    }, 600);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 justify-between p-6">
      <StatusBar barStyle="dark-content" />
      
      {/* Centered Welcoming Container */}
      <View className="flex-1 justify-center max-w-sm mx-auto w-full">
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-2xl bg-indigo-600 items-center justify-center shadow-lg shadow-indigo-600/30 mb-4">
            <Text className="text-white text-2xl font-bold">ED</Text>
          </View>
          <Text className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </Text>
          <Text className="text-sm text-slate-500 mt-2 text-center">
            Sign in to continue your educational quiz preparation
          </Text>
        </View>

        {/* Form Inputs */}
        <View className="space-y-4">
          <View>
            <Text className="text-xs font-semibold text-slate-700 mb-1.5 ml-1">
              Name
            </Text>
            <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-3.5 py-3 shadow-sm">
              <User size={18} color="#94a3b8" />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#94a3b8"
                className="flex-1 ml-2.5 text-sm text-slate-900"
              />
            </View>
          </View>

          <View>
            <Text className="text-xs font-semibold text-slate-700 mb-1.5 ml-1">
              Email
            </Text>
            <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-3.5 py-3 shadow-sm">
              <Mail size={18} color="#94a3b8" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#94a3b8"
                className="flex-1 ml-2.5 text-sm text-slate-900"
              />
            </View>
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity
            onPress={handleSignIn}
            disabled={loading}
            activeOpacity={0.9}
            className="w-full flex-row items-center justify-center py-3.5 px-4 rounded-xl bg-indigo-600 mt-2 shadow-md shadow-indigo-600/25 min-h-[48px]"
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Text className="text-white font-semibold text-sm mr-2">
                  Sign In
                </Text>
                <ArrowRight size={18} color="#ffffff" />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Social Sign-in Section */}
        <View className="my-6">
          <View className="flex-row items-center my-4">
            <View className="flex-1 h-[1px] bg-slate-200" />
            <Text className="px-3 text-xs text-slate-400 font-medium">
              Or continue with
            </Text>
            <View className="flex-1 h-[1px] bg-slate-200" />
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-1 flex-row items-center justify-center py-3 rounded-xl bg-white border border-slate-200 shadow-sm"
            >
              <Text className="text-red-500 font-bold text-base mr-2">G</Text>
              <Text className="text-slate-700 font-semibold text-xs">Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-1 flex-row items-center justify-center py-3 rounded-xl bg-white border border-slate-200 shadow-sm"
            >
              <Text className="text-blue-600 font-bold text-base mr-2">F</Text>
              <Text className="text-slate-700 font-semibold text-xs">Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer Switch */}
      <View className="items-center py-2 border-t border-slate-200/60">
        <TouchableOpacity
          onPress={() => navigation?.navigate('SignUp')}
          className="flex-row items-center"
        >
          <Text className="text-xs text-slate-500">Don't have an account? </Text>
          <Text className="text-xs font-semibold text-indigo-600">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}`
  },

  'signup': {
    title: '2. Registration Form / Sign Up Screen',
    filename: 'SignUpScreen.tsx',
    code: `import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { User, BookOpen, MapPin, School, ChevronDown, ArrowLeft } from 'lucide-react-native';

export default function SignUpScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('Science (বিজ্ঞান বিভাগ)');
  const [thana, setThana] = useState('Dhanmondi, Dhaka');
  const [collegeName, setCollegeName] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 items-center justify-center mr-3 shadow-sm"
          >
            <ArrowLeft size={18} color="#334155" />
          </TouchableOpacity>
          <View>
            <Text className="text-2xl font-bold text-slate-900">
              Registration Form
            </Text>
            <Text className="text-xs text-slate-500 mt-0.5">
              Enter your student details to register
            </Text>
          </View>
        </View>

        {/* Form Body */}
        <View className="space-y-4">
          {/* Name */}
          <View>
            <Text className="text-xs font-semibold text-slate-700 mb-1.5 ml-1">
              Name
            </Text>
            <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-3.5 py-3 shadow-sm">
              <User size={18} color="#94a3b8" />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#94a3b8"
                className="flex-1 ml-2.5 text-sm text-slate-900"
              />
            </View>
          </View>

          {/* Subject Dropdown Style */}
          <View>
            <Text className="text-xs font-semibold text-slate-700 mb-1.5 ml-1">
              Subject
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center justify-between bg-white border border-slate-200 rounded-xl px-3.5 py-3.5 shadow-sm"
            >
              <View className="flex-row items-center flex-1">
                <BookOpen size={18} color="#94a3b8" />
                <Text className="ml-2.5 text-sm text-slate-900">{subject}</Text>
              </View>
              <ChevronDown size={18} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Thana / Location Dropdown with Arrow Icon */}
          <View>
            <Text className="text-xs font-semibold text-slate-700 mb-1.5 ml-1">
              Thana / Location
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center justify-between bg-white border border-slate-200 rounded-xl px-3.5 py-3.5 shadow-sm"
            >
              <View className="flex-row items-center flex-1">
                <MapPin size={18} color="#94a3b8" />
                <Text className="ml-2.5 text-sm text-slate-900">{thana}</Text>
              </View>
              <ChevronDown size={18} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* College Name */}
          <View>
            <Text className="text-xs font-semibold text-slate-700 mb-1.5 ml-1">
              College Name
            </Text>
            <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-3.5 py-3 shadow-sm">
              <School size={18} color="#94a3b8" />
              <TextInput
                value={collegeName}
                onChangeText={setCollegeName}
                placeholder="e.g. Dhaka College"
                placeholderTextColor="#94a3b8"
                className="flex-1 ml-2.5 text-sm text-slate-900"
              />
            </View>
          </View>

          {/* Bottom Submit Button */}
          <TouchableOpacity
            onPress={() => navigation?.navigate('Home')}
            activeOpacity={0.9}
            className="w-full py-4 rounded-xl bg-indigo-600 items-center justify-center mt-4 shadow-md shadow-indigo-600/30"
          >
            <Text className="text-white font-bold text-sm">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}`
  },

  'home': {
    title: '3. Home Screen',
    filename: 'HomeScreen.tsx',
    code: `import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Search, BookOpen, HelpCircle, Sparkles, History, ChevronRight } from 'lucide-react-native';

export default function HomeScreen({ navigation }: any) {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Top Hero Area: Greeting Banner "Education" */}
        <View className="p-4">
          <View className="bg-indigo-600 rounded-2xl p-5 shadow-md shadow-indigo-600/20">
            <Text className="text-[11px] font-bold text-indigo-200 tracking-wider uppercase">
              PORTAL
            </Text>
            <Text className="text-2xl font-bold text-white mt-1">
              Education
            </Text>
            <Text className="text-xs text-indigo-100 mt-1 leading-relaxed">
              Prepare for your upcoming examinations with chapterwise practice.
            </Text>
          </View>
        </View>

        {/* Search or Filter Bar */}
        <View className="px-4 mb-4">
          <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-3.5 py-3 shadow-sm">
            <Search size={18} color="#94a3b8" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search subjects, questions, topics..."
              placeholderTextColor="#94a3b8"
              className="flex-1 ml-2.5 text-sm text-slate-900"
            />
          </View>
        </View>

        {/* Horizontal Scroll Cards Section for Subjects */}
        <View className="px-4 mb-5">
          <Text className="text-sm font-bold text-slate-900 mb-3">
            Subjects
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3">
            {['ICT & Computer', 'Physics', 'Mathematics', 'Chemistry'].map((sub, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => navigation?.navigate('Question')}
                className="w-36 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm mr-3"
              >
                <View className="w-9 h-9 rounded-xl bg-indigo-50 items-center justify-center mb-3">
                  <BookOpen size={18} color="#4f46e5" />
                </View>
                <Text className="text-xs font-bold text-slate-900">{sub}</Text>
                <Text className="text-[10px] text-indigo-600 font-semibold mt-1.5">Practice</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom Secondary Feature Blocks */}
        <View className="px-4 space-y-3">
          <Text className="text-sm font-bold text-slate-900 mb-2">
            Exam Preparation Blocks
          </Text>

          <TouchableOpacity
            onPress={() => navigation?.navigate('Question')}
            className="flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-xl bg-indigo-50 items-center justify-center mr-3">
                <HelpCircle size={20} color="#4f46e5" />
              </View>
              <View>
                <Text className="text-sm font-bold text-slate-900">Question Screen</Text>
                <Text className="text-xs text-slate-500">Chapterwise multiple-choice test</Text>
              </View>
            </View>
            <ChevronRight size={18} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation?.navigate('Suggestion')}
            className="flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-xl bg-amber-50 items-center justify-center mr-3">
                <Sparkles size={20} color="#d97706" />
              </View>
              <View>
                <Text className="text-sm font-bold text-slate-900">Suggestions (সুপারিশসমূহ)</Text>
                <Text className="text-xs text-slate-500">Curated exam topics and priority tips</Text>
              </View>
            </View>
            <ChevronRight size={18} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation?.navigate('PreviousYear')}
            className="flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-xl bg-emerald-50 items-center justify-center mr-3">
                <History size={20} color="#059669" />
              </View>
              <View>
                <Text className="text-sm font-bold text-slate-900">Previous Year Questions</Text>
                <Text className="text-xs text-slate-500">বিগত বছরের প্রশ্ন ও সমাধান</Text>
              </View>
            </View>
            <ChevronRight size={18} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}`
  },

  'question': {
    title: '4. Question Screen',
    filename: 'QuestionScreen.tsx',
    code: `import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView
} from 'react-native';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react-native';

export default function QuestionScreen({ navigation }: any) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = [
    'প্রথম প্রজন্ম (1st Generation)',
    'দ্বিতীয় প্রজন্ম (2nd Generation)',
    'তৃতীয় প্রজন্ম (3rd Generation)',
    'চতুর্থ প্রজন্ম (4th Generation)'
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50 justify-between p-4">
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Top Header Container: "প্রশ্নসমূহ:" */}
        <View className="flex-row items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation?.goBack()}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 items-center justify-center mr-2.5 shadow-sm"
            >
              <ChevronLeft size={20} color="#334155" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-slate-900">
              প্রশ্নসমূহ: <Text className="text-indigo-600 text-sm font-semibold">(ICT)</Text>
            </Text>
          </View>
          <Text className="text-xs font-semibold text-slate-500">প্রশ্ন 1 / 25</Text>
        </View>

        {/* Main Central Card: Question Text */}
        <View className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-4">
          <Text className="text-xs font-semibold text-indigo-600 mb-1">
            বহুনির্বাচনি প্রশ্ন (MCQ)
          </Text>
          <Text className="text-base font-bold text-slate-900 leading-snug">
            কোন প্রজন্মের কম্পিউটারে প্রথম ইন্টিগ্রেটেড সার্কিট (IC) ব্যবহার করা হয়?
          </Text>
        </View>

        {/* Multiple Choice Option Cards with Active Touch States */}
        <View className="space-y-3">
          {options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedOption(idx)}
                activeOpacity={0.8}
                className={\`flex-row items-center justify-between p-4 rounded-2xl border shadow-sm \${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-600'
                    : 'bg-white border-slate-200'
                }\`}
              >
                <View className="flex-row items-center flex-1">
                  <View
                    className={\`w-7 h-7 rounded-lg items-center justify-center mr-3 \${
                      isSelected ? 'bg-indigo-600' : 'bg-slate-100'
                    }\`}
                  >
                    <Text
                      className={\`text-xs font-bold \${
                        isSelected ? 'text-white' : 'text-slate-600'
                      }\`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </Text>
                  </View>
                  <Text
                    className={\`text-xs font-medium \${
                      isSelected ? 'text-indigo-950 font-semibold' : 'text-slate-800'
                    }\`}
                  >
                    {opt}
                  </Text>
                </View>
                {isSelected && <Check size={16} color="#4f46e5" />}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Navigation Controls at Bottom */}
      <View className="flex-row items-center justify-between pt-3 border-t border-slate-200">
        <TouchableOpacity
          className="flex-row items-center px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-sm"
        >
          <ChevronLeft size={16} color="#334155" />
          <Text className="text-xs font-medium text-slate-700 ml-1">Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center px-4 py-2.5 rounded-xl bg-indigo-600 shadow-md shadow-indigo-600/20"
        >
          <Text className="text-xs font-semibold text-white mr-1">Next</Text>
          <ChevronRight size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}`
  },

  'suggestion': {
    title: '5. Suggestion Screen',
    filename: 'SuggestionScreen.tsx',
    code: `import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { ChevronLeft, Sparkles, TrendingUp } from 'lucide-react-native';

export default function SuggestionScreen({ navigation }: any) {
  const suggestions = [
    {
      subject: 'ICT',
      title: 'ডিজিটাল লজিক ও বুলিয়ান অ্যালজেব্রা',
      desc: 'লজিক গেইট (NAND, NOR এর সার্বজনীনতা) ও ডিমরগ্যানের উপপাদ্য থেকে প্রশ্ন নিশ্চিত।'
    },
    {
      subject: 'Physics',
      title: 'ভেক্টর ও গতিবিদ্যা সমীকরণ',
      desc: 'নদী-নৌকার সমস্যা এবং ডট ও ক্রস গুণনের ব্যবহারিক প্রয়োগ ভালোভাবে রিভিশন দিন।'
    },
    {
      subject: 'Math',
      title: 'ক্যালকুলাস: অন্তরীকরণ ও নির্দিষ্ট যোগজ',
      desc: 'লিমিটের সূত্রাবলি এবং নির্দিষ্ট যোগজের ক্ষেত্রফল নির্ণয়ের প্রয়োগে সর্বোচ্চ গুরুত্ব দিন।'
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Top Header: "সুপারিশসমূহ" */}
        <View className="flex-row items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation?.goBack()}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 items-center justify-center mr-2.5 shadow-sm"
            >
              <ChevronLeft size={20} color="#334155" />
            </TouchableOpacity>
            <View>
              <Text className="text-xl font-bold text-slate-900">সুপারিশসমূহ</Text>
              <Text className="text-[11px] text-slate-500">Suggestions & High-Yield Topics</Text>
            </View>
          </View>
          <View className="flex-row items-center px-2 py-1 rounded-lg bg-amber-50">
            <Sparkles size={14} color="#d97706" />
            <Text className="text-xs font-bold text-amber-700 ml-1">99% Common</Text>
          </View>
        </View>

        {/* Card-based list layout with soft dividers */}
        <View className="space-y-3">
          {suggestions.map((item, idx) => (
            <View
              key={idx}
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  {item.subject}
                </Text>
                <View className="flex-row items-center">
                  <TrendingUp size={12} color="#dc2626" />
                  <Text className="text-[11px] font-semibold text-rose-600 ml-1">Very High Priority</Text>
                </View>
              </View>

              <Text className="text-sm font-bold text-slate-900">
                {idx + 1}. {item.title}
              </Text>
              <Text className="text-xs text-slate-600 mt-1 leading-relaxed">
                {item.desc}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}`
  },

  'previous': {
    title: '6. Previous Year Question Screen',
    filename: 'PreviousYearScreen.tsx',
    code: `import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { ChevronLeft, ArrowRight, BookOpen, Clock } from 'lucide-react-native';

export default function PreviousYearScreen({ navigation }: any) {
  const exams = [
    { year: 2024, name: 'এইচএসসি চূড়ান্ত পরীক্ষা ২০২৪ - ঢাকা বোর্ড', subject: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', qCount: 25 },
    { year: 2023, name: 'বুয়েট ভর্তি পরীক্ষা ২০২৩ - প্রিলিমিনারি সেট', subject: 'পদার্থবিজ্ঞান ও গণিত', qCount: 30 },
    { year: 2022, name: 'ঢাকা বিশ্ববিদ্যালয় "ক" ইউনিট ভর্তি পরীক্ষা ২০২২', subject: 'বিজ্ঞান বিভাগ সমন্বিত', qCount: 35 }
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header: "বিগত বছরের প্রশ্ন" */}
        <View className="flex-row items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation?.goBack()}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 items-center justify-center mr-2.5 shadow-sm"
            >
              <ChevronLeft size={20} color="#334155" />
            </TouchableOpacity>
            <View>
              <Text className="text-xl font-bold text-slate-900">বিগত বছরের প্রশ্ন</Text>
              <Text className="text-[11px] text-slate-500">Previous Year Questions Archive</Text>
            </View>
          </View>
        </View>

        {/* Exam Cards */}
        <View className="space-y-3">
          {exams.map((item, idx) => (
            <View
              key={idx}
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
            >
              <View className="flex-row items-center justify-between mb-2">
                <View className="px-2.5 py-0.5 rounded-lg bg-indigo-600">
                  <Text className="text-white text-xs font-bold">{item.year}</Text>
                </View>
                <Text className="text-xs text-slate-400">Board Question Paper</Text>
              </View>

              <Text className="text-sm font-bold text-slate-900 leading-snug">
                {item.name}
              </Text>
              <Text className="text-xs text-indigo-600 font-medium mt-1">
                বিষয়: {item.subject}
              </Text>

              {/* Bottom Action Row */}
              <View className="flex-row items-center justify-between pt-3 mt-3 border-t border-slate-100">
                <View className="flex-row items-center">
                  <BookOpen size={14} color="#94a3b8" />
                  <Text className="text-xs text-slate-500 ml-1">{item.qCount} প্রশ্ন</Text>
                </View>

                <TouchableOpacity
                  onPress={() => navigation?.navigate('Question')}
                  className="flex-row items-center px-3.5 py-1.5 rounded-xl bg-indigo-600"
                >
                  <Text className="text-white text-xs font-semibold mr-1">Solve</Text>
                  <ArrowRight size={14} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}`
  },

  'settings': {
    title: '7. Settings Screen',
    filename: 'SettingsScreen.tsx',
    code: `import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { ChevronLeft, User, Bell, Moon, Info, LogOut, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header: "Settings" */}
        <View className="flex-row items-center pb-3 border-b border-slate-200 mb-4">
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 items-center justify-center mr-2.5 shadow-sm"
          >
            <ChevronLeft size={20} color="#334155" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-slate-900">Settings</Text>
        </View>

        {/* Grouped Rows */}
        <View className="space-y-4">
          {/* Account */}
          <View>
            <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Account</Text>
            <View className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <TouchableOpacity className="flex-row items-center justify-between p-3.5">
                <View className="flex-row items-center">
                  <User size={18} color="#4f46e5" />
                  <Text className="text-xs font-semibold text-slate-800 ml-2.5">User Profile & Subject</Text>
                </View>
                <ChevronRight size={16} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Preferences with Toggles */}
          <View>
            <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Preferences</Text>
            <View className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
              <View className="flex-row items-center justify-between p-3.5">
                <View className="flex-row items-center">
                  <Bell size={18} color="#d97706" />
                  <Text className="text-xs font-semibold text-slate-800 ml-2.5">Daily Quiz Notifications</Text>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#e2e8f0', true: '#4f46e5' }}
                />
              </View>

              <View className="flex-row items-center justify-between p-3.5">
                <View className="flex-row items-center">
                  <Moon size={18} color="#7c3aed" />
                  <Text className="text-xs font-semibold text-slate-800 ml-2.5">Dark Mode</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#e2e8f0', true: '#4f46e5' }}
                />
              </View>
            </View>
          </View>

          {/* About & Logout */}
          <View>
            <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">System</Text>
            <View className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
              <TouchableOpacity className="flex-row items-center justify-between p-3.5">
                <View className="flex-row items-center">
                  <Info size={18} color="#64748b" />
                  <Text className="text-xs font-semibold text-slate-800 ml-2.5">About App (v2.4.0)</Text>
                </View>
                <ChevronRight size={16} color="#94a3b8" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation?.navigate('SignIn')}
                className="flex-row items-center justify-between p-3.5"
              >
                <View className="flex-row items-center">
                  <LogOut size={18} color="#dc2626" />
                  <Text className="text-xs font-semibold text-rose-600 ml-2.5">Logout</Text>
                </View>
                <ChevronRight size={16} color="#fca5a5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}`
  }
};
