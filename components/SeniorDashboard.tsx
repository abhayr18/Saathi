'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { StudentProfile } from '@/types';
import { calculateCompatibility } from '@/lib/matching';
import {
  Compass,
  Calendar,
  MessageSquare,
  ShieldAlert,
  Star,
  MapPin,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Clock,
  Heart,
  Users,
  Coffee,
} from 'lucide-react';

interface SeniorDashboardProps {
  onNavigate: (tab: string) => void;
  onSelectStudent: (student: StudentProfile) => void;
  onBookStudent: (student: StudentProfile) => void;
  onOpenSos: () => void;
}

export const SeniorDashboard: React.FC<SeniorDashboardProps> = ({
  onNavigate,
  onSelectStudent,
  onBookStudent,
  onOpenSos,
}) => {
  const { currentSenior, students, bookings, language } = useApp();
  const isMr = language === 'mr';

  // Find next upcoming session
  const upcomingSession = bookings.find(
    b => b.seniorId === currentSenior.id && ['accepted', 'pending'].includes(b.status)
  );

  // Top recommended companions
  const recommendedStudents = students
    .map(student => ({
      ...student,
      matchResult: calculateCompatibility(currentSenior, student, { interest: 'Chess' }),
    }))
    .sort((a, b) => b.matchResult.score - a.matchResult.score)
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">

      {/* ── 1. WARM GREETING & HIGH-CONTRAST SOS BAR ── */}
      <div className="bg-gradient-to-r from-teal-50/95 via-sky-50/60 to-slate-50 rounded-3xl p-6 sm:p-8 text-stone-900 border-2 border-teal-200/80 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-3 border-white shadow-md">
              <img
                src={currentSenior.profilePhoto}
                alt={currentSenior.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-teal-200 text-xs font-black text-teal-800 shadow-2xs">
                <span>📍 {currentSenior.area}, {currentSenior.city}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-stone-900">
                {isMr
                  ? `शुभ संध्याकाळ, ${currentSenior.name.split(' ')[0]}जी 👋`
                  : `Good evening, ${currentSenior.name.split(' ')[0]} 👋`}
              </h1>
              <p className="text-stone-600 text-sm sm:text-base font-medium">
                {isMr
                  ? 'आपुलकीने संवाद साधणारा आणि वेळ देणारा हक्काचा तरुण सोबती निवडा.'
                  : 'Choose a verified young companion to share unhurried conversations and joy.'}
              </p>
            </div>
          </div>

          {/* Senior High-Contrast Emergency Action Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSos}
              className="bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-black text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-elevated border-2 border-rose-300 flex items-center justify-center gap-2.5 transition-all"
            >
              <ShieldAlert className="w-5 h-5 text-white animate-pulse" />
              <span>{isMr ? 'तात्काळ SOS मदत (112)' : 'EMERGENCY SOS'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. 3 LARGE SENIOR ACTION TILES (MAIN INTERFACE FOR ELDERS) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TILE 1: 🤝 सोबती निवडा (Choose Companion) */}
        <div
          onClick={() => onNavigate('discovery')}
          className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-teal-200 hover:border-saath-500 shadow-soft hover:shadow-card transition-all cursor-pointer flex flex-col justify-between group active:scale-98"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                🤝
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                {isMr ? '१-क्लिक शोध' : 'Quick Find'}
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-saath-700 transition-colors">
                {isMr ? 'सोबती निवडा' : 'Choose Companion'}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm font-medium mt-1 leading-snug">
                {isMr
                  ? 'बुद्धिबळ, मॉर्निंग वॉक, वाचन किंवा फोन शिकण्यासाठी विश्वासू विद्यार्थी सोबती.'
                  : 'Find verified college youth for chess, walking, reading or phone assistance.'}
              </p>
            </div>
          </div>

          <div className="pt-6 mt-2">
            <div className="w-full bg-saath-600 group-hover:bg-saath-700 text-white font-black py-3.5 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors">
              <Compass className="w-4 h-4" />
              <span>{isMr ? 'सोबती शोधा ➔' : 'Find Companions ➔'}</span>
            </div>
          </div>
        </div>

        {/* TILE 2: 📅 माझे वेळापत्रक (My Schedule) */}
        <div
          onClick={() => onNavigate('bookings')}
          className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-200 hover:border-blue-400 shadow-soft hover:shadow-card transition-all cursor-pointer flex flex-col justify-between group active:scale-98"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                📅
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {upcomingSession ? (isMr ? 'नियोजित भेट' : 'Scheduled') : (isMr ? 'वेळापत्रक' : 'Schedule')}
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-blue-700 transition-colors">
                {isMr ? 'माझे वेळापत्रक' : 'My Schedule'}
              </h3>
              {upcomingSession ? (
                <div className="mt-2 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-0.5">
                  <p className="font-black text-sm">
                    {upcomingSession.activity} ({upcomingSession.companionName})
                  </p>
                  <p className="font-semibold text-stone-600">
                    {upcomingSession.date} • {upcomingSession.timeSlot}
                  </p>
                </div>
              ) : (
                <p className="text-stone-600 text-xs sm:text-sm font-medium mt-1 leading-snug">
                  {isMr
                    ? 'आपल्या सर्व भेटी, तारीख, वेळ आणि पूर्वीचे सत्र अहवाल येथे पहा.'
                    : 'View your upcoming visits, date, time slots, and past session logs.'}
                </p>
              )}
            </div>
          </div>

          <div className="pt-6 mt-2">
            <div className="w-full bg-blue-600 group-hover:bg-blue-700 text-white font-black py-3.5 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors">
              <Calendar className="w-4 h-4" />
              <span>{isMr ? 'वेळापत्रक पहा ➔' : 'View Schedule ➔'}</span>
            </div>
          </div>
        </div>

        {/* TILE 3: ☕ कट्टा व मित्र (Community Katta) */}
        <div
          onClick={() => onNavigate('activities')}
          className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-200 hover:border-amber-400 shadow-soft hover:shadow-card transition-all cursor-pointer flex flex-col justify-between group active:scale-98"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                ☕
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                {isMr ? 'सामाजिक मंडळ' : 'Social Club'}
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-amber-700 transition-colors">
                {isMr ? 'कट्टा व मित्रमंडळ' : 'Community Katta'}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm font-medium mt-1 leading-snug">
                {isMr
                  ? 'हास्य क्लब, चहापान गप्पागोष्टी, भजन व समवयस्क मित्रांसोबत संवाद.'
                  : 'Laughter club, tea meetups, music circles and friendly senior gatherings.'}
              </p>
            </div>
          </div>

          <div className="pt-6 mt-2">
            <div className="w-full bg-amber-600 group-hover:bg-amber-700 text-white font-black py-3.5 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors">
              <Users className="w-4 h-4" />
              <span>{isMr ? 'कट्ट्यात सामील व्हा ➔' : 'Join Katta ➔'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── 3. SHIFT TO COMPANIONS: SHIFARAS KELELE SOBATI ── */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-saath-600" />
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
                {isMr ? 'आपल्यासाठी शिफारस केलेले सोबती' : 'Recommended Companions for You'}
              </h2>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm font-medium">
              {isMr
                ? `आपल्या आवडीनुसार सर्वोत्तम जुळणारे (${currentSenior.interests.join(', ')})`
                : `Top matches tailored to your interests (${currentSenior.interests.join(', ')})`}
            </p>
          </div>

          <button
            onClick={() => onNavigate('discovery')}
            className="text-saath-700 hover:text-saath-800 text-sm font-black flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>{isMr ? 'सर्व सोबती पहा' : 'View All Mitras'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Large Visual Companion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedStudents.map(student => {
            const { score, reasons } = student.matchResult;
            const isHighMatch = score >= 90;

            return (
              <div
                key={student.id}
                className={`bg-white rounded-3xl border-2 p-6 flex flex-col justify-between transition-all hover:shadow-card group ${
                  isHighMatch
                    ? 'border-saath-400 ring-2 ring-saath-100 shadow-soft'
                    : 'border-stone-200'
                }`}
              >
                <div className="space-y-4">
                  {/* Photo, match % and rate */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 border-stone-200 shadow-xs">
                      <img
                        src={student.profilePhoto}
                        alt={student.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {student.isVerified && (
                        <div className="absolute top-1 right-1 bg-emerald-600 text-white p-1 rounded-full shadow-xs">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="text-right space-y-1">
                      <span
                        className={`inline-block px-3 py-0.5 rounded-full text-xs font-black ${
                          isHighMatch
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-teal-50 text-teal-800 border border-teal-200'
                        }`}
                      >
                        {score}% {isMr ? 'मॅच' : 'Match'}
                      </span>
                      <div className="text-lg font-black text-stone-900">
                        ₹{student.hourlyRate}/{isMr ? 'तास' : 'hr'}
                      </div>
                    </div>
                  </div>

                  {/* Name and college */}
                  <div>
                    <h3 className="text-xl font-black text-stone-900 group-hover:text-saath-700 transition-colors">
                      {student.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium flex items-center gap-1 mt-0.5">
                      <GraduationCap className="w-4 h-4 text-saath-600 shrink-0" />
                      <span className="truncate">{student.college}</span>
                    </p>
                    <div className="flex items-center gap-3 text-xs text-stone-600 mt-1 font-semibold">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{student.distanceKm} {isMr ? 'किमी अंतरावर' : 'km away'}</span>
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{student.rating}</span>
                      </span>
                    </div>
                  </div>

                  {/* Activity tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {student.interests.slice(0, 3).map(i => (
                      <span
                        key={i}
                        className="bg-stone-100 text-stone-800 text-xs font-bold px-2.5 py-1 rounded-lg"
                      >
                        {i}
                      </span>
                    ))}
                  </div>

                  {/* Compatibility Reason */}
                  {reasons.length > 0 && (
                    <div className="bg-teal-50/70 p-2.5 rounded-xl border border-teal-100 text-xs text-teal-900 font-medium">
                      ✓ {reasons[0]}
                    </div>
                  )}
                </div>

                {/* Big Generous Touch Target Buttons */}
                <div className="pt-5 mt-4 border-t border-stone-100 flex items-center gap-2.5">
                  <button
                    onClick={() => onSelectStudent(student)}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-black py-3 rounded-2xl text-xs transition-colors"
                  >
                    {isMr ? 'प्रोफाइल पहा' : 'View Profile'}
                  </button>
                  <button
                    onClick={() => onBookStudent(student)}
                    className="flex-1 bg-saath-600 hover:bg-saath-700 text-white font-black py-3 rounded-2xl text-xs transition-all shadow-xs active:scale-98"
                  >
                    {isMr ? 'भेट बुक करा' : 'Book Session'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
