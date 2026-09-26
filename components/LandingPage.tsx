'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  HeartHandshake,
  Users,
  ShieldCheck,
  Sparkles,
  CalendarCheck,
  Compass,
  ArrowRight,
  Clock,
  Award,
  CheckCircle,
  Star,
  Quote,
  Smartphone,
  BookOpen,
  Coffee,
  Trees,
  Music,
  Smile,
  ShieldAlert,
  ChevronRight,
  PlayCircle,
  Heart,
  Eye,
  Activity,
  Layers,
  Building
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { switchRole } = useApp();

  const handleFindCompanion = () => {
    switchRole('senior');
    onNavigate('discovery');
  };

  const handleBecomeCompanion = () => {
    switchRole('student');
    onNavigate('dashboard');
  };

  const handleFamilyView = () => {
    switchRole('family');
    onNavigate('familyHub');
  };

  const methodologySteps = [
    { num: '1', title: 'Assess', desc: 'Understand senior needs, routine, interests & language preferences.' },
    { num: '2', title: 'Match', desc: 'Connect them with a trained, verified, and 90%+ compatible companion.' },
    { num: '3', title: 'Connect', desc: 'Build trust through consistent, regular, one-on-one human interaction.' },
    { num: '4', title: 'Support', desc: 'Provide companionship, routine assistance, walks & meaningful hobbies.' },
    { num: '5', title: 'Monitor', desc: 'Record key observations, mood, and routine changes through the app.' },
    { num: '6', title: 'Update', desc: 'Give out-of-city families timely updates, visibility, and peace of mind.' },
    { num: '7', title: 'Improve', desc: 'Use continuous feedback to deepen the senior-companion bond.' },
  ];

  const models = [
    {
      badge: 'Model 1',
      title: 'On-Demand Single Visit',
      desc: 'Book as-needed visits for chess, morning walks, hospital accompaniment, or technology support.',
      price: '₹150 / hr',
      action: 'Explore Companions',
      onAction: handleFindCompanion,
    },
    {
      badge: 'Model 2',
      title: 'Monthly Care Plans',
      desc: 'Structured 4-visit (weekly) or 8-visit (bi-weekly) plans with regular check-in calls and routine support.',
      price: 'From ₹599 / mo',
      action: 'View Care Plans',
      onAction: () => onNavigate('careplans'),
      highlight: true,
    },
    {
      badge: 'Model 3',
      title: 'Family Visibility Hub',
      desc: 'For children living in other cities/countries to sponsor care and receive structured visit observation reports.',
      price: 'Zero Stress',
      action: 'Open Family Hub',
      onAction: handleFamilyView,
    },
    {
      badge: 'Model 4',
      title: 'Partner & Enterprise',
      desc: 'Integration with hospitals (post-discharge non-clinical support), corporate employee benefits, and NGOs.',
      price: 'Institutional',
      action: 'Learn More',
      onAction: () => onNavigate('careplans'),
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Top Banner: Platform Highlights */}
      <section className="bg-gradient-to-r from-stone-900 via-saath-950 to-stone-900 text-white px-4 py-4 border-b border-saath-800/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-saath-500/20 text-saath-400 flex items-center justify-center shrink-0 border border-saath-400/30">
              <Sparkles className="w-5 h-5 text-saath-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-saath-300">
                Continuous Care & Family Peace of Mind System
              </p>
              <p className="text-xs text-stone-300">
                Experience all 4 Service Models, 7-Step Continuous Care Methodology, and "Know My Normal" Family Updates.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFindCompanion}
              className="bg-saath-500 hover:bg-saath-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md flex items-center gap-1"
            >
              <span>Senior Flow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFamilyView}
              className="bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all border border-stone-700 flex items-center gap-1"
            >
              <span>Family Hub</span>
            </button>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saath-100 border border-saath-200 text-saath-800 text-sm font-bold">
              <Heart className="w-4 h-4 text-saath-600" />
              <span>Intergenerational Care & Family Peace of Mind</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight font-display leading-[1.15]">
              We give seniors someone they <span className="text-saath-600">know & trust</span>,
              and give families <span className="text-amber-600">peace of mind</span> from anywhere.
            </h1>

            <p className="text-lg text-stone-600 leading-relaxed font-normal max-w-2xl">
              Elderly living alone lack consistent companionship and trusted daily support. Their children living in another city or abroad struggle to provide regular attention. <strong>Saath</strong> bridges this gap with verified college companions and structured observation reports for families.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleFindCompanion}
                className="bg-saath-600 hover:bg-saath-700 text-white text-base font-bold px-7 py-4 rounded-2xl shadow-elevated transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
              >
                <Compass className="w-5 h-5" />
                <span>Find a Companion</span>
              </button>

              <button
                onClick={handleFamilyView}
                className="bg-stone-900 hover:bg-stone-800 text-white text-base font-semibold px-7 py-4 rounded-2xl transition-all flex items-center justify-center gap-2.5 border border-stone-800"
              >
                <Eye className="w-5 h-5 text-amber-400" />
                <span>Family Visibility Hub</span>
              </button>
            </div>

            {/* Novelty Pills */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-stone-200 text-stone-700 text-xs">
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="font-bold block text-stone-900">1:1 Companion</span>
                <span className="text-stone-500">Dedicated bond</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="font-bold block text-stone-900">Know My Normal</span>
                <span className="text-stone-500">Wellness baseline</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="font-bold block text-stone-900">Verify & Monitor</span>
                <span className="text-stone-500">Zero OTP/PIN risk</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="font-bold block text-stone-900">4 Service Models</span>
                <span className="text-stone-500">On-demand to monthly</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-[4/3] sm:aspect-[1/1] max-w-lg mx-auto">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80"
                alt="Senior and young student sharing joyful conversation over tea"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent"></div>

              {/* Observation Report Feed Overlay */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-elevated border border-white/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-stone-900">Family Update Transmitted 🌿</span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-semibold">Just now</span>
                </div>
                <p className="text-xs text-stone-700 leading-snug">
                  <strong>Aditya</strong> completed 60-min session with <strong>Rajendra Kulkarni</strong>: Mood is cheerful, walked 45 mins.
                </p>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-100 text-stone-500">
                  <span>Know My Normal: Normal</span>
                  <span className="font-bold text-saath-700">Bangalore Alert Dispatched ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section (The 7-Step Continuous Care Cycle) */}
      <section className="bg-stone-50 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-saath-700 bg-saath-100 px-3 py-1 rounded-full border border-saath-200">
              The 7-Step Continuous Care Cycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
              Our Proven Methodology
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              A closed-loop system ensuring trust, consistent companionship, observation recording, and continuous relationship improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {methodologySteps.map(step => (
              <div
                key={step.num}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft flex flex-col justify-between space-y-3 relative group hover:border-saath-400 transition-all hover:shadow-card"
              >
                <div className="w-8 h-8 rounded-full bg-saath-600 text-white font-black text-sm flex items-center justify-center">
                  {step.num}
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-base group-hover:text-saath-700 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Service Models Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-saath-700 bg-saath-100 px-3 py-1 rounded-full border border-saath-200">
            Comprehensive Companionship Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
            The 4 Service Models
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            From single pay-per-visit sessions to full family-managed remote hubs and institutional partner integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((m, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 flex flex-col justify-between space-y-6 transition-all border ${
                m.highlight
                  ? 'bg-gradient-to-b from-stone-900 to-stone-950 text-white border-amber-400 shadow-card'
                  : 'bg-white text-stone-900 border-stone-200 shadow-soft hover:shadow-card'
              }`}
            >
              <div className="space-y-3">
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                  m.highlight ? 'bg-amber-400 text-stone-900' : 'bg-saath-100 text-saath-800'
                }`}>
                  {m.badge}
                </span>
                <h3 className="text-xl font-bold font-display">{m.title}</h3>
                <p className={`text-xs leading-relaxed ${m.highlight ? 'text-stone-300' : 'text-stone-600'}`}>
                  {m.desc}
                </p>
                <div className="pt-2">
                  <span className={`text-2xl font-black ${m.highlight ? 'text-amber-300' : 'text-stone-900'}`}>
                    {m.price}
                  </span>
                </div>
              </div>

              <button
                onClick={m.onAction}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                  m.highlight
                    ? 'bg-amber-400 hover:bg-amber-300 text-stone-950'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                <span>{m.action}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Safety: Verify -> Train -> Monitor */}
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
              Core Strategy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
              Trust & Safety: Verify → Train → Monitor
            </h2>
            <p className="text-stone-300 text-sm sm:text-base">
              Safeguarding seniors and empowering student companions through rigorous multi-level standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-800/80 p-6 rounded-3xl border border-stone-700 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-bold text-white text-lg">Verify</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Official college ID verification, background vetting, senior consent before service, and partner identification via NGOs/Hospitals.
              </p>
            </div>

            <div className="bg-stone-800/80 p-6 rounded-3xl border border-stone-700 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-bold text-white text-lg">Train</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Companion training & safety orientation. Strict policy: <strong>Zero handling of OTPs, PINs, bank accounts, or valuables</strong>.
              </p>
            </div>

            <div className="bg-stone-800/80 p-6 rounded-3xl border border-stone-700 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-bold text-white text-lg">Monitor</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Scheduled and recorded visits, family visibility through regular updates, "Know My Normal" detection, and clear complaint escalation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-200 text-stone-500 text-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-saath-600 text-white flex items-center justify-center font-bold">
              साथी
            </div>
            <span className="font-bold text-stone-900">Saathi / Saath Platform</span>
            <span className="text-stone-400">• Intergenerational Companionship</span>
          </div>
          <p className="text-xs text-stone-400 text-center sm:text-right">
            Intergenerational Companionship & Remote Family Visibility Platform
          </p>
        </div>
      </footer>
    </div>
  );
};
