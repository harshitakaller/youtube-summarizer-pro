
import React, { useState } from 'react';
import Header from './components/Header';
import UrlInput from './components/UrlInput';
import ResultView from './components/ResultView';
import { analyzeYoutubeVideo } from './services/geminiService';
import { AppState, VideoAnalysis, SummaryLength } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<VideoAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (url: string, length: SummaryLength) => {
    setState(AppState.LOADING);
    setError(null);
    try {
      const analysis = await analyzeYoutubeVideo(url, length);
      setResult(analysis);
      setState(AppState.SUCCESS);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setState(AppState.ERROR);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f8fafc] flex flex-col">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
      
      <main className="container mx-auto py-12 flex-grow">
        <Header />
        
        <UrlInput 
          onSubmit={handleUrlSubmit} 
          isLoading={state === AppState.LOADING} 
        />

        {state === AppState.ERROR && (
          <div className="w-full max-w-3xl mx-auto mt-12 space-y-6 animate-in fade-in zoom-in duration-300 px-4">
            {/* Main Error Alert */}
            <div className="p-8 bg-white border border-red-100 rounded-3xl shadow-xl shadow-red-500/5 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Analysis Error</h3>
              <p className="text-slate-600 mb-8 max-w-md whitespace-pre-wrap">
                {error?.startsWith('MISSING_KEY') ? "Your API Key is missing or not configured correctly." : error}
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setState(AppState.IDLE)}
                  className="bg-slate-900 text-white font-bold px-8 py-3 rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                >
                  Try Again
                </button>
              </div>
            </div>

            {/* Step-by-Step Setup Guide */}
            <div className="p-8 bg-indigo-900 text-white rounded-3xl shadow-2xl relative">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Setup Guide: How to Fix This
              </h4>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase text-xs tracking-widest">
                    <span>Option A</span>
                    <div className="h-px flex-grow bg-indigo-300/20"></div>
                  </div>
                  <p className="font-bold text-lg">On Netlify (Production)</p>
                  <ul className="space-y-3 text-sm opacity-90">
                    <li className="flex gap-2">
                      <span className="bg-indigo-700 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">1</span>
                      <span>Go to <b>Site Configuration</b> &gt; <b>Environment variables</b>.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-indigo-700 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">2</span>
                      <span>Add Variable: Key = <code className="bg-black/30 px-1 rounded text-pink-300 font-mono">API_KEY</code></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-indigo-700 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">3</span>
                      <span>Value = <span className="text-emerald-300 underline underline-offset-4 decoration-emerald-300/30 font-mono">your_gemini_key_here</span></span>
                    </li>
                    <li className="flex gap-2 font-bold text-indigo-200">
                      <span className="bg-indigo-700 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">4</span>
                      <span>IMPORTANT: Clear cache & Deploy site!</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase text-xs tracking-widest">
                    <span>Option B</span>
                    <div className="h-px flex-grow bg-indigo-300/20"></div>
                  </div>
                  <p className="font-bold text-lg">Locally (On your PC)</p>
                  <ul className="space-y-3 text-sm opacity-90">
                    <li className="flex gap-2">
                      <span className="bg-indigo-700 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">1</span>
                      <span>Create a file named <code className="bg-black/30 px-1 rounded font-mono">.env</code> in your root folder.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-indigo-700 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">2</span>
                      <span>Paste: <code className="bg-black/30 px-1 rounded text-xs text-pink-300 font-mono">VITE_API_KEY=your_key_here</code></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-indigo-700 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">3</span>
                      <span>Restart your VS Code terminal (run <code className="bg-black/30 px-1 rounded font-mono">npm run dev</code>).</span>
                    </li>
                  </ul>
                  <p className="text-[10px] pt-4 opacity-60">Need a key? Get one free at <a href="https://aistudio.google.com/" target="_blank" className="underline hover:text-white">aistudio.google.com</a></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {state === AppState.LOADING && (
          <div className="mt-24 flex flex-col items-center justify-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-8 text-slate-500 font-medium animate-pulse text-center max-w-xs px-4">
              Gemini is utilizing Google Search to deeply analyze the video content...
            </p>
          </div>
        )}

        {state === AppState.SUCCESS && result && (
          <ResultView data={result} />
        )}
      </main>

      <footer className="w-full py-8 text-center text-slate-400 text-sm border-t border-slate-100 bg-white/50 backdrop-blur-sm mt-12">
        <p>&copy; {new Date().getFullYear()} YT Summarizer Pro. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
