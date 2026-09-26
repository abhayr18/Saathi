'use client';

import React from 'react';
import { StudentProfile } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  X,
  Star,
  MapPin,
  GraduationCap,
  ShieldCheck,
  Calendar,
  Clock,
  MessageSquare,
  Sparkles,
  CheckCircle,
  ThumbsUp,
  Tag
} from 'lucide-react';

interface CompanionProfileModalProps {
  student: StudentProfile | null;
  onClose: () => void;
  onBook: (student: StudentProfile) => void;
  onMessage: (student: StudentProfile) => void;
}

export const CompanionProfileModal: React.FC<CompanionProfileModalProps> = ({
  student,
  onClose,
  onBook,
  onMessage,
}) => {
  const { reviews } = useApp();

  if (!student) return null;

  // Filter reviews for this student
  const studentReviews = reviews.filter(r => r.companionId === student.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-elevated border border-stone-200 relative animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header / Cover */}
        <div className="relative h-40 sm:h-52 bg-gradient-to-r from-saath-700 via-amber-600 to-saath-600 rounded-t-3xl p-4 sm:p-6 flex items-start justify-between text-white">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>Verified Student Companion</span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-900/40 hover:bg-stone-900/70 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Details Container */}
        <div className="px-4 sm:px-6 pb-8 space-y-6 sm:space-y-8 -mt-14 sm:-mt-16">
          {/* Avatar and Top Stats Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4">
              <div className="relative">
                <img
                  src={student.profilePhoto}
                  alt={student.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-elevated"
                />
                {student.isVerified && (
                  <div
                    className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1.5 rounded-xl border-2 border-white shadow-md flex items-center justify-center"
                    title="Official College ID Verified"
                  >
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
                    {student.name}
                  </h2>
                  <span className="text-sm font-bold text-stone-400">({student.age} yrs)</span>
                </div>
                <p className="text-sm text-stone-600 font-medium">
                  {student.course} • {student.year}
                </p>
                <p className="text-xs text-saath-700 font-bold flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{student.college}</span>
                </p>
              </div>
            </div>

            {/* Price Badge */}
            <div className="bg-saath-50 border border-saath-200 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-left sm:text-center shrink-0 w-full sm:w-auto flex items-center justify-between sm:block">
              <span className="text-xs text-stone-500 font-medium block">Standard Rate</span>
              <span className="text-xl sm:text-2xl font-black text-saath-800">
                ₹{student.hourlyRate}
                <span className="text-xs font-normal text-stone-500"> / hour</span>
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200/80 text-center">
            <div>
              <span className="text-[11px] text-stone-400 uppercase font-bold block">Rating</span>
              <div className="flex items-center justify-center gap-1 text-stone-900 font-bold text-base mt-0.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{student.rating}</span>
                <span className="text-xs text-stone-400 font-normal">({student.reviewCount})</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-stone-400 uppercase font-bold block">Distance</span>
              <div className="flex items-center justify-center gap-1 text-stone-900 font-bold text-base mt-0.5">
                <MapPin className="w-4 h-4 text-saath-600" />
                <span>{student.distanceKm} km</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-stone-400 uppercase font-bold block">Sessions</span>
              <div className="text-stone-900 font-bold text-base mt-0.5">
                <span>{student.completedSessionsCount}+ visits</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-stone-400 uppercase font-bold block">Identity</span>
              <div className="flex items-center justify-center gap-1 text-emerald-700 font-bold text-base mt-0.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm">Verified</span>
              </div>
            </div>
          </div>

          {/* About Bio */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-stone-900 font-display">About Aditya</h3>
            <p className="text-stone-700 text-base leading-relaxed bg-stone-50/60 p-4 rounded-2xl border border-stone-100">
              "{student.bio}"
            </p>
          </div>

          {/* Languages & Interests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider text-xs">
                Languages Spoken Fluently
              </h4>
              <div className="flex flex-wrap gap-2">
                {student.languages.map(l => (
                  <span
                    key={l}
                    className="bg-stone-100 text-stone-800 text-sm font-bold px-3 py-1.5 rounded-xl border border-stone-200"
                  >
                    🗣️ {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider text-xs">
                Activities I Enjoy
              </h4>
              <div className="flex flex-wrap gap-2">
                {student.activities.map(a => (
                  <span
                    key={a}
                    className="bg-saath-50 text-saath-800 text-sm font-bold px-3 py-1.5 rounded-xl border border-saath-200"
                  >
                    ✓ {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Availability Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900 font-display flex items-center gap-2">
                <Calendar className="w-5 h-5 text-saath-600" />
                <span>Weekly Available Slots</span>
              </h3>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ● Accepting Requests
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {student.availability.map((slot, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between"
                >
                  <span className="font-bold text-stone-900 text-sm">{slot.day}</span>
                  <span className="text-xs font-semibold text-saath-700 bg-saath-100/70 px-2 py-0.5 rounded-md">
                    {slot.startTime} – {slot.endTime}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews & Feedback Section */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900 font-display flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <span>Reviews from Seniors ({studentReviews.length})</span>
              </h3>
              <span className="text-sm font-bold text-stone-700">★ {student.rating} average</span>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {studentReviews.length === 0 ? (
                <p className="text-stone-500 text-sm italic">No reviews yet for this student companion.</p>
              ) : (
                studentReviews.map(r => (
                  <div
                    key={r.id}
                    className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-saath-200 text-saath-800 font-bold text-xs flex items-center justify-center">
                          {r.seniorName.charAt(0)}
                        </div>
                        <span className="font-bold text-stone-900 text-sm">{r.seniorName}</span>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    {r.tags && r.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {r.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md"
                          >
                            ✓ {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-stone-700 italic leading-relaxed">
                      "{r.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sticky Actions Bar */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onMessage(student);
              }}
              className="px-6 py-3.5 rounded-2xl border border-stone-300 font-bold text-stone-700 hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5 text-saath-600" />
              <span>Message {student.name.split(' ')[0]}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBook(student);
              }}
              className="flex-1 bg-saath-600 hover:bg-saath-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-elevated transition-all flex items-center justify-center gap-2 text-base"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Session with {student.name.split(' ')[0]} (₹{student.hourlyRate}/hr)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
