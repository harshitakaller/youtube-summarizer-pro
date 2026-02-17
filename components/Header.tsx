
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        YouTube <span className="text-indigo-600">Summarizer</span> Pro
      </h1>
      <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto px-4">
        Extract deep insights, detailed summaries, and key topics from any YouTube video in seconds using advanced Gemini AI.
      </p>
    </header>
  );
};

export default Header;
