import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ChapterFlow - Chapterwise PDF Mobile Reader',
  description: 'High-performance chapterwise PDF mobile reader with offline caching, dynamic TOC breakdown, and real-time reading progress synchronization.',
  openGraph: {
    title: 'ChapterFlow - Chapterwise PDF Mobile Reader',
    description: 'High-performance chapterwise PDF mobile reader with offline caching, dynamic TOC breakdown, and real-time reading progress synchronization.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChapterFlow - Chapterwise PDF Mobile Reader',
    description: 'High-performance chapterwise PDF mobile reader with offline caching, dynamic TOC breakdown, and real-time reading progress synchronization.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500/20 selection:text-amber-300">
        {children}
      </body>
    </html>
  );
}
