'use client';

import React, { useState } from 'react';
import { Booking, StudentProfile } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Clock3,
  XCircle,
  MessageSquare,
  Star,
  Repeat,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface MyBookingsViewProps {
  onOpenReview: (booking: Booking) => void;
  onOpenMessage: (booking: Booking) => void;
  onBookAgain: (companionId: string) => void;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  onOpenReview,
  onOpenMessage,
  onBookAgain,
}) => {
  const { currentSenior, bookings, updateBookingStatus, students } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  // Filter bookings for the current senior
  const seniorBookings = bookings.filter(b => b.seniorId === currentSenior.id);

  const upcomingBookings = seniorBookings.filter(b => ['pending', 'accepted'].includes(b.status));
  const completedBookings = seniorBookings.filter(b => b.status === 'completed');
  const cancelledBookings = seniorBookings.filter(b => ['cancelled', 'rejected'].includes(b.status));

  const currentList =
    activeTab === 'upcoming'
      ? upcomingBookings
      : activeTab === 'completed'
      ? completedBookings
      : cancelledBookings;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 font-display">
            My Bookings
          </h1>
          <p className="text-stone-600 text-sm mt-1">
            Track your scheduled visits, past companionship sessions, and reviews.
          </p>
        </div>

        {/* Presentation Scenario hint */}
        <div className="bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-2xl text-xs text-amber-900 flex items-center gap-2">
          <span>💡</span>
          <span>Tip: Complete an accepted session to test the 5-star review workflow!</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'upcoming'
              ? 'bg-saath-600 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <span>Upcoming & Pending</span>
          <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full font-mono">
            {upcomingBookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'completed'
              ? 'bg-saath-600 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <span>Completed</span>
          <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full font-mono">
            {completedBookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'cancelled'
              ? 'bg-saath-600 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <span>Cancelled</span>
          <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full font-mono">
            {cancelledBookings.length}
          </span>
        </button>
      </div>

      {/* Bookings List */}
      {currentList.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
          <p className="text-4xl">📅</p>
          <h3 className="text-lg font-bold text-stone-900">
            No {activeTab} bookings found
          </h3>
          <p className="text-stone-500 text-xs max-w-sm mx-auto">
            {activeTab === 'upcoming'
              ? "You don't have any scheduled sessions right now. Browse our verified student companions to find someone today!"
              : "Completed sessions and feedback will be archived here."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map(booking => {
            const companion = students.find(s => s.id === booking.companionId);

            return (
              <div
                key={booking.id}
                className="bg-white rounded-3xl p-6 shadow-soft border border-stone-200/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-card transition-shadow"
              >
                {/* Companion info & session details */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-stone-200">
                    <img
                      src={
                        companion?.profilePhoto ||
                        '/assets/student_aditya.jpg'
                      }
                      alt={booking.companionName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-stone-900">
                        {booking.companionName}
                      </h3>
                      <span className="text-xs text-stone-400 font-mono">
                        (#SAATH-{booking.id.slice(-4)})
                      </span>

                      {/* Status Badges */}
                      {booking.status === 'accepted' && (
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Confirmed / Accepted</span>
                        </span>
                      )}

                      {booking.status === 'pending' && (
                        <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-200 animate-pulse">
                          <Clock3 className="w-3 h-3 text-amber-600" />
                          <span>Awaiting Student Confirmation</span>
                        </span>
                      )}

                      {booking.status === 'completed' && (
                        <span className="bg-stone-100 text-stone-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-stone-200">
                          <CheckCircle className="w-3 h-3 text-stone-600" />
                          <span>Completed</span>
                        </span>
                      )}

                      {booking.status === 'cancelled' && (
                        <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-rose-200">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          <span>Cancelled</span>
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-bold text-saath-700 flex items-center gap-1.5">
                      <span>🎯 {booking.activity}</span>
                      <span className="text-stone-300">•</span>
                      <span className="text-stone-600 font-normal">{booking.durationMinutes} mins</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span>{booking.date}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{booking.timeSlot}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{booking.meetingMode}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount & Actions */}
                <div className="w-full md:w-auto md:text-right space-y-3 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                  <div>
                    <span className="text-xs text-stone-400 block font-medium">Total Paid</span>
                    <span className="text-xl font-black text-stone-900">
                      ₹{booking.totalAmount}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold block">
                      Paid via {booking.paymentMethod}
                    </span>
                  </div>

                  {/* Contextual Action Buttons */}
                  <div className="flex flex-wrap md:justify-end gap-2">
                    {/* For pending/accepted: message companion */}
                    {(booking.status === 'pending' || booking.status === 'accepted') && (
                      <button
                        onClick={() => onOpenMessage(booking)}
                        className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-saath-600" />
                        <span>Message</span>
                      </button>
                    )}

                    {/* For accepted: allow marking session completed */}
                    {booking.status === 'accepted' && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'completed')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Mark Session Completed</span>
                      </button>
                    )}

                    {/* For pending/accepted: allow cancellation */}
                    {(booking.status === 'pending' || booking.status === 'accepted') && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        className="bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-600 font-semibold px-3 py-2 rounded-xl text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    )}

                    {/* For completed: Review or Book Again */}
                    {booking.status === 'completed' && (
                      <>
                        {!booking.reviewSubmitted ? (
                          <button
                            onClick={() => onOpenReview(booking)}
                            className="bg-saath-600 hover:bg-saath-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-xs"
                          >
                            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                            <span>Leave Review</span>
                          </button>
                        ) : (
                          <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 border border-emerald-200">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>Reviewed 5/5 ⭐</span>
                          </span>
                        )}

                        <button
                          onClick={() => onBookAgain(booking.companionId)}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition-colors"
                        >
                          <Repeat className="w-3.5 h-3.5" />
                          <span>Book Again</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
