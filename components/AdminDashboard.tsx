'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  Users,
  GraduationCap,
  Calendar,
  AlertTriangle,
  DollarSign,
  Check,
  X,
  Sparkles,
  Search,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    students,
    seniors,
    bookings,
    reports,
    verifyStudentByAdmin,
    showToast,
  } = useApp();

  const [adminTab, setAdminTab] = useState<'overview' | 'verifications' | 'bookings' | 'reports'>('overview');

  // Pending verification student list (e.g. Neha Sawant)
  const pendingStudents = students.filter(s => s.verificationStatus === 'pending');
  const verifiedStudents = students.filter(s => s.verificationStatus === 'verified');

  const totalPlatformRevenue = bookings
    .filter(b => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.serviceFee, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Platform Trust & Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Saath Admin Control Center
          </h1>
          <p className="text-stone-300 text-sm">
            Monitor verified companions, incoming booking flows, identity checks, and trust & safety.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setAdminTab('verifications')}
            className="bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>Review IDs ({pendingStudents.length})</span>
          </button>
        </div>
      </div>

      {/* Admin Subtabs Bar */}
      <div className="flex gap-2 border-b border-stone-200 pb-2 overflow-x-auto text-sm">
        {[
          { id: 'overview', label: 'Overview & KPIs' },
          { id: 'verifications', label: `College Verifications (${pendingStudents.length})` },
          { id: 'bookings', label: `All Bookings (${bookings.length})` },
          { id: 'reports', label: `Safety Reports (${reports.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              adminTab === tab.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Overview */}
      {adminTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          {/* KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-soft border border-stone-200">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Total Seniors</span>
              <div className="text-2xl font-black text-stone-900 mt-1">{seniors.length}</div>
              <span className="text-[10px] text-stone-500">100% active</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-soft border border-stone-200">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Total Students</span>
              <div className="text-2xl font-black text-stone-900 mt-1">{students.length}</div>
              <span className="text-[10px] text-emerald-600 font-bold">{verifiedStudents.length} verified</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-soft border border-stone-200">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Total Bookings</span>
              <div className="text-2xl font-black text-stone-900 mt-1">{bookings.length}</div>
              <span className="text-[10px] text-stone-500">All-time</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-soft border border-stone-200">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Completed</span>
              <div className="text-2xl font-black text-stone-900 mt-1">
                {bookings.filter(b => b.status === 'completed').length}
              </div>
              <span className="text-[10px] text-emerald-600 font-bold">Successfully reviewed</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-soft border border-stone-200">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Platform Revenue</span>
              <div className="text-2xl font-black text-emerald-700 mt-1">₹{totalPlatformRevenue}</div>
              <span className="text-[10px] text-stone-500">₹15/session fee</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-soft border border-stone-200">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Pending IDs</span>
              <div className="text-2xl font-black text-amber-600 mt-1">{pendingStudents.length}</div>
              <span className="text-[10px] text-amber-600 font-bold">Needs review</span>
            </div>
          </div>

          {/* Quick Pending Verification Highlight */}
          {pendingStudents.length > 0 && (
            <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl">
                  🎓
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-base">
                    {pendingStudents[0].name} submitted college ID for verification
                  </h4>
                  <p className="text-xs text-stone-600">
                    College: {pendingStudents[0].college} • ID Reference: {pendingStudents[0].collegeIdUrl}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => verifyStudentByAdmin(pendingStudents[0].id, false)}
                  className="bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => verifyStudentByAdmin(pendingStudents[0].id, true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-xs"
                >
                  Approve ID Proof
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Verifications */}
      {adminTab === 'verifications' && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-stone-200 space-y-4 animate-in fade-in">
          <h3 className="text-xl font-bold text-stone-900 font-display">Student Verification Submissions</h3>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full min-w-[580px] text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 uppercase font-bold border-b border-stone-200">
                <tr>
                  <th className="p-3">Student</th>
                  <th className="p-3">College & Course</th>
                  <th className="p-3">ID Reference</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {students.map(stu => (
                  <tr key={stu.id} className="hover:bg-stone-50/50">
                    <td className="p-3 flex items-center gap-2 font-bold text-stone-900">
                      <img src={stu.profilePhoto} alt={stu.name} className="w-8 h-8 rounded-full object-cover" />
                      <span>{stu.name}</span>
                    </td>
                    <td className="p-3 text-stone-600">
                      {stu.college} ({stu.course})
                    </td>
                    <td className="p-3 font-mono text-stone-500">
                      {stu.collegeIdUrl || 'ID-DOC-PENDING'}
                    </td>
                    <td className="p-3">
                      {stu.isVerified ? (
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          Verified ✓
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                          Pending Review
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      {!stu.isVerified ? (
                        <button
                          onClick={() => verifyStudentByAdmin(stu.id, true)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => verifyStudentByAdmin(stu.id, false)}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold px-2.5 py-1.5 rounded-lg text-xs"
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Bookings */}
      {adminTab === 'bookings' && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-stone-200 space-y-4 animate-in fade-in">
          <h3 className="text-xl font-bold text-stone-900 font-display">All Platform Bookings ({bookings.length})</h3>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full min-w-[660px] text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 uppercase font-bold border-b border-stone-200">
                <tr>
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Senior</th>
                  <th className="p-3">Companion</th>
                  <th className="p-3">Activity</th>
                  <th className="p-3">Schedule</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-stone-50/50">
                    <td className="p-3 font-mono font-bold text-stone-700">#{b.id.slice(-4)}</td>
                    <td className="p-3 font-semibold text-stone-900">{b.seniorName}</td>
                    <td className="p-3 font-semibold text-saath-700">{b.companionName}</td>
                    <td className="p-3">{b.activity}</td>
                    <td className="p-3 text-stone-600">{b.date} ({b.timeSlot})</td>
                    <td className="p-3 font-bold text-stone-900">₹{b.totalAmount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                        b.status === 'completed'
                          ? 'bg-stone-100 text-stone-700'
                          : b.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Reports */}
      {adminTab === 'reports' && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-stone-200 space-y-4 animate-in fade-in">
          <h3 className="text-xl font-bold text-stone-900 font-display">Reported Concerns & Safety Incidents</h3>

          <div className="divide-y divide-stone-100">
            {reports.map(rep => (
              <div key={rep.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">Reported: {rep.reportedUserName}</span>
                    <span className="text-stone-400 text-xs">• Filed by {rep.reporterName}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      rep.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rep.status}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 italic">"{rep.reason}"</p>
                </div>

                <div className="text-right text-xs text-stone-400">
                  <span>{rep.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
