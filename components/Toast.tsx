'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="bg-stone-900/95 text-white px-5 py-3.5 rounded-2xl shadow-elevated border border-stone-700/50 flex items-center gap-3 backdrop-blur-md max-w-md">
        <div className="w-8 h-8 rounded-full bg-saath-500/20 text-saath-400 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-saath-400" />
        </div>
        <p className="text-sm font-medium text-stone-100 flex-1 leading-snug">
          {toastMessage}
        </p>
        <button
          onClick={() => showToast('')}
          className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
