'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { StudentProfile } from '@/types';
import { calculateCompatibility } from '@/lib/matching';
import {
  X,
  Sparkles,
  Check,
  Star,
  MapPin,
  GraduationCap,
  Calendar,
  Clock,
  ArrowRight,
  Heart,
  ChevronRight,
  Search,
  CheckCircle2
} from 'lucide-react';

interface SmartMatchmakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStudent: (student: StudentProfile) => void;
  onBookStudent: (student: StudentProfile) => void;
}

const INTEREST_OPTIONS = [
  { id: 'Chess', labelMr: 'बुद्धिबळ व कॅरम', labelEn: 'Chess & Carrom', icon: '♟️' },
  { id: 'Conversation', labelMr: 'चहा व मनमोकळ्या गप्पा', labelEn: 'Chai & Conversations', icon: '☕' },
  { id: 'Technology Help', labelMr: 'स्मार्टफोन व UPI मार्गदर्शन', labelEn: 'Smartphones & Tech Help', icon: '📱' },
  { id: 'Walking', labelMr: 'सकाळ / संध्याकाळची फेरी', labelEn: 'Colony & Park Walks', icon: '🚶‍♂️' },
  { id: 'Reading', labelMr: 'मराठी साहित्य व वाचन', labelEn: 'Marathi Literature & Reading', icon: '📚' },
  { id: 'Music', labelMr: 'नाट्यसंगीत व जुनी भावगीते', labelEn: 'Natyasangeet & Retro Songs', icon: '🎵' },
  { id: 'Gardening', labelMr: 'गच्चीवरील बागकाम व रोपे', labelEn: 'Terrace Gardening', icon: '🌿' },
  { id: 'Storytelling', labelMr: 'जुने अनुभव व आठवणी', labelEn: 'Life Stories & Nostalgia', icon: '📖' },
  { id: 'Cooking', labelMr: 'पारंपरिक पाककला चर्चा', labelEn: 'Traditional Cooking Talk', icon: '🍲' },
];

const LOCALITY_OPTIONS = [
  'सर्व भाग (All Areas)',
  'Rajarampuri, Kolhapur',
  'Tarabai Park, Kolhapur',
  'Shahupuri, Kolhapur',
  'Nagala Park, Kolhapur',
  'Kothrud, Pune',
  'Vishrambag, Sangli',
];

const DAYS_OPTIONS = [
  { id: 'all', labelMr: 'कोणताही दिवस', labelEn: 'Any Day' },
  { id: 'Saturday', labelMr: 'शनिवार', labelEn: 'Saturday' },
  { id: 'Sunday', labelMr: 'रविवार', labelEn: 'Sunday' },
  { id: 'Monday', labelMr: 'सोमवार', labelEn: 'Monday' },
  { id: 'Wednesday', labelMr: 'बुधवार', labelEn: 'Wednesday' },
  { id: 'Friday', labelMr: 'शुक्रवार', labelEn: 'Friday' },
];

