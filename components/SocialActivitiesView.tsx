'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SocialActivity } from '@/types';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  Sparkles,
  Heart,
  Smile,
  Smartphone,
  Music,
  Trees,
  Gamepad2,
  ChevronRight,
  Filter,
  UserCheck
} from 'lucide-react';

interface SocialActivitiesViewProps {
  onBookCompanionForActivity?: (activity: SocialActivity) => void;
}

export const SocialActivitiesView: React.FC<SocialActivitiesViewProps> = ({
  onBookCompanionForActivity,
}) => {
  const {
    role,
    language,
    currentSenior,
    currentStudent,
    socialActivities,
    registerForActivity,
    unregisterFromActivity,
  } = useApp();

  const isMr = language === 'mr';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const activeUserId = role === 'student' ? currentStudent.id : currentSenior.id;

  const categories = [
    { id: 'all', labelMr: 'सर्व उपक्रम', labelEn: 'All Activities', icon: Sparkles },
    { id: 'health', labelMr: 'आरोग्य व हास्य', labelEn: 'Health & Yoga', icon: Smile },
    { id: 'tech', labelMr: 'स्मार्टफोन व टेक', labelEn: 'Tech & Digital', icon: Smartphone },
    { id: 'culture', labelMr: 'नाट्यसंगीत व कट्टा', labelEn: 'Music & Culture', icon: Music },
    { id: 'games', labelMr: 'बुद्धिबळ व खेळ', labelEn: 'Board Games', icon: Gamepad2 },
    { id: 'nature', labelMr: 'बागकाम व निसर्ग', labelEn: 'Gardening & Nature', icon: Trees },
  ];

  const filteredActivities = socialActivities.filter(act => {
    if (selectedCategory !== 'all' && act.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchMr = act.titleMr.toLowerCase().includes(q) || act.locationMr.toLowerCase().includes(q);
      const matchEn = act.titleEn.toLowerCase().includes(q) || act.locationEn.toLowerCase().includes(q);
      if (!matchMr && !matchEn) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/60 rounded-3xl p-6 sm:p-8 border border-orange-200/70 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-orange-200 text-saath-700 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>{isMr ? 'सामुदायिक कट्टा व सामाजिक उपक्रम' : 'Community Katta & Social Activities'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display tracking-tight">
            {isMr ? 'आपला हक्काचा सामाजिक कट्टा' : 'Social Activities & Community Katta'}
          </h1>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            {isMr
              ? 'ज्येष्ठ नागरिक आणि तरुण मित्रांसाठी खास एकत्र येण्याचे, शिकण्याचे आणि आनंद लुटण्याचे स्थानिक उपक्रम. एकटेपणाला निरोप द्या, नवीन मित्र जोडा!'
              : 'Curated local gatherings, morning walking clubs, digital workshops, and nostalgic music kattas bridging generations.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-stone-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{isMr ? 'सुरक्षित व आदरयुक्त वातावरण' : 'Respectful & Safe Environment'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{isMr ? 'कॉलेज सोबती सोबत हजेरी' : 'Companions Available to Escort'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{isMr ? 'विनामूल्य नोंदणी' : 'Free Community Entry'}</span>
            </span>
          </div>
        </div>

        {/* Decorative Devanagari Background Element */}
        <div className="absolute right-4 -bottom-6 select-none pointer-events-none opacity-[0.06] text-stone-900 font-black text-9xl">
          कट्टा
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold shrink-0 transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-saath-600 text-white border-saath-600 shadow-sm shadow-saath-500/20'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-orange-300 hover:bg-orange-50/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-stone-500'}`} />
                  <span>{isMr ? cat.labelMr : cat.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={isMr ? 'उपक्रम किंवा ठिकाण शोधा...' : 'Search by name or place...'}
              className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-saath-500 shadow-xs"
            />
            <Filter className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map(act => {
          const isRegistered = act.registeredUserIds.includes(activeUserId);
          const spotsLeft = act.maxParticipants - act.registeredCount;
          const isFull = spotsLeft <= 0;

          return (
            <div
              key={act.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-soft hover:shadow-card transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative h-44 overflow-hidden bg-stone-100">
                  <img
                    src={act.imageUrl}
                    alt={act.titleMr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-stone-800 shadow-xs">
                      {act.companionFriendly && <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}
                      <span>{isMr ? 'सोबती-स्नेही उपक्रम' : 'Companion Friendly'}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-medium text-amber-200">{act.date} • {act.time}</p>
                    <h3 className="text-lg font-bold font-display leading-snug drop-shadow-xs">
                      {isMr ? act.titleMr : act.titleEn}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3.5">
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {isMr ? act.descriptionMr : act.descriptionEn}
                  </p>

                  <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-saath-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-stone-800">{isMr ? act.locationMr : act.locationEn}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-stone-400 shrink-0" />
                      <span className="text-stone-500">{isMr ? 'आयोजक:' : 'Host:'} {act.hostName}</span>
                    </div>
                  </div>

                  {/* Spots Bar */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-stone-500 font-medium">
                        {act.registeredCount} / {act.maxParticipants} {isMr ? 'नोंदणीकृत' : 'registered'}
                      </span>
                      <span className={`font-bold ${spotsLeft <= 5 ? 'text-amber-600' : 'text-emerald-700'}`}>
                        {spotsLeft > 0
                          ? `${spotsLeft} ${isMr ? 'जागा शिल्लक' : 'spots left'}`
                          : isMr ? 'प्रवेश पूर्ण' : 'Full'}
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          spotsLeft <= 5 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, (act.registeredCount / act.maxParticipants) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button Footer */}
              <div className="p-5 pt-0">
                {isRegistered ? (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 py-2.5 px-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>{isMr ? 'नोंदणी झाली आहे ✓' : 'Registered ✓'}</span>
                    </div>
                    <button
                      onClick={() => unregisterFromActivity(act.id)}
                      className="text-xs text-stone-500 hover:text-rose-600 font-semibold px-3 py-2.5 rounded-xl border border-stone-200 hover:border-rose-200 hover:bg-rose-50 transition-colors"
                      title={isMr ? 'नोंदणी रद्द करा' : 'Cancel Registration'}
                    >
                      {isMr ? 'रद्द' : 'Cancel'}
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={isFull}
                    onClick={() => registerForActivity(act.id)}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${
                      isFull
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                        : 'bg-saath-600 hover:bg-saath-700 active:scale-98 text-white shadow-saath-600/20'
                    }`}
                  >
                    <span>{isFull ? (isMr ? 'जागा उपलब्ध नाहीत' : 'Event Full') : (isMr ? 'सहभागी व्हा (मोफत नोंदणी)' : 'Register for Free')}</span>
                    {!isFull && <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Student Escort Info Card */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
            🎓
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">
              {isMr ? 'सोबती विद्यार्थ्यांसाठी सामाजिक जबाबदारी व सन्मान' : 'For Student Companions: Community Escort Honorarium'}
            </h4>
            <p className="text-xs text-stone-600 mt-0.5">
              {isMr
                ? 'ज्येष्ठ नागरिकांना सकाळी हास्य क्लब, टेक कार्यशाळा किंवा कट्ट्याला सोबत नेणे व सुरक्षित परत आणण्यासाठी सोबतीला ठरलेले मानधन दिले जाते.'
                : 'Accompanying seniors to morning walks, digital workshops, or kattas earns student companions a safe stipend.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
