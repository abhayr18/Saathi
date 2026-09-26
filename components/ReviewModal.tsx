'use client';

import React, { useState } from 'react';
import { Booking } from '@/types';
import { useApp } from '@/context/AppContext';
import { X, Star, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReviewModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ booking, onClose }) => {
  const { currentSenior, addReview } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Friendly',
    'Good Listener',
    'Respectful',
  ]);
  const [comment, setComment] = useState<string>(
    'Aditya was extraordinarily polite, patient, and made our chess match thoroughly enjoyable. Wonderful company!'
  );

  if (!booking) return null;

  const availableTags = [
    'Friendly',
    'Good Listener',
    'Punctual',
    'Helpful',
    'Respectful',
    'Enjoyable Conversation',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      bookingId: booking.id,
      companionId: booking.companionId,
      seniorId: currentSenior.id,
      seniorName: currentSenior.name,
      rating,
      tags: selectedTags,
      comment: comment.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-elevated border border-stone-200 relative p-5 sm:p-6 space-y-6 animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-xl font-black text-stone-900 font-display">
              How was your time with {booking.companionName.split(' ')[0]}?
            </h3>
            <p className="text-xs text-stone-500">
              {booking.activity} session on {booking.date}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Star selector */}
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Overall Rating
            </span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1.5 transition-transform hover:scale-125 focus:outline-none"
                  aria-label={`${star} Stars`}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-semibold text-saath-700">
              {rating === 5
                ? 'Exceptional & Heartwarming ★★★★★'
                : rating === 4
                ? 'Very Good ★★★★☆'
                : `${rating} Stars`}
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              What best describes your companion? (Select tags)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-400'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Review */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">
              Your Review / Message of Encouragement
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Write a few kind words about your companionship experience..."
              className="w-full p-3 rounded-2xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-saath-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-saath-600 hover:bg-saath-700 text-white font-bold py-3.5 rounded-2xl shadow-elevated transition-all flex items-center justify-center gap-2 text-base"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Submit Review</span>
          </button>
        </form>
      </div>
    </div>
  );
};
