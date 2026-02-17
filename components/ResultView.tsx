
import React from 'react';
import { VideoAnalysis } from '../types';

interface ResultViewProps {
  data: VideoAnalysis;
}

const ResultView: React.FC<ResultViewProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 leading-tight">
          {data.title}
        </h2>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {data.keywords.map((keyword, i) => (
            <span 
              key={i} 
              className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-full border border-slate-200"
            >
              #{keyword}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 border-t border-slate-100 pt-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Detailed Summary
            </h3>
            <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
              {data.summary}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Key Takeaways
              </h3>
              <ul className="space-y-4">
                {data.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex gap-3 text-slate-600">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-snug">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {data.sources.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  Sources & Grounding
                </h3>
                <div className="space-y-2">
                  {data.sources.map((source, i) => (
                    source.web && (
                      <a 
                        key={i} 
                        href={source.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block px-4 py-2 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 text-xs font-medium rounded-lg border border-indigo-100 transition-colors overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {source.web.title || source.web.uri}
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-indigo-600 font-medium hover:underline text-sm"
        >
          Analyze another video
        </button>
      </div>
    </div>
  );
};

export default ResultView;
