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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-10">

      {/* ── 1. WARM GREETING & ATTENTION-CATCHY SOS BAR ── */}
      <div className="bg-gradient-to-r from-teal-500/15 via-white to-sky-500/15 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-stone-900 border-2 border-teal-200/90 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-center gap-3.5 sm:gap-5">
            <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 aspect-square rounded-2xl overflow-hidden border-2 sm:border-3 border-white shadow-elevated">
              <img
                src={currentSenior.profilePhoto}
                alt={currentSenior.name}
                className="w-full h-full aspect-square object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-teal-200 text-[11px] sm:text-xs font-black text-teal-800 shadow-2xs">
                <span>📍 {currentSenior.area}, {currentSenior.city}</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black font-display tracking-tight text-stone-900">
                {isMr
                  ? `शुभ संध्याकाळ, ${currentSenior.name.split(' ')[0]}जी 👋`
                  : `Good evening, ${currentSenior.name.split(' ')[0]} 👋`}
              </h1>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
                <span className="text-[11px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 rounded-lg bg-teal-100 text-teal-900">
                  ♟️ बुद्धिबळ आवडते
                </span>
                <span className="text-[11px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900">
                  🚶 मॉर्निंग वॉक
                </span>
              </div>
            </div>
          </div>

          {/* High-Contrast Emergency SOS Button */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenSos}
              className="w-full md:w-auto bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-black text-xs sm:text-base px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-elevated border-2 border-rose-300 flex items-center justify-center gap-2 sm:gap-2.5 transition-all text-center"
            >
              <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
              <span>{isMr ? 'तात्काळ SOS मदत (112)' : 'EMERGENCY SOS (112)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. 3 ULTRA-VISUAL ACTION PHOTO TILES ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

        {/* TILE 1: 🤝 सोबती निवडा (Choose Companion - Photo Header) */}
        <div
          onClick={() => onNavigate('discovery')}
          className="group bg-white rounded-3xl overflow-hidden border-2 border-teal-200 hover:border-saath-500 shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer flex flex-col justify-between active:scale-98"
        >
          <div>
            <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
              <img
                src="/assets/activity_chess.jpg"
                alt="Choose Companion"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-2.5 left-3 text-white flex items-center gap-2">
                <span className="text-2xl">🤝</span>
                <span className="text-xs font-black bg-emerald-600 px-2.5 py-0.5 rounded-full">१४ सोबती तयार</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-saath-700 transition-colors">
                {isMr ? 'सोबती निवडा' : 'Choose Companion'}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm font-semibold">
                {isMr
                  ? 'बुद्धिबळ, वॉक किंवा फोन शिकण्यासाठी विश्वासू तरुण सोबती.'
                  : 'Vetted college companions for chess, walks & phone help.'}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6 pt-0">
            <div className="w-full bg-saath-600 group-hover:bg-saath-700 text-white font-black py-3.5 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors">
              <Compass className="w-4 h-4" />
              <span>{isMr ? 'सोबती शोधा ➔' : 'Find Companions ➔'}</span>
            </div>
          </div>
        </div>

        {/* TILE 2: 📅 माझे वेळापत्रक (My Schedule - Visual Card) */}
        <div
          onClick={() => onNavigate('bookings')}
          className="group bg-white rounded-3xl overflow-hidden border-2 border-blue-200 hover:border-blue-500 shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer flex flex-col justify-between active:scale-98"
        >
          <div>
            <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
              <img
                src="/assets/activity_walk.jpg"
                alt="My Schedule"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-2.5 left-3 text-white flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <span className="text-xs font-black bg-blue-600 px-2.5 py-0.5 rounded-full">वेळापत्रक</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-blue-700 transition-colors">
                {isMr ? 'माझे वेळापत्रक' : 'My Schedule'}
              </h3>
              {upcomingSession ? (
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                  <p className="font-black text-sm">
                    {upcomingSession.activity} ({upcomingSession.companionName})
                  </p>
                  <p className="font-bold text-stone-600">
                    {upcomingSession.date} • {upcomingSession.timeSlot}
                  </p>
                </div>
              ) : (
                <p className="text-stone-600 text-xs sm:text-sm font-semibold">
                  {isMr
                    ? 'आपल्या सर्व नियोजित भेटी व वेळ एका क्लिकवर पहा.'
                    : 'Check your upcoming visits, date and time slots.'}
                </p>
              )}
            </div>
          </div>

          <div className="p-5 sm:p-6 pt-0">
            <div className="w-full bg-blue-600 group-hover:bg-blue-700 text-white font-black py-3.5 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors">
              <Calendar className="w-4 h-4" />
              <span>{isMr ? 'वेळापत्रक पहा ➔' : 'View Schedule ➔'}</span>
            </div>
          </div>
        </div>

        {/* TILE 3: ☕ कट्टा व मित्रमंडळ (Community Katta - Photo Header) */}
        <div
          onClick={() => onNavigate('activities')}
          className="group bg-white rounded-3xl overflow-hidden border-2 border-amber-200 hover:border-amber-500 shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer flex flex-col justify-between active:scale-98"
        >
          <div>
            <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
              <img
                src="/assets/social_katta.jpg"
                alt="Community Katta"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-2.5 left-3 text-white flex items-center gap-2">
                <span className="text-2xl">☕</span>
                <span className="text-xs font-black bg-amber-600 px-2.5 py-0.5 rounded-full">कट्टा क्लब</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-amber-700 transition-colors">
                {isMr ? 'कट्टा व मित्रमंडळ' : 'Community Katta'}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm font-semibold">
                {isMr
                  ? 'हास्य क्लब, चहापान गप्पागोष्टी, भजन व समवयस्क मित्रांसोबत आनंद.'
                  : 'Laughter club, tea meetups and senior friendship circles.'}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6 pt-0">
            <div className="w-full bg-amber-600 group-hover:bg-amber-700 text-white font-black py-3.5 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors">
              <Users className="w-4 h-4" />
              <span>{isMr ? 'कट्ट्यात सामील व्हा ➔' : 'Join Katta ➔'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── 3. SHIFARAS KELELE SOBATI (RECOMMENDED COMPANIONS) ── */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-saath-600" />
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
                {isMr ? 'आपल्यासाठी शिफारस केलेले सोबती' : 'Recommended Companions for You'}
              </h2>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm font-semibold">
              {isMr
                ? `आपल्या आवडीनुसार सर्वोत्तम जुळणारे (${currentSenior.interests.join(', ')})`
                : `Tailored to your interests (${currentSenior.interests.join(', ')})`}
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
                  {/* Photo with verified badge & match rate */}
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
                    <p className="text-xs text-stone-500 font-semibold flex items-center gap-1 mt-0.5">
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
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-black py-3.5 rounded-2xl text-xs sm:text-sm transition-colors"
                  >
                    {isMr ? 'प्रोफाइल पहा' : 'View Profile'}
                  </button>
                  <button
                    onClick={() => onBookStudent(student)}
                    className="flex-1 bg-saath-600 hover:bg-saath-700 text-white font-black py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-xs active:scale-98"
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
