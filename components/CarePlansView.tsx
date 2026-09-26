'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Calendar,
  Check,
  ShieldCheck,
  Building,
  Heart,
  Users,
  Sparkles,
  ArrowRight,
  Clock,
  Activity,
  FileText
} from 'lucide-react';

interface CarePlansViewProps {
  onSelectPlan: (planName: string, price: number, visits: number) => void;
  onBookOnDemand: () => void;
}

export const CarePlansView: React.FC<CarePlansViewProps> = ({ onSelectPlan, onBookOnDemand }) => {
  const { currentSenior, subscribeCarePlan, showToast } = useApp();

  const handleSubscribe = (name: string, cost: number, visits: number) => {
    subscribeCarePlan({
      seniorId: currentSenior.id,
      seniorName: currentSenior.name,
      sponsorName: 'Amit Kulkarni (Son in Bangalore)',
      model: 'Model 2 (Monthly Plan)',
      planName: name,
      monthlyCost: cost,
      visitsPerMonth: visits,
      nextScheduledVisit: 'Tuesday, Oct 6 • 5:00 PM',
      primaryCompanionName: 'Aditya Patil',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-saath-700 bg-saath-100 px-3.5 py-1 rounded-full border border-saath-200">
          Flexible Companionship & Support Models
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
          Companionship & Family Visibility Plans
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Flexible service models designed for seniors living independently and families seeking consistent care and peace of mind from anywhere.
        </p>
      </div>

      {/* Model 1 & 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Model 1: On-Demand */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-stone-200 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Model 1: Pay-Per-Visit
            </span>
            <h3 className="text-2xl font-black text-stone-900 font-display">
              On-Demand Visit
            </h3>
            <p className="text-xs text-stone-500">
              Ideal for occasional chess games, technology guidance, or festival companion visits.
            </p>

            <div className="pt-2">
              <span className="text-3xl font-black text-stone-900">₹150</span>
              <span className="text-xs font-medium text-stone-500"> / hour</span>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Choose any verified student companion</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Home, park, or video call sessions</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Simulated instant checkout</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Visit completed family update</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onBookOnDemand}
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-xl text-xs transition-colors"
          >
            Find & Book Single Visit
          </button>
        </div>

        {/* Model 2A: Silver Monthly */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-stone-200 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-saath-700 uppercase tracking-wider block">
              Model 2: Monthly Care Plan
            </span>
            <h3 className="text-2xl font-black text-stone-900 font-display">
              Silver Saath (4 Visits)
            </h3>
            <p className="text-xs text-stone-500">
              1 scheduled visit every week for consistent human touch and shared hobbies.
            </p>

            <div className="pt-2">
              <span className="text-3xl font-black text-saath-700">₹599</span>
              <span className="text-xs font-medium text-stone-500"> / month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>4 In-person quality time sessions / mo</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Weekly phone check-in between visits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Family Observation Reports on app</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dedicated primary student buddy</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSubscribe('Silver Saath — 4 Visits / Month', 599, 4)}
            className="w-full bg-saath-600 hover:bg-saath-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-xs"
          >
            Sponsor Silver Plan (₹599)
          </button>
        </div>

        {/* Model 2B: Gold Monthly (Most Popular) */}
        <div className="bg-gradient-to-b from-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-elevated border-2 border-amber-400 flex flex-col justify-between space-y-6 relative">
          <span className="absolute -top-3 right-6 bg-amber-400 text-stone-900 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
            Recommended by Families
          </span>

          <div className="space-y-4">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Model 2 & 3: Comprehensive Care
            </span>
            <h3 className="text-2xl font-black text-white font-display">
              Gold Saath (8 Visits)
            </h3>
            <p className="text-xs text-stone-400">
              2 visits per week. Complete peace of mind for children living in another city or abroad.
            </p>

            <div className="pt-2">
              <span className="text-3xl font-black text-amber-300">₹1,099</span>
              <span className="text-xs font-medium text-stone-400"> / month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-300 pt-2 border-t border-stone-800">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>8 Bi-weekly companionship visits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Know My Normal baseline tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp dispatches to son/daughter</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Emergency coordination support</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSubscribe('Gold Saath — 8 Visits / Month (Bi-Weekly)', 1099, 8)}
            className="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-black py-3 rounded-xl text-xs transition-colors shadow-md"
          >
            Sponsor Gold Plan (₹1,099)
          </button>
        </div>
      </div>

      {/* Model 3 & Model 4 Overview Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Model 3 Hub */}
        <div className="bg-stone-50 p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-saath-100 text-saath-800 flex items-center justify-center font-bold">
              👨‍👩‍👧
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase">Model 3</span>
              <h4 className="text-lg font-bold text-stone-900">Family-Managed Remote Care Hub</h4>
            </div>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Allows children living in Bangalore, Mumbai, or overseas to oversee elderly parents' emotional wellbeing with structured observation reports, routine assistance, and proactive notifications.
          </p>
        </div>

        {/* Model 4 B2B */}
        <div className="bg-stone-50 p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              🏥
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase">Model 4</span>
              <h4 className="text-lg font-bold text-stone-900">Institutional & Partner Model</h4>
            </div>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Partnership integration for <strong>Hospitals</strong> (post-discharge non-clinical companionship), <strong>Companies</strong> (employee parent-care wellness benefit), and <strong>Senior Living Communities</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
