'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Heart,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Smile,
  Activity,
  Phone,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  FileText,
  UserCheck,
  Building
} from 'lucide-react';

interface FamilyDashboardProps {
  onNavigate: (tab: string) => void;
}

export const FamilyDashboard: React.FC<FamilyDashboardProps> = ({ onNavigate }) => {
  const { currentSenior, observations, carePlans, students, bookings } = useApp();

  // Filter observations for this senior
  const seniorObservations = observations.filter(o => o.seniorId === currentSenior.id);
  const activePlan = carePlans.find(p => p.seniorId === currentSenior.id) || carePlans[0];
  const activeCompanion = students.find(s => s.name.includes('Aditya')) || students[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Top Banner: Remote Family View */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-saath-950 rounded-3xl p-6 sm:p-8 text-white shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-saath-500/20 text-saath-300 text-xs font-bold border border-saath-500/30 mb-1">
            <Heart className="w-3.5 h-3.5 text-saath-400" />
            <span>Model 3: Family Visibility & Peace of Mind Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Welcome, Amit Kulkarni 👋
          </h1>
          <p className="text-stone-300 text-sm">
            Remote Monitoring for <strong className="text-white">{currentSenior.name} (68)</strong> in {currentSenior.area}, {currentSenior.city}.
          </p>
          <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
            <span>Viewing from: <strong>Bangalore, Karnataka</strong></span>
            <span>•</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Know My Normal Detection: Normal</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => onNavigate('messages')}
            className="bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs px-4 py-3 rounded-2xl transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with Companion ({activeCompanion.name.split(' ')[0]})</span>
          </button>
          <button
            onClick={() => onNavigate('careplans')}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs px-4 py-3 rounded-2xl transition-all border border-stone-700 flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Care Plans</span>
          </button>
        </div>
      </div>

      {/* Novelty Spotlight: "Know My Normal" Detection & Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-200 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold">
            <span className="uppercase tracking-wider">Mood & Engagement</span>
            <Smile className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-stone-900 font-display">Cheerful & Active</span>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
              Stable
            </span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            4 out of 4 recent companion visits logged enthusiastic participation in chess, smartphone learning, and colony strolls.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-200 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold">
            <span className="uppercase tracking-wider">Mobility & Strolls</span>
            <Activity className="w-5 h-5 text-saath-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-stone-900 font-display">Regular Walk</span>
            <span className="text-xs text-saath-800 font-bold bg-saath-100 px-2 py-0.5 rounded-full">
              45 mins avg
            </span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Walked comfortably through Rajarampuri colony with companion Aditya on Wednesday. No fatigue or balance issues noted.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-200 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold">
            <span className="uppercase tracking-wider">Primary Companion</span>
            <UserCheck className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-stone-200">
              <img
                src={activeCompanion.profilePhoto}
                alt={activeCompanion.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">{activeCompanion.name} (21)</h4>
              <p className="text-xs text-stone-500">ADCET Engineering • ★ {activeCompanion.rating}</p>
            </div>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-100 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% Background & College Verified</span>
          </div>
        </div>
      </div>

      {/* Active Care Subscription Plan (Model 2/3) */}
      {activePlan && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 p-6 rounded-3xl shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider bg-amber-200/80 px-2.5 py-0.5 rounded-full">
              Active Monthly Care Subscription
            </span>
            <h3 className="text-xl font-black text-stone-900 mt-1">
              {activePlan.planName}
            </h3>
            <p className="text-xs text-stone-600">
              Sponsored by: <strong>{activePlan.sponsorName}</strong> • Monthly billing: ₹{activePlan.monthlyCost}/mo
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-stone-700 pt-1">
              <span>Visits Completed: <strong>{activePlan.visitsCompleted} of {activePlan.visitsPerMonth}</strong></span>
              <span>•</span>
              <span className="text-saath-700">Next Visit: <strong>{activePlan.nextScheduledVisit}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('careplans')}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              Manage / Upgrade Plan
            </button>
          </div>
        </div>
      )}

      {/* Visit Observations Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-stone-200 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <h3 className="text-xl font-bold text-stone-900 font-display flex items-center gap-2">
              <FileText className="w-5 h-5 text-saath-600" />
              <span>Companion Observation Feed & Visit Reports</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Structured observations logged by student companions after every completed visit.
            </p>
          </div>

          <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
            {seniorObservations.length} Logs Available
          </span>
        </div>

        <div className="space-y-4">
          {seniorObservations.map(obs => (
            <div
              key={obs.id}
              className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/90 space-y-3 hover:bg-stone-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-saath-100 text-saath-700 font-bold flex items-center justify-center text-xs">
                    ✍️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      Visit by {obs.companionName}
                    </h4>
                    <p className="text-xs text-stone-500">
                      {obs.date} • {obs.durationMinutes} mins • {obs.activity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Mood: {obs.mood}
                  </span>
                  <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
                    Engagement: {obs.engagement}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed italic">
                "{obs.notes}"
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mobility: {obs.mobilityObserved}</span>
                </span>
                <span>Transmitted to Family WhatsApp & Dashboard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
