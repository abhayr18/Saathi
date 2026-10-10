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
  User,
  GraduationCap,
  Sparkle,
  Clock,
  Shield,
  Coffee,
  Trees,
  Smartphone,
  BookOpen,
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
  const [selectedActivityFilter, setSelectedActivityFilter] = useState<string>('all');

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('discovery');
  };

  const handleSelectRole = (targetRole: UserRole, targetTab: string) => {
    switchRole(targetRole);
    onNavigate(targetTab);
  };

  // ── 1. STORY-STYLE ROLE PROFILES (POSITIONED AT TOP FOR INSTANT RECOGNITION) ──
  const roleProfiles = [
    {
      id: 'senior' as UserRole,
      defaultTab: 'dashboard',
      icon: '👴',
      photo: '/assets/senior_rajendra.jpg',
      titleMr: 'ज्येष्ठ नागरिक',
      titleEn: 'Senior Citizen',
      personNameMr: 'राजेंद्र कुलकर्णी (आजोबा)',
      personNameEn: 'Rajendra Kulkarni',
      ageMr: 'वय ६८ • कोल्हापूर',
      ageEn: 'Age 68 • Kolhapur',
      subtitleMr: 'सेवेचे मुख्य लाभार्थी',
      subtitleEn: 'Primary Care Recipient',
      quoteMr: '“बुद्धिबळ खेळण्यासाठी आणि स्मार्टफोन शिकण्यासाठी हक्काचा तरुण मित्र हवाय.”',
      quoteEn: '“Looking for a warm young companion for chess, evening walks & phone help.”',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      ringGradient: 'from-teal-500 via-cyan-500 to-sky-500',
      accentBg: 'from-teal-50/90 via-white to-sky-50/40',
      accentBorder: 'border-teal-300',
      featuresMr: [
        'पडताळणी झालेले सोबती शोधा व १:१ भेट बुक करा',
        'सामाजिक कट्टा व हास्य मंडळात सहभागी व्हा',
        'तात्काळ इमर्जन्सी SOS आणि सुरक्षितता बटण',
      ],
      featuresEn: [
        'Browse vetted companions & book 1:1 sessions',
        'Join Social Katta, chess & gardening circles',
        'One-touch Emergency SOS assistance',
      ],
    },
    {
      id: 'student' as UserRole,
      defaultTab: 'dashboard',
      icon: '🎓',
      photo: '/assets/student_aditya.jpg',
      titleMr: 'केअर मित्र (तरुण सोबती)',
      titleEn: 'Care Mitra (Student)',
      personNameMr: 'आदित्य पाटील (मित्र)',
      personNameEn: 'Aditya Patil',
      ageMr: 'वय २१ • DY पाटील इंजिनिअरिंग',
      ageEn: 'Age 21 • DY Patil Engg',
      subtitleMr: 'आदरणीय मार्गदर्शक व मित्र',
      subtitleEn: 'Empathetic Companion',
      quoteMr: '“आजोबांसोबत वेळ घालवून सन्मानाने तासिका भत्ता व समाजसेवेचे गुण मिळतात.”',
      quoteEn: '“Earning pocket stipend with dignity while bringing genuine smiles to elders.”',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      ringGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      accentBg: 'from-emerald-50/90 via-white to-teal-50/40',
      accentBorder: 'border-emerald-300',
      featuresMr: [
        'प्रति तास ₹१५० ते ₹१८० पारदर्शक कमाई',
        'महाविद्यालयीन वेळेनुसार लवचिक तासिका स्लॉट',
        'आरोग्य निरीक्षण व कौटुंबिक अभिप्राय नोंदणी',
      ],
      featuresEn: [
        'Earn ₹150 - ₹180/hr with direct UPI payout',
        'Flexible schedules around college classes',
        'Log vital observations & safety notes',
      ],
    },
    {
      id: 'family' as UserRole,
      defaultTab: 'family',
      icon: '👨‍💼',
      photo: '/assets/family_amit.jpg',
      titleMr: 'कुटुंब व मुले',
      titleEn: 'Family & Children',
      personNameMr: 'अमित कुलकर्णी (मुलगा)',
      personNameEn: 'Amit Kulkarni',
      ageMr: 'वय ३८ • सॉफ्टवेअर अभियंता, पुणे',
      ageEn: 'Age 38 • Software Engg, Pune',
      subtitleMr: 'चिंतामुक्त कुटुंब',
      subtitleEn: 'Peace of Mind for Children',
      quoteMr: '“मी पुण्यात नोकरीवर असलो तरी कोल्हापुरात वडिलांना हक्काचा सोबती आहे.”',
      quoteEn: '“Working away from home, I get real-time WhatsApp updates on Baba’s wellness.”',
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
      ringGradient: 'from-sky-500 via-blue-500 to-indigo-500',
      accentBg: 'from-sky-50/90 via-white to-blue-50/40',
      accentBorder: 'border-sky-300',
      featuresMr: [
        'प्रत्येक भेटीनंतर व्हॉट्सॲपवर फोटो व समरी',
        'Know My Normal आरोग्य ट्रॅकिंग (BP, SPO2)',
        'इमर्जन्सी २४/७ त्वरित अलर्ट व कॉल सहाय्य',
      ],
      featuresEn: [
        'WhatsApp summary & photo after each session',
        'Know My Normal baseline vitals monitoring',
        '24/7 instant emergency alerts',
      ],
    },
    {
      id: 'admin' as UserRole,
      defaultTab: 'admin',
      icon: '🛡️',
      photo: '/assets/admin_officer.jpg',
      titleMr: 'साथी केअर टीम',
      titleEn: 'Saathi Care Admin',
      personNameMr: 'साथी सुरक्षा कक्ष',
      personNameEn: 'Saathi Care Desk',
      ageMr: '२४/७ पडताळणी कक्ष',
      ageEn: '24/7 Safety Cell',
      subtitleMr: 'सुरक्षा व पडताळणी व्यवस्था',
      subtitleEn: 'Trust & Verification',
      quoteMr: '“१००% आधार व पोलीस चारित्र्य पडताळणी झाल्यानंतरच सोबती नियुक्त केला जातो.”',
      quoteEn: '“Zero compromise on safety. Every single companion undergoes strict verification.”',
      badgeColor: 'bg-slate-50 text-slate-800 border-slate-200',
      ringGradient: 'from-slate-600 via-teal-700 to-cyan-700',
      accentBg: 'from-slate-50/90 via-white to-teal-50/40',
      accentBorder: 'border-slate-300',
      featuresMr: [
        'आधार व कॉलेज ओळखपत्र पडताळणी',
        'ज्येष्ठ नागरिक सुरक्षा मार्गदर्शक प्रशिक्षण',
        '२४/७ इमर्जन्सी रिस्पॉन्स नियंत्रण कक्ष',
      ],
      featuresEn: [
        'Aadhaar & college ID background checks',
        'Senior empathy & eldercare training',
        '24/7 active emergency escalation desk',
      ],
    },
  ];

  // ── 2. SENIOR-FRIENDLY VISUAL ACTIVITIES (LARGE ICON CARDS) ──
  const seniorActivities = [
    {
      id: 'Chess',
      icon: '♟️',
      titleMr: 'बुद्धिबळ व खेळ',
      titleEn: 'Chess & Games',
      descMr: 'बुद्धिबळ, पत्ते, कॅरम व बैठे खेळ',
      descEn: 'Chess, carrom & fun mind games',
      bgGradient: 'from-amber-500/10 to-orange-500/5',
      borderColor: 'border-amber-200 hover:border-amber-400',
      badgeBg: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'Walking',
      icon: '🚶',
      titleMr: 'प्रभात फेरी व वॉक',
      titleEn: 'Morning / Evening Walk',
      descMr: 'बगिच्यात फेरफटका व मोकळी हवा',
      descEn: 'Stroll in garden, fresh air & company',
      bgGradient: 'from-emerald-500/10 to-teal-500/5',
      borderColor: 'border-emerald-200 hover:border-emerald-400',
      badgeBg: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'Technology Help',
      icon: '📱',
      titleMr: 'स्मार्टफोन मदत',
      titleEn: 'Phone & Tech Help',
      descMr: 'व्हॉट्सॲप, फोन पे, यूट्यूब शिकणे',
      descEn: 'Learn WhatsApp, UPI & video calls',
      bgGradient: 'from-blue-500/10 to-indigo-500/5',
      borderColor: 'border-blue-200 hover:border-blue-400',
      badgeBg: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'Conversation',
      icon: '☕',
      titleMr: 'चहा व गप्पागोष्टी',
      titleEn: 'Tea & Conversation',
      descMr: 'मनमोकळ्या गप्पा व जुन्या आठवणी',
      descEn: 'Heartfelt unhurried talk over tea',
      bgGradient: 'from-teal-500/10 to-cyan-500/5',
      borderColor: 'border-teal-200 hover:border-teal-400',
      badgeBg: 'bg-teal-100 text-teal-800',
    },
    {
      id: 'Reading',
      icon: '📖',
      titleMr: 'वाचन व संगीत',
      titleEn: 'Reading & Bhajans',
      descMr: 'वर्तमानपत्र, पुस्तके व भक्तिसंगीत',
      descEn: 'Newspaper reading & devotional music',
      bgGradient: 'from-purple-500/10 to-pink-500/5',
      borderColor: 'border-purple-200 hover:border-purple-400',
      badgeBg: 'bg-purple-100 text-purple-800',
    },
  ];

  // ── 3. 3 SIMPLE STEPS FOR SENIORS ──
  const processSteps = [
    {
      step: '१',
      icon: '🤝',
      titleMr: 'सोबती निवडा',
      titleEn: 'Choose Companion',
      subMr: 'आपल्या आवडीचा, बोलणारा आणि विश्वासू तरुण सोबती निवडा.',
      subEn: 'Pick a vetted student companion who shares your hobbies.',
    },
    {
      step: '२',
      icon: '📅',
      titleMr: 'वेळ ठरवा',
      titleEn: 'Set Convenient Time',
      subMr: 'घरी प्रत्यक्ष भेट किंवा फोन कॉलची सोयीस्कर वेळ सांगा.',
      subEn: 'Schedule in-person or call session at your preferred hour.',
    },
    {
      step: '३',
      icon: '😊',
      titleMr: 'आनंद अनुभवा',
      titleEn: 'Share Joy & Peace',
      subMr: 'गप्पा मारा, खेळ खेळा आणि मुलांपर्यंत पोहचेल सुरक्षिततेची खात्री.',
      subEn: 'Enjoy heartfelt bonding while family receives live reassurance.',
    },
  ];

  // ── 4. CARE PLANS & PRICING ──
  const pricingPlans = [
    {
      id: 'pay-as-you-go',
      titleMr: 'प्रति भेट (Pay Per Visit)',
      titleEn: 'Pay Per Visit',
      price: '₹१५०',
      periodMr: '/ तास',
      periodEn: '/ hour',
      popular: false,
      badgeMr: 'सुरुवातीसाठी उत्तम',
      badgeEn: 'Best to Try Out',
      featuresMr: [
        '१००% आधार व कॉलेज पडताळणी झालेले सोबती',
        'कोणतेही आगाऊ महिना बंधन नाही',
        'प्रत्येक भेटीनंतर कुटुंबाला व्हॉट्सॲप माहिती',
        'तात्काळ २४/७ इमर्जन्सी SOS सेवा',
      ],
      featuresEn: [
        '100% ID & college verified companions',
        'Zero monthly commitment or advance',
        'WhatsApp summary to family after visit',
        '24/7 Emergency SOS support',
      ],
      onClick: () => onNavigate('discovery'),
    },
    {
      id: 'monthly-standard',
      titleMr: 'मासिक साथी केअर (सर्वाधिक पसंती)',
      titleEn: 'Monthly Saathi Care',
      price: '₹१,४९९',
      periodMr: '/ महिना',
      periodEn: '/ month',
      popular: true,
      badgeMr: 'सर्वाधिक लोकप्रिय ⭐',
      badgeEn: 'Most Popular ⭐',
      featuresMr: [
        'महिन्याला १० तास हक्काचा सोबती (आठवड्यात २-३ भेटी)',
        'बुद्धिबळ, मॉर्निंग वॉक व स्मार्टफोन शिकवणी',
        'Know My Normal आरोग्य ट्रॅकिंग (BP व SPO2)',
        'कुटुंबासाठी समर्पित केअर कॉर्डिनेटर',
        'मोफत सामाजिक कट्टा व हास्य मंडळ प्रवेश',
      ],
      featuresEn: [
        '10 hours companionship/month (2-3 weekly visits)',
        'Chess, walking & smartphone learning',
        'Know My Normal vitals log (BP & SPO2)',
        'Dedicated care coordinator for family',
        'Free Social Katta & laughter club access',
      ],
      onClick: () => onNavigate('careplans'),
    },
    {
      id: 'family-priority',
      titleMr: 'प्रीमियम फॅमिली कनेक्ट',
      titleEn: 'Premium Family Connect',
      price: '₹२,९९९',
      periodMr: '/ महिना',
      periodEn: '/ month',
      popular: false,
      badgeMr: 'परगावी असणाऱ्या मुलांसाठी',
      badgeEn: 'For Distant Children',
      featuresMr: [
        'महिन्याला २० तास सोबती (आठवड्यात ४-५ भेटी)',
        'डॉक्टर अपॉइंटमेंट व औषध आणण्यासाठी सोबती',
        'साप्ताहिक व्हिडिओ कॉल व सविस्तर आरोग्य अहवाल',
        'प्राधान्य इमर्जन्सी २४/७ ॲम्ब्युलन्स समन्वय',
      ],
      featuresEn: [
        '20 hours companionship/month (4-5 visits/wk)',
        'Doctor clinic escort & pharmacy pickup',
        'Weekly video report & vitals log to kids',
        'Priority 24/7 ambulance coordination',
      ],
      onClick: () => onNavigate('careplans'),
    },
  ];

  // Active role profile for story drawer
  const activeProfile = roleProfiles.find(p => p.id === role) || roleProfiles[0];

  return (
    <div className="space-y-8 sm:space-y-12 pb-20">

      {/* ─── 1. TOP INTERACTIVE STORY PROFILES BAR (FRONT & CENTER) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4">
        <div className="bg-gradient-to-b from-white via-teal-50/20 to-white rounded-3xl p-5 sm:p-7 border border-teal-100 shadow-soft space-y-5">

          {/* Eyebrow & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-teal-800">
                {isMr ? '🎭 साथीच्या मुख्य ४ भूमिका • एक क्लिकवर अनुभव बदला' : '🎭 4 Interactive Roles • Click Any Profile'}
              </span>
            </div>
            <span className="text-xs text-stone-500 font-semibold hidden sm:inline-block">
              {isMr ? 'कोल्हापूर, पुणे, सांगली व मुंबई येथे सक्रिय 📍' : 'Live in Kolhapur, Pune, Sangli & Mumbai 📍'}
            </span>
          </div>

          {/* Large Glowing Story Rings Tray */}
          <div className="flex items-center justify-between sm:justify-around gap-4 sm:gap-8 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
            {roleProfiles.map(p => {
              const isActive = role === p.id;

              return (
                <button
                  key={p.id}
                  onClick={() => switchRole(p.id)}
                  className="flex flex-col items-center group shrink-0 focus:outline-none transition-all duration-300"
                  title={isMr ? `${p.titleMr} निवडा` : `Switch to ${p.titleEn}`}
                >
                  {/* Avatar Container with Glowing Ring */}
                  <div className="relative">
                    <div
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3.5px] transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-tr ${p.ringGradient} shadow-elevated scale-108 story-ring-glow ring-4 ring-teal-400/30`
                          : 'bg-stone-200 group-hover:bg-teal-400/60 group-hover:scale-104 shadow-xs'
                      }`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
                        <img
                          src={p.photo}
                          alt={p.personNameEn}
                          className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Emoji Badge on Ring */}
                    <div className="absolute -bottom-1 -right-1 text-xl sm:text-2xl bg-white rounded-full p-1 shadow-md border-2 border-stone-100 flex items-center justify-center">
                      <span>{p.icon}</span>
                    </div>

                    {/* Active Pulse Pill */}
                    {isActive && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-teal-800 text-white text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap animate-bounce-short">
                        {isMr ? 'निवडले ✓' : 'Active ✓'}
                      </div>
                    )}
                  </div>

                  {/* Name & Role Text */}
                  <div className="text-center mt-3 space-y-0.5">
                    <span
                      className={`text-xs sm:text-sm font-black block transition-colors leading-tight ${
                        isActive ? 'text-teal-900 font-extrabold' : 'text-stone-700 group-hover:text-stone-900'
                      }`}
                    >
                      {isMr ? p.personNameMr.split(' ')[0] : p.personNameEn.split(' ')[0]}
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs font-semibold block ${
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

          {/* Active Profile Spotlight Card */}
          <div
            className={`rounded-2xl p-4 sm:p-6 border bg-gradient-to-r ${activeProfile.accentBg} ${activeProfile.accentBorder} shadow-2xs transition-all`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="flex items-start sm:items-center gap-4">
                <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-sm border-2 border-white">
                  <img
                    src={activeProfile.photo}
                    alt={activeProfile.personNameEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-white text-stone-800">
                      {isMr ? activeProfile.titleMr : activeProfile.titleEn}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {isMr ? activeProfile.ageMr : activeProfile.ageEn}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900">
                    {isMr ? activeProfile.personNameMr : activeProfile.personNameEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 italic">
                    {isMr ? activeProfile.quoteMr : activeProfile.quoteEn}
                  </p>
                </div>
              </div>

              {/* Direct Experience Launch Button */}
              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => handleSelectRole(activeProfile.id, activeProfile.defaultTab)}
                  className="w-full sm:w-auto bg-saath-600 hover:bg-saath-700 text-white font-black text-sm px-6 py-3.5 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2.5 active:scale-98"
                >
                  <span>
                    {isMr
                      ? `${activeProfile.personNameMr.split(' ')[0]}ंच्या रूपात सुरू करा`
                      : `Open ${activeProfile.titleEn} View`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. SENIOR-FRIENDLY VISUAL HERO WITH 1-TAP SEARCH ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Clear High-Contrast Headline */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs sm:text-sm font-extrabold">
                <span>👵👴</span>
                <span>{isMr ? 'ज्येष्ठांसाठी आपुलकीची परिसंस्था' : 'Compassionate Companion Ecosystem'}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight font-display leading-tight">
                {isMr ? (
                  <>
                    <span className="text-saath-600 block">वय वाढले तरी एकटेपणा नको.</span>
                    <span className="text-stone-900 block text-xl sm:text-3xl mt-2 font-bold font-sans">
                      मनमोकळ्या गप्पा, विश्वासू तरुण सोबती आणि कुटुंबाला मनःशांती.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-saath-600 block">Growing older with warmth and joy.</span>
                    <span className="text-stone-900 block text-xl sm:text-3xl mt-2 font-bold font-sans">
                      Genuine youth companionship and family reassurance.
                    </span>
                  </>
                )}
              </h1>

              {/* Big High-Contrast Locality Input */}
              <form onSubmit={handleCitySearch} className="max-w-xl pt-2">
                <div className="bg-stone-50 p-2.5 rounded-2xl border-2 border-stone-300 focus-within:border-teal-500 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-all">
                  <div className="flex items-center gap-3 px-3 flex-1 py-1">
                    <MapPin className="w-6 h-6 text-saath-600 shrink-0" />
                    <input
                      type="text"
                      value={searchCity}
                      onChange={e => setSearchCity(e.target.value)}
                      placeholder={isMr ? "आपले शहर किंवा परिसर (उदा. कोल्हापूर, पुणे...)" : "Enter locality (e.g. Kolhapur, Pune, Mumbai...)"}
                      className="w-full bg-transparent text-base font-bold text-stone-900 placeholder:text-stone-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-saath-600 hover:bg-saath-700 text-white font-black text-sm px-7 py-3.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 active:scale-98"
                  >
                    <Compass className="w-5 h-5" />
                    <span>{isMr ? 'सोबती शोधा' : 'Find Companion'}</span>
                  </button>
                </div>
              </form>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs sm:text-sm font-bold border border-teal-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? '१००% आधार व कॉलेज पडताळणी' : '100% Vetted Mitras'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs sm:text-sm font-bold border border-teal-200">
                  <MessageCircle className="w-4 h-4 text-teal-600" />
                  <span>{isMr ? 'कुटुंबाला व्हॉट्सॲप अपडेट' : 'WhatsApp Updates'}</span>
                </span>
              </div>
            </div>

            {/* Right Column: Visual Photo Card with Real-time Reassurance */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border-4 border-white bg-stone-100 aspect-[4/3] sm:aspect-square max-w-md mx-auto group">
                <img
                  src="/assets/maharashtrian_hero.jpg"
                  alt="Senior grandfather smiling with youth companion"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent"></div>

                {/* Floating Real-time Family Card */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-elevated border border-white/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-black text-stone-900">
                        {isMr ? 'थेट कौटुंबिक अपडेट 🌿' : 'Live Family Reassurance 🌿'}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400 font-bold">{isMr ? 'आत्ताच' : 'Just now'}</span>
                  </div>

                  <p className="text-xs text-stone-700 font-medium leading-snug">
                    <strong>{isMr ? 'आदित्य पाटील (सोबती)' : 'Aditya Patil (Mitra)'}</strong> • <strong>{isMr ? 'राजेंद्र कुलकर्णी' : 'Rajendra Kulkarni'}</strong> {isMr ? 'यांच्यासोबत आज सायंकाळी बुद्धिबळ व वॉक सत्र पूर्ण झाले.' : 'completed evening chess & walk session.'}
                  </p>

                  <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-stone-100 text-center">
                    <div className="bg-teal-50 p-1.5 rounded-lg border border-teal-100">
                      <span className="text-[9px] text-stone-500 block font-bold">BP</span>
                      <span className="text-xs font-black text-stone-900">120/80</span>
                    </div>
                    <div className="bg-emerald-50 p-1.5 rounded-lg border border-emerald-100">
                      <span className="text-[9px] text-stone-500 block font-bold">SPO2</span>
                      <span className="text-xs font-black text-emerald-700">98%</span>
                    </div>
                    <div className="bg-amber-50 p-1.5 rounded-lg border border-amber-100">
                      <span className="text-[9px] text-stone-500 block font-bold">MOOD</span>
                      <span className="text-xs font-black text-amber-700">{isMr ? 'आनंदी 😊' : 'Happy 😊'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. "आपल्याला काय करायला आवडेल?" (SENIOR VISUAL ACTIVITY GRID) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-black uppercase tracking-wider border border-teal-200">
            <span>✨</span>
            <span>{isMr ? 'आपल्या आवडीचे उपक्रम' : 'Senior Activities'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
            {isMr ? 'आज आपल्याला काय करायला आवडेल?' : 'What Would You Like To Do Today?'}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            {isMr
              ? 'खालीलपैकी एका उपक्रमावर क्लिक करा व तयार असलेले सोबती पहा.'
              : 'Click any activity to browse vetted companions ready to join you.'}
          </p>
        </div>

        {/* 5 High-Impact Activity Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {seniorActivities.map(act => (
            <button
              key={act.id}
              onClick={() => onNavigate('discovery')}
              className={`bg-white rounded-3xl p-5 border-2 ${act.borderColor} shadow-soft hover:shadow-card transition-all text-left flex flex-col justify-between group active:scale-98`}
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  <span>{act.icon}</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-stone-900 group-hover:text-saath-700 transition-colors">
                    {isMr ? act.titleMr : act.titleEn}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mt-1 leading-snug">
                    {isMr ? act.descMr : act.descEn}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 flex items-center justify-between text-xs font-black text-saath-700 group-hover:text-saath-800">
                <span>{isMr ? 'सोबती पहा' : 'View Companions'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ─── 4. "आमचे विश्वासू सोबती" (FEATURED COMPANION CARDS) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
              {isMr ? 'विश्वासू तरुण सोबती' : 'VERIFIED MITRAS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
              {isMr ? 'आपुलकीने वेळ देणारे आमचे साथी मित्र' : 'Our Trusted Student Companions'}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              {isMr
                ? 'आधार व कॉलेज पडताळणी झालेले, ज्येष्ठ नागरिकांचा आदर करणारे महाविद्यालयीन तरुण.'
                : 'Background-verified college youth dedicated to bringing joy and care to seniors.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('discovery')}
            className="text-saath-700 hover:text-saath-800 text-sm font-black flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>{isMr ? 'सर्व सोबती पहा (८+ सोबती)' : 'Browse All (8+ Mitras)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Prominent Companion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {students.slice(0, 3).map(student => (
            <div
              key={student.id}
              className="bg-white rounded-3xl border-2 border-stone-200 hover:border-saath-400 p-6 flex flex-col justify-between shadow-soft hover:shadow-card transition-all group"
            >
              <div className="space-y-4">
                {/* Photo, verified shield and rate */}
                <div className="flex items-start justify-between gap-3">
                  <div className="relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 border-stone-200 shadow-xs">
                    <img
                      src={student.profilePhoto}
                      alt={student.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {student.isVerified && (
                      <div className="absolute top-1 right-1 bg-emerald-600 text-white p-1 rounded-full shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="text-right space-y-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-50 text-amber-800 border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{student.rating}</span>
                    </span>
                    <div className="text-lg font-black text-stone-900">
                      ₹{student.hourlyRate}/{isMr ? 'तास' : 'hr'}
                    </div>
                  </div>
                </div>

                {/* Name, college and locality */}
                <div>
                  <h3 className="text-xl font-black text-stone-900 group-hover:text-saath-700 transition-colors">
                    {student.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium flex items-center gap-1 mt-0.5">
                    <GraduationCap className="w-4 h-4 text-saath-600 shrink-0" />
                    <span className="truncate">{student.college}</span>
                  </p>
                  <p className="text-xs text-stone-500 font-medium flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{student.distanceKm} {isMr ? 'किमी अंतरावर • कोल्हापूर' : 'km away • Kolhapur'}</span>
                  </p>
                </div>

                {/* Activity Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {student.interests.map(act => (
                    <span
                      key={act}
                      className="bg-stone-100 text-stone-800 text-xs font-bold px-2.5 py-1 rounded-lg"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-stone-100 flex items-center gap-2.5">
                <button
                  onClick={() => onSelectStudent ? onSelectStudent(student) : onNavigate('discovery')}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-black py-3 rounded-2xl text-xs transition-colors"
                >
                  {isMr ? 'माहिती पहा' : 'View Profile'}
                </button>
                <button
                  onClick={() => onBookStudent ? onBookStudent(student) : onNavigate('discovery')}
                  className="flex-1 bg-saath-600 hover:bg-saath-700 text-white font-black py-3 rounded-2xl text-xs transition-all shadow-xs active:scale-98"
                >
                  {isMr ? 'भेट बुक करा' : 'Book Session'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 5. 3 SIMPLE STEPS FOR SENIORS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
            {isMr ? '३ सोप्या पायऱ्या' : '3 EASY STEPS'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
            {isMr ? 'अतिशय सोपी व सुरक्षित कार्यपद्धती' : 'Simple, Safe and Easy for Seniors'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-stone-200 shadow-soft flex flex-col space-y-3 text-center items-center group hover:border-teal-400 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-saath-600 text-white font-black text-base flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                {step.step}
              </div>
              <span className="text-4xl pt-1">{step.icon}</span>
              <h3 className="text-lg font-black text-stone-900">
                {isMr ? step.titleMr : step.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium">
                {isMr ? step.subMr : step.subEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 6. CARE PLANS & PRICING ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
            {isMr ? 'केअर प्लॅन्स व वर्गणी' : 'CARE PLANS & PRICING'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
            {isMr ? 'पालकांसाठी सर्वोत्तम केअर प्लॅन निवडा' : 'Transparent Care Plans For Every Family'}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            {isMr
              ? 'कोणतेही छुपे शुल्क नाही. कधीही बदला किंवा रद्द करा. कुटुंबाला दर आठवड्याला मनःशांती.'
              : 'Zero hidden fees. Change or cancel anytime. Consistent companionship and family reassurance.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pricingPlans.map(plan => (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-gradient-to-b from-teal-50/80 via-white to-teal-50/30 border-2 border-saath-500 shadow-elevated scale-102 ring-4 ring-saath-400/20'
                  : 'bg-white border border-stone-200 shadow-soft hover:shadow-card hover:border-stone-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-saath-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-xs">
                  {isMr ? 'सर्वाधिक पसंती ⭐' : 'Most Popular ⭐'}
                </div>
              )}

              <div className="space-y-3">
                <span className="text-[11px] font-black uppercase tracking-wide text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full inline-block">
                  {isMr ? plan.badgeMr : plan.badgeEn}
                </span>

                <div>
                  <h3 className="text-lg font-black text-stone-900">
                    {isMr ? plan.titleMr : plan.titleEn}
                  </h3>
                </div>

                <div className="flex items-baseline gap-1 pt-1">
                  <span className="text-3xl sm:text-4xl font-black text-stone-900 font-display">{plan.price}</span>
                  <span className="text-xs font-bold text-stone-500">{isMr ? plan.periodMr : plan.periodEn}</span>
                </div>

                <div className="space-y-2 pt-3 border-t border-stone-100">
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {(isMr ? plan.featuresMr : plan.featuresEn).map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-3">
                <button
                  onClick={plan.onClick}
                  className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-saath-600 hover:bg-saath-700 text-white shadow-md active:scale-98'
                      : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-98'
                  }`}
                >
                  <span>{isMr ? 'प्लॅन सुरू करा' : 'Select Plan'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 7. ECOSYSTEM FOOTER ─── */}
      <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-saath-500 flex items-center justify-center text-white font-black text-lg">
                  सा
                </div>
                <span className="text-xl font-black text-white font-display">साथी Saathi</span>
              </div>
              <p className="text-xs text-stone-400 max-w-md">
                {isMr
                  ? 'ज्येष्ठ नागरिकांचा एकटेपणा दूर करणारी, महाविद्यालयीन तरुणांना सन्मानाने घडवणारी आणि दूर राहणाऱ्या कुटुंबाला मनःशांती देणारी आपुलकीची परिसंस्था.'
                  : 'Empathetic intergenerational companionship connecting verified youth with senior citizens for joy, care, and family reassurance.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:1800-SAATHI-CARE"
                className="bg-stone-800 hover:bg-stone-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-stone-700 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>१८००-साथी-केअर (टोल फ्री)</span>
              </a>
              <button
                onClick={() => onNavigate('discovery')}
                className="bg-saath-600 hover:bg-saath-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <span>{isMr ? 'सोबती शोधा' : 'Find Companion'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
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
