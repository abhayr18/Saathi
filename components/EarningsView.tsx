'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Download,
  Calendar,
  CheckCircle,
  Building,
  QrCode,
  Sparkles
} from 'lucide-react';

export const EarningsView: React.FC = () => {
  const { currentStudent, bookings, showToast } = useApp();
  const [withdrawing, setWithdrawing] = useState(false);

  // Past completed sessions for Aditya
  const completedSessions = bookings.filter(
    b => b.companionId === currentStudent.id && b.status === 'completed'
  );

  const handleWithdraw = () => {
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      showToast('Simulated Payout: ₹1,500 transferred to Aditya’s verified UPI VPA (aditya@okaxis)!');
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 font-display">
            Student Companion Earnings
          </h1>
          <p className="text-stone-600 text-sm mt-1">
            Real-time simulated payouts for completed quality time sessions.
          </p>
        </div>

        <button
          onClick={handleWithdraw}
          disabled={withdrawing}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl shadow-elevated transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-75"
        >
          {withdrawing ? (
            <span>Processing UPI Transfer...</span>
          ) : (
            <>
              <ArrowUpRight className="w-4 h-4" />
              <span>Withdraw to Bank / UPI</span>
            </>
          )}
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-200">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Total Lifetime Earnings</span>
          <div className="text-3xl font-black text-stone-900 font-display mt-2">
            ₹{currentStudent.totalEarnings.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18% from last month</span>
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-200">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">This Month (September)</span>
          <div className="text-3xl font-black text-saath-700 font-display mt-2">
            ₹3,450
          </div>
          <span className="text-xs text-stone-500 font-medium block mt-1">23 active hours</span>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-200">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">This Week</span>
          <div className="text-3xl font-black text-stone-900 font-display mt-2">
            ₹900
          </div>
          <span className="text-xs text-stone-500 font-medium block mt-1">6 sessions</span>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-200">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Completed Sessions</span>
          <div className="text-3xl font-black text-stone-900 font-display mt-2">
            {currentStudent.completedSessionsCount}
          </div>
          <span className="text-xs text-amber-600 font-bold block mt-1">★ 4.9 Average Rating</span>
        </div>
      </div>

      {/* Visual Chart Mock */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-card border border-stone-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-display">Weekly Earnings Trend</h3>
            <p className="text-xs text-stone-500">Companionship revenue earned per week (₹)</p>
          </div>
          <span className="text-xs font-bold text-stone-400">Current Semester</span>
        </div>

        {/* CSS Bar Chart */}
        <div className="pt-6 grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 border-b border-stone-200 pb-2">
          {[
            { label: 'Week 1', amount: 1200, height: '40%' },
            { label: 'Week 2', amount: 1650, height: '55%' },
            { label: 'Week 3', amount: 1450, height: '50%' },
            { label: 'Week 4', amount: 2100, height: '70%' },
            { label: 'Week 5', amount: 1800, height: '60%' },
            { label: 'Week 6', amount: 2450, height: '82%' },
            { label: 'This Wk', amount: 2750, height: '92%', active: true },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-bold text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
                ₹{bar.amount}
              </span>
              <div
                style={{ height: bar.height }}
                className={`w-full max-w-[42px] rounded-t-xl transition-all ${
                  bar.active
                    ? 'bg-gradient-to-t from-saath-600 to-amber-500 shadow-md'
                    : 'bg-stone-200 group-hover:bg-stone-300'
                }`}
              ></div>
              <span className="text-[11px] font-bold text-stone-600 truncate max-w-full">
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-stone-200 space-y-4">
        <h3 className="text-lg font-bold text-stone-900 font-display">Recent Completed Payouts</h3>

        <div className="divide-y divide-stone-100">
          {completedSessions.length === 0 ? (
            <p className="text-stone-500 text-sm py-4">No completed sessions logged yet.</p>
          ) : (
            completedSessions.map(sess => (
              <div key={sess.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      {sess.activity} with {sess.seniorName}
                    </h4>
                    <p className="text-xs text-stone-500">
                      {sess.date} • {sess.durationMinutes} mins • {sess.meetingMode}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-emerald-700">
                    +₹{sess.totalAmount - sess.serviceFee}
                  </span>
                  <span className="text-[10px] text-stone-400 block font-medium">Credited to Wallet</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
