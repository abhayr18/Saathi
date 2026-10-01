'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { StudentProfile, Booking } from '@/types';
import { calculateCompatibility } from '@/lib/matching';
import {
  Sparkles,
  Compass,
  Calendar,
  MessageSquare,
  ShieldAlert,
  Star,
  MapPin,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  Clock,
  CheckCircle,
  PhoneCall,
  AlertTriangle
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
  const { currentSenior, students, bookings } = useApp();

  // Find next upcoming session
  const upcomingSession = bookings.find(
    b => b.seniorId === currentSenior.id && ['accepted', 'pending'].includes(b.status)
  );

  // Calculate compatibility for top 4-6 recommended companions
  const recommendedStudents = students
    .map(student => ({
      ...student,
      matchResult: calculateCompatibility(currentSenior, student, { interest: 'Chess' }),
    }))
    .sort((a, b) => b.matchResult.score - a.matchResult.score)
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Welcome & Senior Greeting Card (Smooth Minimalist Light Theme) */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/60 rounded-3xl p-6 sm:p-8 text-stone-900 border border-orange-200/90 shadow-soft relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-[0.04] pointer-events-none flex items-center pr-10">
          <span className="text-[140px] font-black text-stone-900">साथ</span>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-4 border-white shadow-md">
              <img
                src={currentSenior.profilePhoto}
                alt={currentSenior.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/90 border border-orange-200 text-xs font-bold text-saath-800 mb-1 shadow-2xs">
                <span>📍 {currentSenior.area}, {currentSenior.city}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-stone-900">
                शुभ संध्याकाळ, {currentSenior.name.split(' ')[0]}जी 👋
              </h1>
              <p className="text-stone-600 text-sm sm:text-base mt-0.5 font-normal">
                “आपुलकीने संवाद साधणारा आणि वेळ घालवणारा तरुण साथीदार निवडा.”
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('discovery')}
              className="bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Compass className="w-4 h-4" />
              <span>सोबती शोधा</span>
            </button>

            <button
              onClick={() => onNavigate('activities')}
              className="bg-white hover:bg-orange-50/60 text-stone-800 border border-stone-200 font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-2xs transition-all flex items-center justify-center gap-2"
            >
              <span>☕ सामाजिक कट्टा</span>
            </button>

            <button
              onClick={onOpenSos}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl border border-rose-200 flex items-center justify-center gap-1.5 transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>SOS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Session Spotlight (if active) */}
      {upcomingSession && (
        <div className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-200/90 shadow-soft">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-xs">
                📅
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2.5 py-0.5 rounded-full">
                  Upcoming Companionship Session
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  {upcomingSession.activity} with {upcomingSession.companionName}
                </h3>
                <p className="text-xs text-stone-600">
                  {upcomingSession.date} at {upcomingSession.timeSlot} • {upcomingSession.meetingMode}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('messages')}
                className="flex-1 sm:flex-none bg-white hover:bg-stone-50 text-stone-800 font-bold px-4 py-2.5 rounded-xl text-xs border border-stone-200 shadow-xs flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-saath-600" />
                <span>Message</span>
              </button>
              <button
                onClick={() => onNavigate('bookings')}
                className="flex-1 sm:flex-none bg-stone-900 hover:bg-stone-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs"
              >
                View Booking Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate('discovery')}
          className="bg-white p-5 rounded-2xl shadow-soft border border-stone-200 hover:border-saath-400 hover:shadow-card transition-all text-left group"
        >
          <div className="w-12 h-12 rounded-xl bg-saath-100 text-saath-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-stone-900 text-base">Find Companion</h4>
          <p className="text-xs text-stone-500 mt-0.5">Filter by chess, walk, talk</p>
        </button>

        <button
          onClick={() => onNavigate('bookings')}
          className="bg-white p-5 rounded-2xl shadow-soft border border-stone-200 hover:border-saath-400 hover:shadow-card transition-all text-left group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-stone-900 text-base">My Bookings</h4>
          <p className="text-xs text-stone-500 mt-0.5">View & manage schedule</p>
        </button>

        <button
          onClick={() => onNavigate('messages')}
          className="bg-white p-5 rounded-2xl shadow-soft border border-stone-200 hover:border-saath-400 hover:shadow-card transition-all text-left group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-stone-900 text-base">Messages</h4>
          <p className="text-xs text-stone-500 mt-0.5">Chat with student companions</p>
        </button>

        <button
          onClick={() => onNavigate('safety')}
          className="bg-white p-5 rounded-2xl shadow-soft border border-stone-200 hover:border-saath-400 hover:shadow-card transition-all text-left group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-stone-900 text-base">Safety & Family</h4>
          <p className="text-xs text-stone-500 mt-0.5">Emergency & son/daughter alerts</p>
        </button>
      </div>

      {/* Recommended Companions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-saath-600" />
              <h2 className="text-2xl font-black text-stone-900 font-display">
                Recommended for You
              </h2>
            </div>
            <p className="text-stone-500 text-xs mt-0.5">
              Top matches tailored to your hobbies ({currentSenior.interests.join(', ')})
            </p>
          </div>

          <button
            onClick={() => onNavigate('discovery')}
            className="text-saath-700 hover:text-saath-800 text-sm font-bold flex items-center gap-1"
          >
            <span>See All Companions</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Companion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedStudents.map(student => {
            const { score, reasons } = student.matchResult;
            const isHighMatch = score >= 90;

            return (
              <div
                key={student.id}
                className={`bg-white rounded-3xl border p-6 flex flex-col justify-between transition-all hover:shadow-card group ${
                  isHighMatch
                    ? 'border-saath-300 ring-2 ring-saath-100 shadow-soft'
                    : 'border-stone-200'
                }`}
              >
                <div className="space-y-4">
                  {/* Top line with photo, match % and rate */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16">
                      <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-stone-200">
                        <img
                          src={student.profilePhoto}
                          alt={student.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      {student.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-2xs">
                          <ShieldCheck className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <div className="text-right space-y-1">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black ${
                          isHighMatch
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-saath-100 text-saath-800'
                        }`}
                      >
                        {score}% Match
                      </span>
                      <div className="text-base font-black text-stone-900">
                        ₹{student.hourlyRate}/hr
                      </div>
                    </div>
                  </div>

                  {/* Name and college */}
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-saath-700 transition-colors">
                      {student.name}, <span className="text-stone-500 font-normal text-sm">{student.age} yrs</span>
                    </h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 text-saath-600 shrink-0" />
                      <span className="truncate">{student.college}</span>
                    </p>
                    <div className="flex items-center gap-3 text-xs text-stone-600 mt-1.5 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{student.distanceKm} km away</span>
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{student.rating}</span>
                      </span>
                    </div>
                  </div>

                  {/* Languages */}
                  <p className="text-xs font-semibold text-stone-600">
                    {student.languages.join(' • ')}
                  </p>

                  {/* Interests */}
                  <div className="flex flex-wrap gap-1">
                    {student.interests.slice(0, 3).map(i => (
                      <span
                        key={i}
                        className="bg-stone-100 text-stone-700 text-[10px] font-bold px-2 py-0.5 rounded-md"
                      >
                        {i}
                      </span>
                    ))}
                  </div>

                  {/* Match highlights */}
                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 text-[11px] text-stone-600 space-y-0.5">
                    {reasons.slice(0, 2).map((r, idx) => (
                      <p key={idx} className="flex items-center gap-1 text-emerald-800 font-medium">
                        <span>✓</span>
                        <span className="truncate">{r}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectStudent(student)}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => onBookStudent(student)}
                    className="flex-1 bg-saath-600 hover:bg-saath-700 text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-xs"
                  >
                    Book Session
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