export const SmartMatchmakerModal: React.FC<SmartMatchmakerModalProps> = ({
  isOpen,
  onClose,
  onSelectStudent,
  onBookStudent,
}) => {
  const { currentSenior, students, language, updateSeniorProfile, showToast } = useApp();
  const isMr = language === 'mr';

  // Selection states
  const [selectedInterests, setSelectedInterests] = useState<string[]>(currentSenior.interests || ['Chess', 'Conversation']);
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedLocality, setSelectedLocality] = useState<string>('सर्व भाग (All Areas)');

  if (!isOpen) return null;

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interestId)) {
        if (prev.length <= 1) return prev; // Keep at least one
        return prev.filter(i => i !== interestId);
      } else {
        return [...prev, interestId];
      }
    });
  };

  // Rank students dynamically based on selected interests & preferences
  const matchedCompanions = useMemo(() => {
    const tempSenior = {
      ...currentSenior,
      interests: selectedInterests,
    };

    return students
      .map(student => {
        const matchResult = calculateCompatibility(tempSenior, student, {
          day: selectedDay !== 'all' ? selectedDay : undefined,
          interest: selectedInterests[0],
        });
        return {
          ...student,
          matchResult,
        };
      })
      .sort((a, b) => b.matchResult.score - a.matchResult.score);
  }, [students, currentSenior, selectedInterests, selectedDay]);

  const handleSaveToProfile = () => {
    updateSeniorProfile({ interests: selectedInterests });
    showToast(isMr ? 'तुमच्या आवडी यशस्वीरित्या जतन केल्या आहेत! ✓' : 'Interests updated in your profile! ✓');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/50 border-b border-orange-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-saath-600 text-white flex items-center justify-center shadow-md shadow-saath-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900 font-display">
                {isMr ? 'स्मार्ट सोबती मॅचमेकर' : 'Smart Companion Matchmaker'}
              </h2>
              <p className="text-xs text-stone-600">
                {isMr
                  ? 'तुमच्या आवडीनिवडी निवडा आणि सर्वात जुळणारा हक्काचा तरुण सोबती शोधा'
                  : 'Choose your interests and get algorithmically matched with verified college companions'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200/60 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Step 1: Select Interests */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-saath-100 text-saath-700 text-xs flex items-center justify-center font-bold">१</span>
                <span>{isMr ? 'तुम्हाला कशात जास्त आवड आहे? (आवडी निवडा):' : 'What do you enjoy the most? (Select interests):'}</span>
              </label>
              <button
                onClick={handleSaveToProfile}
                className="text-xs font-semibold text-saath-600 hover:text-saath-700 underline"
              >
                {isMr ? 'प्रोफाइलमध्ये जतन करा' : 'Save to profile'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {INTEREST_OPTIONS.map(opt => {
                const isSelected = selectedInterests.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleInterest(opt.id)}
                    className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-orange-50/80 border-saath-500 text-stone-900 shadow-xs'
                        : 'bg-stone-50/50 border-stone-200 text-stone-600 hover:border-orange-300 hover:bg-white'
                    }`}
                  >
                    <span className="text-xl shrink-0">{opt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate text-stone-900">
                        {isMr ? opt.labelMr : opt.labelEn}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-saath-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Preferred Day & Locality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                {isMr ? '२. भेटण्यासाठी सोयीस्कर दिवस:' : '2. Preferred visit day:'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {DAYS_OPTIONS.map(day => (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDay(day.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      selectedDay === day.id
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {isMr ? day.labelMr : day.labelEn}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                {isMr ? '३. परिसर / शहर:' : '3. Locality / Area:'}
              </label>
              <select
                value={selectedLocality}
                onChange={e => setSelectedLocality(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-saath-500"
              >
                {LOCALITY_OPTIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Matched Companions Results */}
          <div className="space-y-4 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  {isMr ? 'सर्वोत्तम जुळणारे साथीदार (Top Compatibility Matches)' : 'Best Matching Companions'}
                </h3>
                <p className="text-[11px] text-stone-500">
                  {isMr
                    ? `${matchedCompanions.length} पडताळणी झालेले विद्यार्थी उपलब्ध आहेत`
                    : `${matchedCompanions.length} verified college companions ready`}
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {isMr ? '९०%+ सुसंगत' : '90%+ Matches'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedCompanions.slice(0, 4).map(student => (
                <div
                  key={student.id}
                  className="bg-white rounded-2xl p-4 border border-stone-200 hover:border-saath-400 hover:shadow-card transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0 w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-xs">
                      <img
                        src={student.profilePhoto}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-sm font-bold text-stone-900 truncate">
                          {student.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded-md bg-orange-100 text-saath-800 font-extrabold text-[11px] shrink-0">
                          {student.matchResult.score}% {isMr ? 'मॅच' : 'Match'}
                        </span>
                      </div>

                      <p className="text-[11px] text-stone-500 truncate flex items-center gap-1 mt-0.5">
                        <GraduationCap className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{student.course} ({student.college.split(',')[0]})</span>
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-stone-500 mt-1">
                        <span className="flex items-center gap-1 font-semibold text-stone-700">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span>{student.rating}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          <span>{student.distanceKm} km ({student.area})</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Reason Pills */}
                  <div className="bg-stone-50 p-2.5 rounded-xl text-[11px] text-stone-600 space-y-1">
                    <p className="font-semibold text-stone-800 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>{isMr ? 'जुळण्याचे मुख्य कारण:' : 'Matching Highlights:'}</span>
                    </p>
                    <p className="text-stone-600 leading-snug">
                      {student.matchResult.reasons.slice(0, 2).join(' • ')}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectStudent(student);
                      }}
                      className="flex-1 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-colors"
                    >
                      {isMr ? 'प्रोफाइल पाहा' : 'View Profile'}
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onBookStudent(student);
                      }}
                      className="flex-1 py-2 rounded-xl bg-saath-600 hover:bg-saath-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <span>{isMr ? 'भेट बुक करा' : 'Book Visit'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            {isMr ? 'सर्व कॉलेज साथीदार अधिकृत आयडी व मुलाखतीद्वारे पडताळलेले आहेत.' : 'All companions are background verified and trained.'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors"
          >
            {isMr ? 'पूर्ण झाले' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
