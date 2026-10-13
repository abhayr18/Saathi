'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole, StudentProfile } from '@/types';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Star,
  Activity,
  Check,
  MessageCircle,
  PhoneCall,
  MapPin,
  Sparkles,
  Calendar,
  Heart,
  ChevronRight,
  GraduationCap,
  Sparkle,
  Clock,
  Shield,
  Coffee,
  Trees,
  Smartphone,
  BookOpen,
  Camera,
  Play,
  Flame,
  Award,
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
  onOpenMatchmaker?: () => void;
  onSelectStudent?: (student: StudentProfile) => void;
  onBookStudent?: (student: StudentProfile) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenMatchmaker,
  onSelectStudent,
  onBookStudent,
}) => {
  const { role, switchRole, language, students } = useApp();
  const isMr = language === 'mr';

  const [searchCity, setSearchCity] = useState('');

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('discovery');
  };

  const handleSelectRole = (targetRole: UserRole, targetTab: string) => {
    switchRole(targetRole);
    onNavigate(targetTab);
  };

  // ── 1. STORY-STYLE ROLE PROFILES (TOP TRAY) ──
  const roleProfiles = [
    {
      id: 'senior' as UserRole,
      defaultTab: 'dashboard',
      icon: '👴',
      photo: '/assets/senior_rajendra.jpg',
      titleMr: 'ज्येष्ठ नागरिक',
      titleEn: 'Senior Citizen',
      personNameMr: 'राजेंद्र कुलकर्णी',
      personNameEn: 'Rajendra Kulkarni',
      ageMr: 'वय ६८ • कोल्हापूर',
      ageEn: 'Age 68 • Kolhapur',
      quoteMr: '“बुद्धिबळ खेळण्यासाठी व स्मार्टफोन शिकण्यासाठी हक्काचा तरुण मित्र!”',
      quoteEn: '“Looking for a warm young companion for chess & walks!”',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      ringGradient: 'from-teal-500 via-cyan-500 to-sky-500',
      accentBg: 'from-teal-50/90 via-white to-sky-50/40',
      accentBorder: 'border-teal-300',
      tagsMr: ['♟️ बुद्धिबळ', '🚶 प्रभात फेरी', '📱 स्मार्टफोन मदत'],
      tagsEn: ['♟️ Chess', '🚶 Morning Walk', '📱 Tech Help'],
    },
    {
      id: 'student' as UserRole,
      defaultTab: 'dashboard',
      icon: '🎓',
      photo: '/assets/student_aditya.jpg',
      titleMr: 'केअर मित्र (तरुण सोबती)',
      titleEn: 'Care Mitra (Student)',
      personNameMr: 'आदित्य पाटील',
      personNameEn: 'Aditya Patil',
      ageMr: 'वय २१ • DY पाटील इंजिनिअरिंग',
      ageEn: 'Age 21 • DY Patil Engg',
      quoteMr: '“आजोबांसोबत वेळ घालवून सन्मानाने तासिका भत्ता व आशीर्वाद मिळतात.”',
      quoteEn: '“Earning pocket stipend with dignity while bringing joy to elders.”',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      ringGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      accentBg: 'from-emerald-50/90 via-white to-teal-50/40',
      accentBorder: 'border-emerald-300',
      tagsMr: ['💰 ₹१५०-१८०/तास', '🕒 लवचिक वेळ', '⭐ ५-स्टार रेटिंग'],
      tagsEn: ['💰 ₹150-180/hr', '🕒 Flexible Slots', '⭐ 5-Star Rating'],
    },
    {
      id: 'family' as UserRole,
      defaultTab: 'family',
      icon: '👨‍💼',
      photo: '/assets/family_amit.jpg',
      titleMr: 'कुटुंब व मुले',
      titleEn: 'Family & Children',
      personNameMr: 'अमित कुलकर्णी',
      personNameEn: 'Amit Kulkarni',
      ageMr: 'वय ३८ • सॉफ्टवेअर अभियंता, पुणे',
      ageEn: 'Age 38 • Software Engg, Pune',
      quoteMr: '“मी पुण्यात असलो तरी बाबांच्या तब्येतीचे थेट व्हॉट्सॲप अपडेट्स मिळतात.”',
      quoteEn: '“Working away from home, I get real-time WhatsApp updates on Baba.”',
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
      ringGradient: 'from-sky-500 via-blue-500 to-indigo-500',
      accentBg: 'from-sky-50/90 via-white to-blue-50/40',
      accentBorder: 'border-sky-300',
      tagsMr: ['📲 व्हॉट्सॲप समरी', '🩺 BP व SPO2 ट्रॅकिंग', '🚨 २४/७ SOS अलर्ट'],
      tagsEn: ['📲 WhatsApp Summary', '🩺 BP & SPO2 Logs', '🚨 24/7 SOS Alert'],
    },
    {
      id: 'admin' as UserRole,
      defaultTab: 'admin',
      icon: '🛡️',
      photo: '/assets/admin_officer.jpg',
      titleMr: 'साथी सुरक्षा कक्ष',
      titleEn: 'Safety & Verification',
      personNameMr: 'साथी पडताळणी कक्ष',
      personNameEn: 'Saathi Care Desk',
      ageMr: '२४/७ सुरक्षा टीम',
      ageEn: '24/7 Safety Cell',
      quoteMr: '“१००% आधार व कॉलेज पडताळणीनंतरच सोबती नियुक्त केला जातो.”',
      quoteEn: '“Zero compromise on safety. Every single companion is verified.”',
      badgeColor: 'bg-slate-50 text-slate-800 border-slate-200',
      ringGradient: 'from-slate-600 via-teal-700 to-cyan-700',
      accentBg: 'from-slate-50/90 via-white to-teal-50/40',
      accentBorder: 'border-slate-300',
      tagsMr: ['✓ आधार पडताळणी', '✓ कॉलेज ID चेक', '✓ २४/७ सपोर्ट'],
      tagsEn: ['✓ Aadhaar Verified', '✓ College ID Check', '✓ 24/7 Support'],
    },
  ];

  // ── 2. REAL PHOTO VISUAL ACTIVITIES (HIGH ATTENTION CARDS) ──
  const visualPhotoActivities = [
    {
      id: 'Chess',
      image: '/assets/activity_chess.jpg',
      icon: '♟️',
      badgeMr: 'बुद्धिबळ व खेळ',
      badgeEn: 'Chess & Mind Games',
      statusMr: '१२ सोबती सज्ज',
      statusEn: '12 Mitras Ready',
      tagColor: 'bg-amber-500 text-white',
    },
    {
      id: 'Walking',
      image: '/assets/activity_walk.jpg',
      icon: '🚶',
      badgeMr: 'प्रभात फेरी व वॉक',
      badgeEn: 'Morning Garden Walk',
      statusMr: '१० सोबती सज्ज',
      statusEn: '10 Mitras Ready',
      tagColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'Conversation',
      image: '/assets/activity_chai.jpg',
      icon: '☕',
      badgeMr: 'चहा व गप्पागोष्टी',
      badgeEn: 'Tea & Warm Talks',
      statusMr: '१५ सोबती सज्ज',
      statusEn: '15 Mitras Ready',
      tagColor: 'bg-teal-600 text-white',
    },
    {
      id: 'Technology Help',
      image: '/assets/activity_tech.jpg',
      icon: '📱',
      badgeMr: 'स्मार्टफोन शिकवणी',
      badgeEn: 'Smartphone Learning',
      statusMr: '८ सोबती सज्ज',
      statusEn: '8 Mitras Ready',
      tagColor: 'bg-blue-600 text-white',
    },
    {
      id: 'Katta',
      image: '/assets/social_katta.jpg',
      icon: '🌿',
      badgeMr: 'सामाजिक कट्टा मंडळ',
      badgeEn: 'Social Katta Circle',
      statusMr: 'दररोज सायंकाळी',
      statusEn: 'Every Evening',
      tagColor: 'bg-purple-600 text-white',
    },
  ];

  // ── 3. VISUAL 3-STEP FLOW ──
  const visualSteps = [
    {
      step: '१',
      emoji: '🤝',
      titleMr: 'सोबती निवडा',
      titleEn: 'Choose Companion',
      badgeMr: '१-क्लिक फोटो प्रोफाइल',
      badgeEn: '1-Click Photo Profile',
    },
    {
      step: '२',
      emoji: '📅',
      titleMr: 'वेळ ठरवा',
      titleEn: 'Set Date & Time',
      badgeMr: 'घरी किंवा ऑनलाइन भेट',
      badgeEn: 'Home or Online Visit',
    },
    {
      step: '३',
      emoji: '😊',
      titleMr: 'आनंद अनुभवा',
      titleEn: 'Share Joy & Peace',
      badgeMr: 'मुलांना व्हॉट्सॲप अपडेट',
      badgeEn: 'Live WhatsApp to Kids',
    },
  ];

  const activeProfile = roleProfiles.find(p => p.id === role) || roleProfiles[0];

  return (
    <div className="space-y-8 sm:space-y-12 pb-20">

      {/* ─── 1. TOP INTERACTIVE STORY BAR (EYE-CATCHING STORIES) ─── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4">
        <div className="bg-gradient-to-r from-teal-500/10 via-white to-sky-500/10 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 border-2 border-teal-200/80 shadow-soft space-y-4 sm:space-y-5">
          
          {/* Header Bar with Live Badge */}
          <div className="flex items-center justify-between pb-1 border-b border-stone-200/60">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] sm:text-sm font-black uppercase tracking-wider text-teal-900 truncate">
                {isMr ? '🎭 ४ परस्परसंवादी भूमिका • टॅप करा' : '🎭 4 Interactive Roles • Tap Any Story'}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-black">
                <span>📍 कोल्हापूर & पुणे</span>
              </span>
            </div>
          </div>

          {/* Glowing Avatar Rings Tray */}
          <div className="flex items-center justify-between sm:justify-around gap-2.5 sm:gap-8 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
            {roleProfiles.map(p => {
              const isActive = role === p.id;

              return (
                <button
                  key={p.id}
                  onClick={() => switchRole(p.id)}
                  className="flex flex-col items-center group shrink-0 focus:outline-none transition-all duration-300"
                  title={isMr ? `${p.titleMr} निवडा` : `Switch to ${p.titleEn}`}
                >
                  {/* Glowing Story Ring */}
                  <div className="relative">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 aspect-square rounded-full p-[2px] sm:p-[2.5px] transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-tr ${p.ringGradient} shadow-md scale-102 ring-2 sm:ring-3 ring-teal-400/50`
                          : 'bg-stone-200 group-hover:bg-teal-400/80 group-hover:scale-105 shadow-xs'
                      }`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-white p-[1px] sm:p-[1.5px] aspect-square">
                        <img
                          src={p.photo}
                          alt={p.personNameEn}
                          className="w-full h-full aspect-square object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Emoji Sticker on Ring */}
                    <div className="absolute -bottom-0.5 -right-0.5 text-xs sm:text-base bg-white rounded-full p-0.5 shadow-sm border border-stone-200 flex items-center justify-center">
                      <span>{p.icon}</span>
                    </div>

                    {/* Active Selected Pill */}
                    {isActive && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-teal-800 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-md whitespace-nowrap animate-bounce-short">
                        {isMr ? 'सक्रिय ✓' : 'Active ✓'}
                      </div>
                    )}
                  </div>

                  {/* Name Label */}
                  <div className="text-center mt-2 sm:mt-2.5 space-y-0.5">
                    <span
                      className={`text-[11px] sm:text-xs font-black block transition-colors leading-tight ${
                        isActive ? 'text-teal-900 font-extrabold' : 'text-stone-700 group-hover:text-stone-900'
                      }`}
                    >
                      {isMr ? p.personNameMr.split(' ')[0] : p.personNameEn.split(' ')[0]}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[11px] font-bold block ${
                        isActive ? 'text-teal-700' : 'text-stone-400'
                      }`}
                    >
                      {isMr ? p.titleMr : p.titleEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Spotlight Card with Visual Chips & 1-Tap Launch */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border-2 bg-gradient-to-r ${activeProfile.accentBg} ${activeProfile.accentBorder} shadow-sm transition-all`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-md border-2 border-white">
                  <img
                    src={activeProfile.photo}
                    alt={activeProfile.personNameEn}
                    className="w-full h-full aspect-square object-cover"
                  />
                </div>
                <div className="space-y-1 sm:space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 sm:px-3 py-0.5 rounded-full border bg-white text-stone-900 shadow-2xs">
                      {isMr ? activeProfile.titleMr : activeProfile.titleEn}
                    </span>
                    <span className="text-[10px] sm:text-xs text-stone-500 font-bold truncate">
                      {isMr ? activeProfile.ageMr : activeProfile.ageEn}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-2xl font-black text-stone-900 truncate">
                    {isMr ? activeProfile.personNameMr : activeProfile.personNameEn}
                  </h3>
                  
                  {/* Visual Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
                    {(isMr ? activeProfile.tagsMr : activeProfile.tagsEn).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-white/90 text-stone-800 text-[10px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl border border-stone-200/80 shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Big Touch CTA Button */}
              <div className="shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => handleSelectRole(activeProfile.id, activeProfile.defaultTab)}
                  className="w-full sm:w-auto bg-saath-600 hover:bg-saath-700 text-white font-black text-xs sm:text-base px-5 sm:px-7 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-elevated transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>
                    {isMr
                      ? `${activeProfile.personNameMr.split(' ')[0]}ंच्या रूपात सुरू करा`
                      : `Open ${activeProfile.titleEn} View`}
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. ATTENTION-CATCHY PHOTO HERO & LIVE STATS ─── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 border-2 border-stone-200 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">

            {/* Left Column: Visual Punchy Headline & Instant Search */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              
              {/* Visual Ticker Badges */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] sm:text-xs font-black">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{isMr ? '१४ सोबती सक्रिय' : '14 Mitras Online'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] sm:text-xs font-black">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                  <span>{isMr ? '४.९/५ समाधान' : '4.9/5 Rating'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[11px] sm:text-xs font-black">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                  <span>{isMr ? '१००% पडताळणी' : '100% Vetted'}</span>
                </span>
              </div>

              {/* Bold Visual Headline */}
              <h1 className="text-2xl sm:text-5xl font-black text-stone-900 tracking-tight font-display leading-[1.2]">
                {isMr ? (
                  <>
                    <span className="text-saath-600 block">वय वाढले तरी एकटेपणा नको.</span>
                    <span className="text-stone-900 block text-lg sm:text-4xl mt-1 sm:mt-1.5 font-bold font-sans">
                      हक्काचा तरुण सोबती, गप्पागोष्टी आणि कुटुंबाला मनःशांती.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-saath-600 block">Growing older with warmth and smiles.</span>
                    <span className="text-stone-900 block text-lg sm:text-4xl mt-1 sm:mt-1.5 font-bold font-sans">
                      Empathetic youth companionship & family peace of mind.
                    </span>
                  </>
                )}
              </h1>

              {/* High-Contrast Search Bar */}
              <form onSubmit={handleCitySearch} className="max-w-xl pt-1">
                <div className="bg-stone-50 p-2 sm:p-2.5 rounded-2xl border-2 border-stone-300 focus-within:border-teal-500 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shadow-xs transition-all">
                  <div className="flex items-center gap-2.5 px-2 sm:px-3 flex-1 py-1">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-saath-600 shrink-0" />
                    <input
                      type="text"
                      value={searchCity}
                      onChange={e => setSearchCity(e.target.value)}
                      placeholder={isMr ? "आपला परिसर (उदा. ताराबाई पार्क, कोल्हापूर...)" : "Enter locality (e.g. Tarabai Park, Kolhapur...)"}
                      className="w-full bg-transparent text-sm sm:text-base font-bold text-stone-900 placeholder:text-stone-400 placeholder:text-xs sm:placeholder:text-sm focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-saath-600 hover:bg-saath-700 text-white font-black text-xs sm:text-sm px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 active:scale-98"
                  >
                    <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{isMr ? 'सोबती शोधा' : 'Find Companion'}</span>
                  </button>
                </div>
              </form>

              {/* Quick Feature Badges */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 pt-1">
                <button
                  onClick={() => onNavigate('discovery')}
                  className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] sm:text-xs font-black border border-teal-200 transition-colors"
                >
                  <span>♟️ बुद्धिबळ खेळणारे मित्र</span>
                </button>
                <button
                  onClick={() => onNavigate('discovery')}
                  className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] sm:text-xs font-black border border-emerald-200 transition-colors"
                >
                  <span>🚶 मॉर्निंग वॉक जोडीदार</span>
                </button>
                <button
                  onClick={() => onNavigate('discovery')}
                  className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-[11px] sm:text-xs font-black border border-blue-200 transition-colors"
                >
                  <span>📱 फोन शिकवणारे मित्र</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual Photo with Real-Time WhatsApp Vitals Overlay */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-elevated border-2 sm:border-4 border-white bg-stone-100 aspect-[4/3] w-full max-w-md max-h-[280px] sm:max-h-[340px] mx-auto group">
                <img
                  src="/assets/maharashtrian_hero.jpg"
                  alt="Senior grandfather smiling with youth companion"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/15 to-transparent"></div>

                {/* Floating WhatsApp Live Status Pill */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-emerald-600 text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-black shadow-md flex items-center gap-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white"></span>
                  <span>{isMr ? 'थेट व्हॉट्सॲप कनेक्ट' : 'WhatsApp Live'}</span>
                </div>

                {/* Floating Real-time Family Card */}
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-elevated border border-white/80 space-y-1 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[11px] sm:text-xs font-black text-stone-900">
                        {isMr ? 'कुटुंबाला थेट अपडेट 🌿' : 'Live Family Reassurance 🌿'}
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-stone-500 font-black">{isMr ? 'आत्ताच' : 'Just now'}</span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-stone-800 font-semibold leading-snug">
                    <strong>{isMr ? 'आदित्य पाटील (सोबती)' : 'Aditya Patil'}</strong> • <strong>{isMr ? 'राजेंद्र कुलकर्णी' : 'Rajendra Kulkarni'}</strong> {isMr ? 'यांच्यासोबत आजचे संध्याकाळचे सत्र पूर्ण झाले.' : 'completed evening walk session.'}
                  </p>

                  {/* High-Contrast Live Vitals Gauges */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1 border-t border-stone-200 text-center">
                    <div className="bg-teal-50 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-teal-200">
                      <span className="text-[8px] sm:text-[9px] text-stone-500 block font-bold">BP</span>
                      <span className="text-xs sm:text-sm font-black text-stone-900">120/80</span>
                    </div>
                    <div className="bg-emerald-50 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-emerald-200">
                      <span className="text-[8px] sm:text-[9px] text-stone-500 block font-bold">SPO2</span>
                      <span className="text-xs sm:text-sm font-black text-emerald-800">98%</span>
                    </div>
                    <div className="bg-amber-50 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-amber-200">
                      <span className="text-[8px] sm:text-[9px] text-stone-500 block font-bold">MOOD</span>
                      <span className="text-xs sm:text-sm font-black text-amber-800">{isMr ? 'आनंदी 😊' : 'Happy 😊'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. REAL PHOTO ACTIVITY TILES ("आपल्याला काय करायला आवडेल?") ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-black uppercase tracking-wider border border-teal-200">
            <span>📸</span>
            <span>{isMr ? 'आपल्या आवडीचे उपक्रम' : 'Popular Activities'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 font-display">
            {isMr ? 'आज आपल्याला काय करायला आवडेल?' : 'What Would You Like To Do Today?'}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-semibold">
            {isMr
              ? 'खालील फोटोवर टॅप करा व तयार असलेले सोबती त्वरित पहा.'
              : 'Tap any activity photo to immediately see vetted companions.'}
          </p>
        </div>

        {/* 5 Real Photograph Visual Activity Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-5">
          {visualPhotoActivities.map(act => (
            <div
              key={act.id}
              onClick={() => onNavigate('discovery')}
              className={`group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-stone-200 hover:border-saath-500 shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer flex flex-col active:scale-98 ${
                act.id === 'Katta' ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              {/* Photo Area with Tag */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={act.image}
                  alt={act.badgeEn}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>
                
                {/* Status Chip */}
                <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5">
                  <span className={`text-[9px] sm:text-[10px] font-black uppercase px-2 sm:px-2.5 py-0.5 rounded-full shadow-xs ${act.tagColor}`}>
                    {isMr ? act.statusMr : act.statusEn}
                  </span>
                </div>

                {/* Big Emoji Icon */}
                <div className="absolute bottom-1.5 left-2 sm:bottom-2 sm:left-2.5 text-xl sm:text-2xl drop-shadow-md">
                  <span>{act.icon}</span>
                </div>
              </div>

              {/* Title & 1-Tap CTA */}
              <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 bg-white">
                <h3 className="text-xs sm:text-base font-black text-stone-900 group-hover:text-saath-700 transition-colors leading-snug">
                  {isMr ? act.badgeMr : act.badgeEn}
                </h3>
                
                <div className="pt-2 sm:pt-3 mt-1 flex items-center justify-between text-[11px] sm:text-xs font-black text-saath-700 group-hover:text-saath-800">
                  <span>{isMr ? 'सोबती पहा ➔' : 'View Mitras ➔'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. "आमचे विश्वासू सोबती" (FEATURED COMPANION CARDS) ─── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <div className="space-y-1 sm:space-y-1.5">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-0.5 sm:py-1 rounded-full border border-teal-200">
              {isMr ? 'विश्वासू तरुण सोबती' : 'VERIFIED MITRAS'}
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-stone-900 font-display">
              {isMr ? 'आपुलकीने वेळ देणारे आमचे साथी मित्र' : 'Our Trusted Student Companions'}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm font-semibold">
              {isMr
                ? 'आधार व कॉलेज पडताळणी झालेले, आदर आणि आपुलकीने वेळ देणारे महाविद्यालयीन विद्यार्थी.'
                : '100% background-verified college youth providing empathetic companionship.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('discovery')}
            className="text-saath-700 hover:text-saath-800 text-xs sm:text-sm font-black flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>{isMr ? 'सर्व सोबती पहा (८+ सोबती)' : 'Browse All (8+ Mitras)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Prominent Companion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {students.slice(0, 3).map(student => (
            <div
              key={student.id}
              className="bg-white rounded-2xl sm:rounded-3xl border-2 border-stone-200 hover:border-saath-500 p-4 sm:p-6 flex flex-col justify-between shadow-soft hover:shadow-card transition-all group"
            >
              <div className="space-y-3 sm:space-y-4">
                {/* Photo with verified badge & rate */}
                <div className="flex items-start justify-between gap-3">
                  <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-stone-200 shadow-xs">
                    <img
                      src={student.profilePhoto}
                      alt={student.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {student.isVerified && (
                      <div className="absolute top-1 right-1 bg-emerald-600 text-white p-1 rounded-full shadow-xs">
                        <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="text-right space-y-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-black bg-amber-50 text-amber-800 border border-amber-200">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <span>{student.rating}</span>
                    </span>
                    <div className="text-base sm:text-lg font-black text-stone-900">
                      ₹{student.hourlyRate}/{isMr ? 'तास' : 'hr'}
                    </div>
                  </div>
                </div>

                {/* Name, college & locality */}
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 group-hover:text-saath-700 transition-colors">
                    {student.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-semibold flex items-center gap-1 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-saath-600 shrink-0" />
                    <span className="truncate">{student.college}</span>
                  </p>
                  <p className="text-xs text-stone-500 font-semibold flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{student.distanceKm} {isMr ? 'किमी अंतरावर • कोल्हापूर' : 'km away • Kolhapur'}</span>
                  </p>
                </div>

                {/* Activity Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
                  {student.interests.map(act => (
                    <span
                      key={act}
                      className="bg-stone-100 text-stone-800 text-[11px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>

              {/* Big Touch Action Buttons */}
              <div className="pt-4 mt-3 sm:pt-5 sm:mt-4 border-t border-stone-100 flex items-center gap-2 sm:gap-2.5">
                <button
                  onClick={() => onSelectStudent ? onSelectStudent(student) : onNavigate('discovery')}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-black py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm transition-colors text-center"
                >
                  {isMr ? 'माहिती पहा' : 'View Profile'}
                </button>
                <button
                  onClick={() => onBookStudent ? onBookStudent(student) : onNavigate('discovery')}
                  className="flex-1 bg-saath-600 hover:bg-saath-700 text-white font-black py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm transition-all shadow-xs active:scale-98 text-center"
                >
                  {isMr ? 'भेट बुक करा' : 'Book Session'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 5. ULTRA-MINIMAL 3-STEP VISUAL TIMELINE ─── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-0.5 sm:py-1 rounded-full border border-teal-200">
            {isMr ? '३ सोप्या पायऱ्या' : '3 EASY STEPS'}
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-stone-900 font-display">
            {isMr ? 'अतिशय सोपी व सुरक्षित कार्यपद्धती' : 'Simple, Safe and Easy for Seniors'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
          {visualSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-stone-200 shadow-soft flex flex-col space-y-2.5 sm:space-y-3 text-center items-center group hover:border-teal-400 transition-all"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-saath-600 text-white font-black text-sm sm:text-base flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                {step.step}
              </div>
              <span className="text-4xl sm:text-5xl pt-0.5">{step.emoji}</span>
              <h3 className="text-lg sm:text-xl font-black text-stone-900">
                {isMr ? step.titleMr : step.titleEn}
              </h3>
              <span className="text-[11px] sm:text-xs font-black text-teal-800 bg-teal-50 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-teal-200">
                {isMr ? step.badgeMr : step.badgeEn}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 6. CARE PLANS & PRICING (HIGH CONTRAST & MINIMAL TEXT) ─── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-0.5 sm:py-1 rounded-full border border-teal-200">
            {isMr ? 'केअर प्लॅन्स व वर्गणी' : 'CARE PLANS & PRICING'}
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-stone-900 font-display">
            {isMr ? 'पालकांसाठी सर्वोत्तम केअर प्लॅन निवडा' : 'Transparent Care Plans For Every Family'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          
          {/* Plan 1 */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-stone-200 shadow-soft flex flex-col justify-between hover:shadow-card transition-all">
            <div className="space-y-3">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wide text-stone-700 bg-stone-100 px-3 py-1 rounded-full inline-block">
                {isMr ? 'सुरुवातीसाठी उत्तम' : 'Pay Per Visit'}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-stone-900">
                {isMr ? 'प्रति भेट (Pay Per Visit)' : 'Pay Per Visit'}
              </h3>
              <div className="flex items-baseline gap-1 pt-1">
                <span className="text-3xl sm:text-4xl font-black text-stone-900 font-display">₹१५०</span>
                <span className="text-xs font-bold text-stone-500">{isMr ? '/ तास' : '/ hour'}</span>
              </div>
              <ul className="space-y-2 pt-3 border-t border-stone-100 text-xs font-bold text-stone-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? '१००% पडताळणी झालेले सोबती' : '100% Vetted Mitras'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? 'कुटुंबाला व्हॉट्सॲप अपडेट' : 'WhatsApp Family Summary'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? '२४/७ इमर्जन्सी SOS' : '24/7 Emergency SOS'}</span>
                </li>
              </ul>
            </div>
            <div className="pt-5 sm:pt-6">
              <button
                onClick={() => onNavigate('discovery')}
                className="w-full py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black bg-stone-900 hover:bg-stone-800 text-white transition-all text-center"
              >
                {isMr ? 'सोबती शोधा' : 'Find Companion'}
              </button>
            </div>
          </div>

          {/* Plan 2: Most Popular */}
          <div className="bg-gradient-to-b from-teal-50/80 via-white to-teal-50/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-saath-500 shadow-elevated scale-100 md:scale-102 ring-2 sm:ring-4 ring-saath-400/20 flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-saath-600 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs whitespace-nowrap">
              {isMr ? 'सर्वाधिक पसंती ⭐' : 'Most Popular ⭐'}
            </div>
            <div className="space-y-3">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wide text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full inline-block">
                {isMr ? 'मासिक साथी केअर' : 'Monthly Care'}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-stone-900">
                {isMr ? 'मासिक साथी केअर' : 'Monthly Saathi Care'}
              </h3>
              <div className="flex items-baseline gap-1 pt-1">
                <span className="text-3xl sm:text-4xl font-black text-stone-900 font-display">₹१,४९९</span>
                <span className="text-xs font-bold text-stone-500">{isMr ? '/ महिना' : '/ month'}</span>
              </div>
              <ul className="space-y-2 pt-3 border-t border-stone-100 text-xs font-bold text-stone-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? 'महिन्याला १० तास सोबती' : '10 Hours Companionship'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? 'Know My Normal आरोग्य ट्रॅकिंग' : 'Know My Normal Vitals'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? 'समर्पित केअर कॉर्डिनेटर' : 'Dedicated Care Coordinator'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? 'मोफत सामाजिक कट्टा प्रवेश' : 'Free Social Katta Access'}</span>
                </li>
              </ul>
            </div>
            <div className="pt-5 sm:pt-6">
              <button
                onClick={() => onNavigate('careplans')}
                className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black bg-saath-600 hover:bg-saath-700 text-white shadow-md transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>{isMr ? 'हा प्लॅन सुरू करा' : 'Select Plan'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Plan 3 */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-stone-200 shadow-soft flex flex-col justify-between hover:shadow-card transition-all">
            <div className="space-y-3">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wide text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full inline-block">
                {isMr ? 'परगावी असणाऱ्या मुलांसाठी' : 'For Distant Kids'}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-stone-900">
                {isMr ? 'प्रीमियम फॅमिली कनेक्ट' : 'Premium Family Connect'}
              </h3>
              <div className="flex items-baseline gap-1 pt-1">
                <span className="text-3xl sm:text-4xl font-black text-stone-900 font-display">₹२,९९९</span>
                <span className="text-xs font-bold text-stone-500">{isMr ? '/ महिना' : '/ month'}</span>
              </div>
              <ul className="space-y-2 pt-3 border-t border-stone-100 text-xs font-bold text-stone-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? 'महिन्याला २० तास सोबती' : '20 Hours Companionship'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? 'डॉक्टर क्लिनिक सोबती' : 'Doctor Clinic Escort'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? 'साप्ताहिक व्हिडिओ कॉल अहवाल' : 'Weekly Video Health Report'}</span>
                </li>
              </ul>
            </div>
            <div className="pt-5 sm:pt-6">
              <button
                onClick={() => onNavigate('careplans')}
                className="w-full py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black bg-stone-900 hover:bg-stone-800 text-white transition-all text-center"
              >
                {isMr ? 'तपशील पहा' : 'View Details'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 7. ECOSYSTEM FOOTER (ATTENTION-CATCHY HELPLINE) ─── */}
      <footer className="bg-stone-900 text-stone-300 py-10 sm:py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 sm:pb-8 border-b border-stone-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-saath-500 flex items-center justify-center text-white font-black text-xl">
                  सा
                </div>
                <span className="text-2xl font-black text-white font-display">साथी Saathi</span>
              </div>
              <p className="text-xs text-stone-400 max-w-md font-medium leading-relaxed">
                {isMr
                  ? 'ज्येष्ठ नागरिकांचा एकटेपणा दूर करणारी, महाविद्यालयीन तरुणांना घडवणारी आणि कुटुंबाला मनःशांती देणारी आपुलकीची परिसंस्था.'
                  : 'Empathetic intergenerational companionship connecting verified youth with seniors.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <a
                href="tel:1800-SAATHI-CARE"
                className="bg-stone-800 hover:bg-stone-700 text-white px-5 py-3 rounded-xl sm:rounded-2xl text-xs font-black border border-stone-700 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>१८००-साथी-केअर (टोल फ्री)</span>
              </a>
              <button
                onClick={() => onNavigate('discovery')}
                className="bg-saath-600 hover:bg-saath-700 text-white px-6 py-3 rounded-xl sm:rounded-2xl text-xs font-black flex items-center justify-center gap-2"
              >
                <span>{isMr ? 'सोबती शोधा' : 'Find Companion'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-bold">
            <p>© २०२६ साथी Saathi Care Ecosystem. {isMr ? 'सर्व हक्क राखीव.' : 'All rights reserved.'}</p>
            <div className="flex items-center gap-4">
              <span>{isMr ? 'महाराष्ट्र व दिल्ली NCR' : 'Maharashtra & Delhi NCR'}</span>
              <span>•</span>
              <span>{isMr ? '२४/७ सुरक्षा कक्ष' : '24/7 Safety Desk'}</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
