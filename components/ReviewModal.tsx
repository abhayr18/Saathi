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
  const { currentSenior, addReview, language } = useApp();
  const isMr = language === 'mr';

  const [rating, setRating] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Friendly',
    'Good Listener',
    'Respectful',
  ]);
  const [comment, setComment] = useState<string>(
    isMr
      ? 'आदित्य खूप नम्र, संयमी आणि आदरयुक्त आहे. बुद्धिबळ खेळताना आणि गप्पा मारताना खूप आनंद झाला!'
      : 'Aditya was extraordinarily polite, patient, and made our chess match thoroughly enjoyable. Wonderful company!'
  );

  if (!booking) return null;

  const availableTags = [
    { id: 'Friendly', label: isMr ? 'मनमिळाऊ' : 'Friendly' },
    { id: 'Good Listener', label: isMr ? 'उत्तम श्रोता' : 'Good Listener' },
    { id: 'Punctual', label: isMr ? 'वेळेचे काटेकोर' : 'Punctual' },
    { id: 'Helpful', label: isMr ? 'मदतनीस' : 'Helpful' },
    { id: 'Respectful', label: isMr ? 'आदरयुक्त' : 'Respectful' },
    { id: 'Enjoyable Conversation', label: isMr ? 'आनंददायी गप्पा' : 'Enjoyable Conversation' },
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
              {isMr
                ? `${booking.companionName.split(' ')[0]} यांच्यासोबतची भेट कशी वाटली?`
                : `How was your time with ${booking.companionName.split(' ')[0]}?`}
            </h3>
            <p className="text-xs text-stone-500">
              {isMr ? `${booking.date} रोजी ${booking.activity} सत्र` : `${booking.activity} session on ${booking.date}`}
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
              {isMr ? 'एकूण रेटिंग' : 'Overall Rating'}
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
                ? (isMr ? 'उत्कृष्ट व मनसोक्त ★★★★★' : 'Exceptional & Heartwarming ★★★★★')
                : rating === 4
                ? (isMr ? 'खूप छान ★★★★☆' : 'Very Good ★★★★☆')
                : `${rating} ${isMr ? 'स्टार्स' : 'Stars'}`}
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              {isMr ? 'तुमच्या सोबत्याचे वर्णन कसे कराल? (पर्याय निवडा)' : 'What best describes your companion? (Select tags)'}
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tagObj => {
                const isSelected = selectedTags.includes(tagObj.id);
                return (
                  <button
                    key={tagObj.id}
                    type="button"
                    onClick={() => toggleTag(tagObj.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-400'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {tagObj.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Review */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">
              {isMr ? 'तुमचा अभिप्राय / कौतुकाचे दोन शब्द' : 'Your Review / Message of Encouragement'}
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder={isMr ? 'तुमच्या अनुभवाबद्दल दोन शब्द लिहा...' : 'Write a few kind words about your companionship experience...'}
              className="w-full p-3 rounded-2xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-saath-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-saath-600 hover:bg-saath-700 text-white font-bold py-3.5 rounded-2xl shadow-elevated transition-all flex items-center justify-center gap-2 text-base"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>{isMr ? 'अभिप्राय सादर करा' : 'Submit Review'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
