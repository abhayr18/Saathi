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
  const { currentSenior, observations, carePlans, students, bookings, language } = useApp();
  const isMr = language === 'mr';

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
            <span>{isMr ? 'मॉडेल ३: कुटुंब मनःशांती व रिमोट मॉनिटरिंग हब' : 'Model 3: Family Visibility & Peace of Mind Hub'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            {isMr ? 'स्वागत आहे, अमित कुलकर्णी 👋' : 'Welcome, Amit Kulkarni 👋'}
          </h1>
          <p className="text-stone-300 text-sm">
            {isMr
              ? `${currentSenior.name} (वय ६८, ${currentSenior.area}, ${currentSenior.city}) यांच्या आरोग्याची थेट माहिती.`
              : `Remote Monitoring for ${currentSenior.name} (68) in ${currentSenior.area}, ${currentSenior.city}.`}
          </p>
          <div className="flex items-center gap-2 text-xs text-stone-400 pt-1 flex-wrap">
            <span>{isMr ? 'स्थान: बेंगळुरू, कर्नाटक' : 'Viewing from: Bangalore, Karnataka'}</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isMr ? 'Know My Normal: सामान्य व स्थिर' : 'Know My Normal Detection: Normal'}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => onNavigate('messages')}
            className="bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs px-4 py-3 rounded-2xl transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isMr ? `सोबत्याशी बोला (${activeCompanion.name.split(' ')[0]})` : `Chat with Companion (${activeCompanion.name.split(' ')[0]})`}</span>
          </button>
          <button
            onClick={() => onNavigate('careplans')}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs px-4 py-3 rounded-2xl transition-all border border-stone-700 flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-teal-400" />
            <span>{isMr ? 'केअर प्लॅन्स' : 'Care Plans'}</span>
          </button>
        </div>
      </div>

      {/* Novelty Spotlight: "Know My Normal" Detection & Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-200 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold">
            <span className="uppercase tracking-wider">{isMr ? 'मूड व सहभाग' : 'Mood & Engagement'}</span>
            <Smile className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-stone-900 font-display">{isMr ? 'आनंदी व उत्साही' : 'Cheerful & Active'}</span>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
              {isMr ? 'स्थिर ✓' : 'Stable'}
            </span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isMr
              ? 'गेल्या सर्व ४ भेटींमध्ये बुद्धिबळ, स्मार्टफोन शिकणे आणि कॉलनी पार्कमध्ये उत्साही सहभाग नोंदवला गेला.'
              : '4 out of 4 recent companion visits logged enthusiastic participation in chess, smartphone learning, and colony strolls.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-200 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold">
            <span className="uppercase tracking-wider">{isMr ? 'हालचाल व प्रभात फेरी' : 'Mobility & Strolls'}</span>
            <Activity className="w-5 h-5 text-saath-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-stone-900 font-display">{isMr ? 'नियमित वॉक' : 'Regular Walk'}</span>
            <span className="text-xs text-saath-800 font-bold bg-saath-100 px-2 py-0.5 rounded-full">
              {isMr ? 'सरासरी ४५ मिनिटे' : '45 mins avg'}
            </span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isMr
              ? 'सोबती आदित्य यांच्यासोबत राजारामपुरी कॉलनी पार्कमध्ये संध्याकाळची फेरी पूर्ण झाली. कोणताही थकवा आढळला नाही.'
              : 'Walked comfortably through Rajarampuri colony with companion Aditya on Wednesday. No fatigue or balance issues noted.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-200 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold">
            <span className="uppercase tracking-wider">{isMr ? 'मुख्य सोबती (केअर मित्र)' : 'Primary Companion'}</span>
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
              <h4 className="font-bold text-stone-900 text-sm">{activeCompanion.name} ({isMr ? 'वय २१' : '21 yrs'})</h4>
              <p className="text-xs text-stone-500">ADCET Engineering • ★ {activeCompanion.rating}</p>
            </div>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-100 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{isMr ? '१००% कॉलेज आयडी व पोलीस पडताळणी' : '100% Background & College Verified'}</span>
          </div>
        </div>
      </div>

      {/* Active Care Subscription Plan (Model 2/3) */}
      {activePlan && (
        <div className="bg-gradient-to-r from-teal-50 to-sky-50 border-2 border-teal-200 p-6 rounded-3xl shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-900 uppercase tracking-wider bg-teal-100/90 px-2.5 py-0.5 rounded-full border border-teal-200">
              {isMr ? 'सक्रिय मासिक केअर सबस्क्रिप्शन' : 'Active Monthly Care Subscription'}
            </span>
            <h3 className="text-xl font-black text-stone-900 mt-1">
              {activePlan.planName}
            </h3>
            <p className="text-xs text-stone-600">
              {isMr ? 'प्रायोजक:' : 'Sponsored by:'} <strong>{activePlan.sponsorName}</strong> • {isMr ? 'मासिक शुल्क:' : 'Monthly billing:'} ₹{activePlan.monthlyCost}/{isMr ? 'महिना' : 'mo'}
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-stone-700 pt-1">
              <span>{isMr ? 'पूर्ण झालेल्या भेटी:' : 'Visits Completed:'} <strong>{activePlan.visitsCompleted} {isMr ? 'पैकी' : 'of'} {activePlan.visitsPerMonth}</strong></span>
              <span>•</span>
              <span className="text-saath-700">{isMr ? 'पुढील भेट:' : 'Next Visit:'} <strong>{activePlan.nextScheduledVisit}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('careplans')}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              {isMr ? 'प्लॅन बदला किंवा व्यवस्थापित करा' : 'Manage / Upgrade Plan'}
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
              <span>{isMr ? 'सोबत्यांचे निरीक्षण व भेट अहवाल' : 'Companion Observation Feed & Visit Reports'}</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {isMr
                ? 'प्रत्येक १:१ भेटीनंतर कॉलेज सोबत्याने नोंदवलेले अचूक आरोग्य, मूड व गतिशीलता तपशील.'
                : 'Structured observations logged by student companions after every completed visit.'}
            </p>
          </div>

          <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
            {isMr ? `${seniorObservations.length} अहवाल उपलब्ध` : `${seniorObservations.length} Logs Available`}
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
                      {isMr ? `${obs.companionName} यांची भेट` : `Visit by ${obs.companionName}`}
                    </h4>
                    <p className="text-xs text-stone-500">
                      {obs.date} • {obs.durationMinutes} {isMr ? 'मिनिटे' : 'mins'} • {obs.activity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {isMr ? 'मूड:' : 'Mood:'} {obs.mood}
                  </span>
                  <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {isMr ? 'सहभाग:' : 'Engagement:'} {obs.engagement}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed italic">
                "{obs.notes}"
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isMr ? 'हालचाल:' : 'Mobility:'} {obs.mobilityObserved}</span>
                </span>
                <span>{isMr ? 'कुटुंबाला व्हॉट्सॲपवर पाठवले ✓' : 'Transmitted to Family WhatsApp & Dashboard'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
