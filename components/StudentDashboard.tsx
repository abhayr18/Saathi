'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  GraduationCap,
  ShieldCheck,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Star,
  Users,
  AlertCircle,
  Check,
  X,
  TrendingUp,
  ChevronRight,
  Sparkles,
  MapPin
} from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (tab: string) => void;
  onOpenObservation?: (booking: any) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate, onOpenObservation }) => {
  const {
    currentStudent,
    bookings,
    updateBookingStatus,
    submitStudentVerification,
    showToast,
  } = useApp();

  // Filter bookings for this student companion
  const studentBookings = bookings.filter(b => b.companionId === currentStudent.id);

  // Pending requests that student can accept or decline
  const pendingRequests = studentBookings.filter(b => b.status === 'pending');
  // Confirmed upcoming sessions
  const upcomingSessions = studentBookings.filter(b => b.status === 'accepted');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Student Header */}
      <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4">
          <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-4 border-saath-500 shadow-md">
            <img
              src={currentStudent.profilePhoto}
              alt={currentStudent.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
                Good evening, {currentStudent.name.split(' ')[0]} 👋
              </h1>
              {currentStudent.isVerified ? (
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>College Verified</span>
                </span>
              ) : (
                <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  Verification Pending
                </span>
              )}
            </div>

            <p className="text-stone-300 text-xs sm:text-sm flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-saath-400" />
              <span>{currentStudent.college}</span>
              <span className="text-stone-500">•</span>
              <span>{currentStudent.course}</span>
            </p>

            <p className="text-xs text-stone-400 font-medium">
              Rate: ₹{currentStudent.hourlyRate}/hour • Base Location: {currentStudent.area}, {currentStudent.city}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          <button
            onClick={() => onNavigate('availability')}
            className="bg-saath-600 hover:bg-saath-700 text-white font-bold text-sm px-5 py-3 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4" />
            <span>Manage Availability</span>
          </button>
          <button
            onClick={() => onNavigate('earnings')}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-sm px-5 py-3 rounded-2xl transition-all border border-stone-700 flex items-center justify-center gap-2"
          >
            <DollarSign className="w-4 h-4 text-saath-400" />
            <span>View Earnings</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl shadow-soft border border-stone-200">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Upcoming</span>
            <Calendar className="w-5 h-5 text-saath-600" />
          </div>
          <div className="text-3xl font-black text-stone-900 font-display">
            {upcomingSessions.length}
          </div>
          <p className="text-xs text-stone-500 mt-1">Confirmed appointments</p>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-soft border border-stone-200">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-stone-900 font-display">
            {currentStudent.completedSessionsCount}
          </div>
          <p className="text-xs text-stone-500 mt-1">Total visits conducted</p>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-soft border border-stone-200">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Earnings</span>
            <DollarSign className="w-5 h-5 text-saath-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700 font-display">
            ₹{currentStudent.totalEarnings.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-1">Available for payout</p>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-soft border border-stone-200">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Reputation</span>
            <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
          </div>
          <div className="text-3xl font-black text-stone-900 font-display flex items-baseline gap-1">
            <span>{currentStudent.rating}</span>
            <span className="text-xs text-stone-400 font-normal">/ 5.0</span>
          </div>
          <p className="text-xs text-stone-500 mt-1">From {currentStudent.reviewCount} elder reviews</p>
        </div>
      </div>

      {/* Booking Requests Section (CRITICAL PRESENTATION FLOW ANCHOR) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-saath-500 animate-ping"></span>
            <h2 className="text-2xl font-black text-stone-900 font-display">
              New Booking Requests ({pendingRequests.length})
            </h2>
          </div>
          <span className="text-xs text-stone-500">Respond within 24 hours</span>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-stone-200 text-stone-500 space-y-2">
            <p className="text-3xl">☕</p>
            <p className="text-sm font-semibold">No pending requests at this moment</p>
            <p className="text-xs text-stone-400">
              When a senior requests a session, their details and requested activity will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map(req => (
              <div
                key={req.id}
                className="bg-white rounded-3xl p-6 shadow-soft border-2 border-saath-300 ring-2 ring-saath-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-saath-100 text-saath-800 flex items-center justify-center font-bold text-xl shrink-0">
                    👴
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-stone-900">
                        {req.seniorName}
                      </h3>
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Pending Your Approval
                      </span>
                    </div>

                    <p className="text-sm font-bold text-saath-700 mt-0.5">
                      Requested: {req.activity} Session ({req.durationMinutes} mins)
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 mt-1 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span>{req.date}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{req.timeSlot}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{req.meetingMode}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Earnings & Accept / Decline Buttons */}
                <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                  <div className="text-right w-full sm:w-auto">
                    <span className="text-[11px] text-stone-400 font-medium block">You Will Earn</span>
                    <span className="text-2xl font-black text-emerald-700">
                      ₹{req.totalAmount - req.serviceFee}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => updateBookingStatus(req.id, 'rejected')}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-300 font-bold text-stone-600 hover:bg-stone-50 text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Decline</span>
                    </button>

                    <button
                      onClick={() => updateBookingStatus(req.id, 'accepted')}
                      className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Accept Request</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmed Upcoming Sessions & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-stone-900 font-display">
              Upcoming Confirmed Sessions ({upcomingSessions.length})
            </h3>
            <button
              onClick={() => onNavigate('availability')}
              className="text-xs font-bold text-saath-700 hover:underline"
            >
              Update Availability Slots →
            </button>
          </div>

          {upcomingSessions.length === 0 ? (
            <div className="bg-white rounded-3xl p-6 text-center border border-stone-200 text-stone-500 text-sm">
              No confirmed appointments upcoming right now.
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingSessions.map(sess => (
                <div
                  key={sess.id}
                  className="bg-white p-5 rounded-2xl shadow-soft border border-stone-200 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">{sess.activity} with {sess.seniorName}</h4>
                      <p className="text-xs text-stone-500">{sess.date} at {sess.timeSlot} • {sess.meetingMode}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {onOpenObservation && (
                      <button
                        onClick={() => onOpenObservation(sess)}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 border border-amber-300"
                        title="Log notes for family in Bangalore"
                      >
                        <span>✍️ Log Observation</span>
                      </button>
                    )}
                    <button
                      onClick={() => updateBookingStatus(sess.id, 'completed')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1"
                    >
                      <span>Complete & Claim ₹{sess.totalAmount - sess.serviceFee}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Completion & Verification Card */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-soft border border-stone-200 space-y-4">
          <h3 className="text-lg font-bold text-stone-900 font-display">Profile Status</h3>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-600">
              <span>Profile Completeness</span>
              <span className="text-saath-700">90%</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-saath-600 h-2.5 rounded-full w-[90%]"></div>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 space-y-3 text-xs text-stone-600">
            <p className="flex items-center gap-2 text-emerald-700 font-semibold">
              <CheckCircle className="w-4 h-4" />
              <span>Bio & Photo uploaded</span>
            </p>
            <p className="flex items-center gap-2 text-emerald-700 font-semibold">
              <CheckCircle className="w-4 h-4" />
              <span>5 weekly availability slots active</span>
            </p>
            <p className="flex items-center gap-2 text-emerald-700 font-semibold">
              <CheckCircle className="w-4 h-4" />
              <span>ADCET College ID Verified</span>
            </p>
          </div>

          <button
            onClick={() => submitStudentVerification(currentStudent.id)}
            className="w-full bg-stone-50 hover:bg-stone-100 text-stone-800 font-bold py-2.5 rounded-xl border border-stone-200 text-xs transition-colors"
          >
            Re-submit Verification ID
          </button>
        </div>
      </div>
    </div>
  );
};
