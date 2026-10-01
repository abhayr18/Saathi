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
  Heart,
  Eye,
  Activity,
  Check,
  MessageCircle,
  PhoneCall,
  Flame,
  HelpCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
  onOpenMatchmaker?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onOpenMatchmaker }) => {
  const { switchRole, language } = useApp();
  const isMr = language === 'mr';

  const handleSelectRole = (targetRole: 'senior' | 'student' | 'family' | 'admin', tab: string) => {
    switchRole(targetRole);
    onNavigate(tab);
  };

  const pricingPlans = [
    {
      id: 'ondemand',
      badgeMr: 'ऑन-डिमांड भेट',
      badgeEn: 'On-Demand Single Visit',
      titleMr: 'प्रति तास भेट (Pay Per Visit)',
      titleEn: 'Hourly Pay-Per-Visit',
      price: '₹150',
      periodMr: '/ तास',
      periodEn: '/ hour',
      descMr: 'कधीतरी बुद्धिबळ खेळणे, संध्याकाळची फेरी, डॉक्टरकडे सोबत जाणे किंवा स्मार्टफोन शिकण्यासाठी उत्तम पर्याय.',
      descEn: 'Flexible booking for occasional chess, evening walks, hospital escort, or smartphone assistance.',
      featuresMr: [
        'पडताळणी झालेला विश्वासू कॉलेज सोबती',
        'घर, कॉलनी पार्क किंवा व्हिडिओ कॉल सत्र',
        'तात्काळ सोपी बुकिंग व शून्य छुपे खर्च',
        'भेटीनंतर कुटुंबाला संक्षिप्त संदेश',
      ],
      featuresEn: [
        'Choose any verified student companion',
        'Home, colony park or video call sessions',
        'Instant booking with zero hidden charges',
        'Brief visit summary alert sent to family',
      ],
      actionTextMr: 'सोबती शोधा व बुक करा',
      actionTextEn: 'Find & Book Companion',
      popular: false,
      onClick: () => handleSelectRole('senior', 'discovery'),
    },
    {
      id: 'monthly-weekly',
      badgeMr: 'सर्वाधिक पसंती (Most Popular)',
      badgeEn: 'Most Popular',
      titleMr: 'सावली केअर प्लॅन (Weekly Saathi)',
      titleEn: 'Saavli Weekly Care Plan',
      price: '₹599',
      periodMr: '/ महिना',
      periodEn: '/ month',
      descMr: 'आठवड्यातून १ भेट (महिन्यात ४ भेटी) + ठरलेला आवडता सोबती आणि प्रत्येक भेटीनंतर "Know My Normal" सविस्तर रिपोर्ट.',
      descEn: '1 regular visit every week (4 visits/mo) + dedicated companion and weekly "Know My Normal" health/mood report for family.',
      featuresMr: [
        'महिन्यात ४ निश्चित १-तास भेटी (साप्ताहिक)',
        'ठरलेला एकच विश्वासू सोबती (स्थिर बॉण्ड)',
        'सविस्तर "Know My Normal" मूड व दिनचर्या रिपोर्ट',
        'मुलांना व्हॉट्सॲप व ॲपवर रिअल-टाइम अपडेट्स',
        'मोफत सोबती बदलण्याची सुविधा',
      ],
      featuresEn: [
        '4 structured 1-hr visits per month (weekly)',
        'Dedicated primary companion (strong bond)',
        'Detailed "Know My Normal" wellness report',
        'Real-time WhatsApp & App updates for children',
        'Free companion replacement if needed',
      ],
      actionTextMr: 'सावली प्लॅन सुरू करा',
      actionTextEn: 'Start Saavli Plan',
      popular: true,
      onClick: () => onNavigate('careplans'),
    },
    {
      id: 'monthly-biweekly',
      badgeMr: 'संपूर्ण मनःशांती (Complete Care)',
      badgeEn: 'Family Complete Care',
      titleMr: 'परिवार सुरक्षा प्लॅन (Bi-Weekly)',
      titleEn: 'Parivar Suraksha Plan',
      price: '₹1,199',
      periodMr: '/ महिना',
      periodEn: '/ month',
      descMr: 'आठवड्यातून २ भेटी (महिन्यात ८ भेटी) + दूर राहणाऱ्या मुलांसाठी प्रायॉरिटी सपोर्ट, इमर्जन्सी हेल्पलाइन व व्हिडिओ कॉल चेक-इन.',
      descEn: '2 visits per week (8 visits/mo) + priority matching, monthly family video conference check-in, and 24/7 SOS helpline.',
      featuresMr: [
        'महिन्यात ८ सविस्तर भेटी (आठवड्यातून २ दिवस)',
        'प्रायॉरिटी कंपॅनियन मॅचिंग (उच्च दर्जा)',
        'दर १५ दिवसांनी कुटुंबासोबत व्हिडिओ कॉल चेक-इन',
        '२४x७ इमर्जन्सी हेल्प व त्वरित अलर्ट सुविधा',
        'स्थानिक औषधे व डॉक्टर भेटीसाठी मदत',
      ],
      featuresEn: [
        '8 visits per month (twice every week)',
        'Priority top-rated companion matching',
        'Bi-weekly family video check-in call',
        '24/7 emergency hotline & instant SMS alerts',
        'Local pharmacy & doctor appointment escort',
      ],
      actionTextMr: 'परिवार प्लॅन निवडा',
      actionTextEn: 'Select Parivar Plan',
      popular: false,
      onClick: () => onNavigate('careplans'),
    },
  ];

  const demoRoles = [
    {
      role: 'senior' as const,
      tab: 'discovery',
      icon: '👴',
      titleMr: 'ज्येष्ठ नागरिक',
      titleEn: 'Senior Citizen',
      nameMr: 'राजेंद्र कुलकर्णी (वय ६८, कोल्हापूर)',
      nameEn: 'Rajendra Kulkarni (Age 68, Kolhapur)',
      quoteMr: '“मला संध्याकाळी बुद्धिबळ खेळायला आणि स्मार्टफोन शिकायला एक चांगला सुसंस्कृत तरुण हवा आहे.”',
      quoteEn: '“I need a respectful college student for evening chess, walks, and smartphone help.”',
      actionMr: 'ज्येष्ठ म्हणून सुरू करा →',
      actionEn: 'Explore as Senior →',
      accent: 'border-orange-300 bg-orange-50/40 hover:bg-orange-50',
      badgeColor: 'bg-orange-100 text-orange-800',
    },
    {
      role: 'student' as const,
      tab: 'dashboard',
      icon: '🎓',
      titleMr: 'कॉलेज सोबती',
      titleEn: 'Student Companion',
      nameMr: 'आदित्य पाटील (वय २१, इंजिनिअरिंग)',
      nameEn: 'Aditya Patil (Age 21, Engineering Student)',
      quoteMr: '“मी आजी-आजोबांना मदत करतो, त्यांच्या जुन्या गोष्टी ऐकतो आणि सन्मानाने स्वतःचा कॉलेज खर्च भागवतो.”',
      quoteEn: '“I assist elders, learn from their life wisdom, and earn a dignified student stipend.”',
      actionMr: 'सोबती डॅशबोर्ड उघडा →',
      actionEn: 'Open Companion View →',
      accent: 'border-blue-300 bg-blue-50/30 hover:bg-blue-50',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      role: 'family' as const,
      tab: 'familyHub',
      icon: '👨‍👩‍👧',
      titleMr: 'दूर राहणारे कुटुंब',
      titleEn: 'Out-of-Town Family',
      nameMr: 'अमित कुलकर्णी (मुलगा, बेंगळुरू IT)',
      nameEn: 'Amit Kulkarni (Son, Software Engineer in Bangalore)',
      quoteMr: '“मी बेंगळुरूमध्ये असलो तरी वडिलांच्या प्रत्येक भेटीचा ‘Know My Normal’ रिपोर्ट मला फोनवर मिळतो.”',
      quoteEn: '“Even from Bangalore, I get regular visit mood reports and wellness updates for my father.”',
      actionMr: 'कुटुंब हब पहा →',
      actionEn: 'View Family Hub →',
      accent: 'border-emerald-300 bg-emerald-50/30 hover:bg-emerald-50',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      role: 'admin' as const,
      tab: 'dashboard',
      icon: '🛡️',
      titleMr: 'ॲडमिन व सुरक्षा',
      titleEn: 'Admin & Safety',
      nameMr: 'साथी पडताळणी टीम',
      nameEn: 'Saathi Trust & Safety Team',
      quoteMr: '“कॉलेज आयडी पडताळणी, झिरो-ओटीपी पॉलिसी आणि संपूर्ण सुरक्षितता नियमन.”',
      quoteEn: '“Official college ID vetting, strict zero-OTP financial rules, and SOS escalation.”',
      actionMr: 'सुरक्षा पॅनेल पहा →',
      actionEn: 'View Safety Panel →',
      accent: 'border-stone-300 bg-stone-50/50 hover:bg-stone-100/70',
      badgeColor: 'bg-stone-200 text-stone-800',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. TOP INTERACTIVE ROLE DEMO BAR (GRAB ATTENTION) */}
      <section className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/70 border-b border-orange-200/80 px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-saath-600"></span>
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-stone-900 font-display">
                {isMr
                  ? '🎯 थेट डेमो अनुभव: आपण कोणत्या भूमिकेतून पाहू इच्छिता?'
                  : '🎯 Live Interactive Demo: Choose your perspective to explore:'}
              </h2>
            </div>
            <p className="text-xs text-stone-600">
              {isMr
                ? 'खालील कोणत्याही कार्डवर क्लिक करून त्वरित तो डॅशबोर्ड अनुभवता येईल.'
                : 'Click any perspective below to instantly switch roles and test the flow.'}
            </p>
          </div>

          {/* 4 Interactive Role Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {demoRoles.map(item => (
              <div
                key={item.role}
                onClick={() => handleSelectRole(item.role, item.tab)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-xs hover:shadow-card flex flex-col justify-between space-y-3 ${item.accent}`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.icon}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                      {isMr ? item.titleMr : item.titleEn}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-stone-900">
                    {isMr ? item.nameMr : item.nameEn}
                  </h3>
                  <p className="text-[11px] text-stone-600 leading-relaxed italic line-clamp-2">
                    {isMr ? item.quoteMr : item.quoteEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/50 flex items-center justify-between text-xs font-bold text-saath-700">
                  <span>{isMr ? item.actionMr : item.actionEn}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. HERO SECTION WITH MAHARASHTRIAN IMAGERY & CULTURAL WARMTH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Mission, Tagline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-saath-800 text-xs sm:text-sm font-bold shadow-xs">
              <Heart className="w-4 h-4 text-saath-600 fill-saath-600" />
              <span>{isMr ? 'नातं विश्वासाचं, सोबती आपुलकीचा' : 'A Bond of Trust, A Companion of Warmth'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight font-display leading-[1.18]">
              {isMr ? (
                <>
                  ज्येष्ठ नागरिकांसाठी <span className="text-saath-600">हक्काचा तरुण सोबती</span>, आणि दूर राहणाऱ्या कुटुंबाला <span className="text-amber-600">मनःशांती</span>.
                </>
              ) : (
                <>
                  We give seniors someone they <span className="text-saath-600">know & trust</span>, and give families <span className="text-amber-600">peace of mind</span> from anywhere.
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal max-w-2xl">
              {isMr
                ? 'पुणे, कोल्हापूर, सांगली, मुंबई अशा शहरांत अनेक आजी-आजोबा एकटे राहतात. मुले नोकरीनिमित्त परगावी किंवा परदेशात असतात. "साथी" हे अशा ज्येष्ठांना मनमोकळ्या गप्पा, बुद्धिबळ, वाचन, मॉर्निंग वॉक आणि स्मार्टफोन मदतीसाठी सुसंस्कृत कॉलेज विद्यार्थ्यांशी जोडते.'
                : 'Connecting lonely seniors in Maharashtra with verified, respectful college companions for conversations, walks, chess, and tech help — while giving children out-of-town complete visibility.'}
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => handleSelectRole('senior', 'discovery')}
                className="bg-saath-600 hover:bg-saath-700 text-white text-base font-bold px-7 py-3.5 rounded-2xl shadow-elevated transition-all flex items-center justify-center gap-2.5 active:scale-98"
              >
                <Compass className="w-5 h-5" />
                <span>{isMr ? 'सोबती शोधा (Find Companion)' : 'Find a Companion'}</span>
              </button>

              {onOpenMatchmaker && (
                <button
                  onClick={onOpenMatchmaker}
                  className="bg-white hover:bg-orange-50/60 text-saath-800 border-2 border-orange-300 text-base font-bold px-6 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2.5 shadow-xs"
                >
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  <span>{isMr ? 'स्मार्ट सोबती मॅचमेकर' : 'Smart Matchmaker'}</span>
                </button>
              )}

              <button
                onClick={() => handleSelectRole('family', 'familyHub')}
                className="bg-stone-900 hover:bg-stone-800 text-white text-base font-semibold px-6 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2.5 shadow-xs"
              >
                <Eye className="w-5 h-5 text-amber-400" />
                <span>{isMr ? 'कुटुंब हब (Family Hub)' : 'Family Hub'}</span>
              </button>
            </div>

            {/* Quick Highlights Pills */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-stone-700">
              <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-xs">
                <span className="font-bold block text-stone-900">🤝 १:१ सोबती बॉण्ड</span>
                <span className="text-stone-500">{isMr ? 'ठरलेला विश्वासू तरुण' : 'Dedicated companion'}</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-xs">
                <span className="font-bold block text-stone-900">🌿 Know My Normal</span>
                <span className="text-stone-500">{isMr ? 'आरोग्य व मूड नोंदी' : 'Weekly mood report'}</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-xs">
                <span className="font-bold block text-stone-900">🛡️ १००% पडताळणी</span>
                <span className="text-stone-500">{isMr ? 'कॉलेज आयडी व पोलीस चेक' : 'Vetted background'}</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-xs">
                <span className="font-bold block text-stone-900">☕ सामुदायिक कट्टा</span>
                <span className="text-stone-500">{isMr ? 'हास्य क्लब व कार्यशाळा' : 'Local events & clubs'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Maharashtrian Hero Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card border-4 border-white bg-stone-100 aspect-[4/3] sm:aspect-[1/1] max-w-lg mx-auto group">
              <img
                src="/assets/maharashtrian_hero.jpg"
                alt="Maharashtrian grandfather in traditional white kurta laughing and sharing chai with young college student companion on verandah"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent"></div>

              {/* Floating Real-Time Family Observation Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-elevated border border-white/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-stone-900">
                      {isMr ? 'कुटुंबाला अपडेट पोहोचला 🌿' : 'Family Update Transmitted 🌿'}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-semibold">{isMr ? 'आत्ताच' : 'Just now'}</span>
                </div>
                <p className="text-xs text-stone-700 leading-snug">
                  <strong>आदित्य</strong> यांनी <strong>राजेंद्र कुलकर्णी</strong> यांच्यासोबत ६० मिनिटांचे सत्र पूर्ण केले: मूड आनंदी आहे, संध्याकाळी बुद्धिबळ खेळले व ४० मिनिटे वॉक झाला.
                </p>
                <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-stone-100 text-stone-500">
                  <span className="text-emerald-700 font-semibold">{isMr ? 'आरोग्य स्थिती: सामान्य ✓' : 'Know My Normal: Normal ✓'}</span>
                  <span className="font-bold text-saath-700">{isMr ? 'बेंगळुरूला अलर्ट पाठवला' : 'Bangalore Alert Sent'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT OUR STARTUP, PROBLEM & MOTTO SECTION */}
      <section className="bg-white py-16 sm:py-20 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-saath-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
              {isMr ? 'आमची गोष्ट व ध्येय' : 'Our Story & Purpose'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
              {isMr ? 'आम्ही "साथी" का सुरू केले?' : 'Why We Built Saathi'}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {isMr
                ? 'महाराष्ट्रातील हजारो घरांमध्ये एक शांत एकाकीपण आहे, आणि दुसऱ्या बाजूला लाखो सुजाण तरुण आहेत ज्यांना आदर, संस्कार आणि अनुभव हवे आहेत.'
                : 'A heartfelt bridge connecting lonely elders in Maharashtra with empathetic college youth for shared happiness and family reassurance.'}
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: The Problem & Loneliness */}
            <div className="bg-[#FAF8F5] p-7 rounded-3xl border border-stone-200 shadow-soft space-y-4 hover:border-orange-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20 text-xl">
                💔
              </div>
              <h3 className="text-xl font-bold font-display text-stone-900">
                {isMr ? '१. एकाकीपणावर मात' : '1. Curing Senior Isolation'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isMr
                  ? 'वय वाढल्यावर सर्वात मोठी अडचण औषधांची नसते, तर बोलायला माणूस नसण्याची असते. "साथी" नियमित भेटून गप्पा मारणारा, जुनी गाणी ऐकणारा आणि चहा पिणारा हक्काचा मित्र मिळवून देतो.'
                  : 'Loneliness is the silent pandemic among urban elders. Saathi provides genuine human warmth, unhurried conversations, tea time, and laughter.'}
              </p>
            </div>

            {/* Pillar 2: Outstation Children Peace of Mind */}
            <div className="bg-[#FAF8F5] p-7 rounded-3xl border border-stone-200 shadow-soft space-y-4 hover:border-orange-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20 text-xl">
                👨‍👩‍👧
              </div>
              <h3 className="text-xl font-bold font-display text-stone-900">
                {isMr ? '२. कुटुंबाला संपूर्ण खात्री' : '2. 100% Peace of Mind for Family'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isMr
                  ? 'बेंगळुरू, मुंबई किंवा अमेरिकेत राहणाऱ्या मुलांना नेहमी आई-वडिलांची काळजी असते. साथीच्या प्रत्येक भेटीनंतर नियमित रिपोर्ट मिळतो, ज्यामुळे मुले निःशंक राहू शकतात.'
                  : 'Children working in other cities cannot be physically present every day. Our structured "Know My Normal" updates keep them connected and worry-free.'}
              </p>
            </div>

            {/* Pillar 3: Youth Empathy & Dignity */}
            <div className="bg-[#FAF8F5] p-7 rounded-3xl border border-stone-200 shadow-soft space-y-4 hover:border-orange-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20 text-xl">
                🎓
              </div>
              <h3 className="text-xl font-bold font-display text-stone-900">
                {isMr ? '३. तरुणांना संस्कार व मानधन' : '3. Youth Empathy & Stipend'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isMr
                  ? 'कॉलेज विद्यार्थ्यांना ज्येष्ठांच्या आयुष्यातील अनमोल अनुभवातून खूप शिकायला मिळते, संवाद कौशल्ये वाढतात आणि फावल्या वेळेत स्वाभिमानाने मानधन मिळते.'
                  : 'College students gain invaluable life perspective, emotional intelligence, and earn an honest stipend while respecting traditional elder values.'}
              </p>
            </div>
          </div>

          {/* Startup Motto Highlight Callout */}
          <div className="bg-gradient-to-r from-orange-100/60 via-amber-100/40 to-orange-100/60 rounded-3xl p-6 sm:p-8 border border-orange-200 text-center max-w-4xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase text-saath-700 tracking-wider">
              {isMr ? 'आमचा मूळ मंत्र' : 'Our Guiding Motto'}
            </span>
            <p className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
              “{isMr ? 'नातं विश्वासाचं, सोबती आपुलकीचा — एकाकीपणा दूर करणारा आपला साथी' : 'A Bond of Trust, A Companion of Warmth — Saathi for Every Senior'}”
            </p>
            <p className="text-xs sm:text-sm text-stone-600 pt-1">
              {isMr
                ? 'आम्ही व्यावसायिक केअरटेकर नाही, तर नात्यातील आपुलकी जपणारे विश्वासू तरुण मित्र आहोत.'
                : 'Not medical caretakers, but genuine intergenerational companions who care like family.'}
            </p>
          </div>
        </div>
      </section>

      {/* 4. PROMINENT TRANSPARENT PRICING SECTION (USER REQUIREMENT #3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-saath-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
            {isMr ? 'पारदर्शक दर व केअर प्लॅन्स' : 'Transparent Pricing & Plans'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
            {isMr ? 'सोपे आणि परवडणारे दर' : 'Simple, Transparent & Flexible Pricing'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            {isMr
              ? 'कोणतेही छुपे शुल्क नाही. एका भेटीपासून ते मासिक ठरलेल्या भेटींपर्यंत — तुमच्या गरजेनुसार निवडा.'
              : 'Zero hidden fees. Choose on-demand single visits or monthly consistent companionship.'}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map(plan => (
            <div
              key={plan.id}
              className={`rounded-3xl p-7 flex flex-col justify-between space-y-6 transition-all border ${
                plan.popular
                  ? 'bg-white border-2 border-saath-500 shadow-elevated relative'
                  : 'bg-white border border-stone-200 shadow-soft hover:shadow-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-saath-600 text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-sm">
                  {isMr ? plan.badgeMr : plan.badgeEn}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${plan.popular ? 'text-saath-700' : 'text-stone-500'}`}>
                    {isMr ? plan.badgeMr : plan.badgeEn}
                  </span>
                  <h3 className="text-2xl font-black text-stone-900 font-display">
                    {isMr ? plan.titleMr : plan.titleEn}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {isMr ? plan.descMr : plan.descEn}
                  </p>
                </div>

                <div className="pt-2 pb-1 border-b border-stone-100 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-stone-900 font-display">{plan.price}</span>
                  <span className="text-xs font-semibold text-stone-500">
                    {isMr ? plan.periodMr : plan.periodEn}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 text-xs text-stone-700 pt-2">
                  {(isMr ? plan.featuresMr : plan.featuresEn).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={plan.onClick}
                className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                  plan.popular
                    ? 'bg-saath-600 hover:bg-saath-700 active:scale-98 text-white shadow-saath-500/30'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                <span>{isMr ? plan.actionTextMr : plan.actionTextEn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Pricing Guarantee Banner */}
        <div className="max-w-4xl mx-auto bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-2.5 font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{isMr ? 'शंभर टक्के सुरक्षित पेमेंट्स व समाधान गॅरंटी — कधीही रद्द करू शकता.' : '100% secure payments & satisfaction guaranteed. Cancel anytime without penalty.'}</span>
          </div>
          <button
            onClick={() => onNavigate('careplans')}
            className="text-saath-700 font-bold hover:underline shrink-0"
          >
            {isMr ? 'सर्व तपशील पहा →' : 'View Full Details →'}
          </button>
        </div>
      </section>

      {/* 5. SOCIAL KATTA HIGHLIGHT TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/50 rounded-3xl p-8 sm:p-10 border border-orange-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-soft">
          <div className="space-y-3 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-white text-saath-700 font-bold text-xs border border-orange-200 shadow-xs inline-block">
              {isMr ? 'सामुदायिक उपक्रम' : 'Community Events'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
              {isMr ? 'आपल्या परिसरातील "कट्टा" उपक्रमांमध्ये सहभागी व्हा' : 'Join Our Local "Katta" Gatherings'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {isMr
                ? 'सकाळचा हास्य क्लब, मोफत स्मार्टफोन कार्यशाळा आणि शनिवार नाट्यसंगीत कट्टा. सोबती विद्यार्थ्यांसोबत सुरक्षितपणे हजेरी लावा!'
                : 'Morning laughter clubs, digital smartphone workshops, and Saturday classical music kattas. Register for free with companion escort.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('activities')}
            className="bg-saath-600 hover:bg-saath-700 text-white font-bold text-sm px-7 py-4 rounded-2xl shadow-elevated transition-all shrink-0 flex items-center gap-2 active:scale-98"
          >
            <Users className="w-5 h-5" />
            <span>{isMr ? 'सामाजिक कट्टा उघडा' : 'Explore Community Katta'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 6. CLEAN MINIMALIST LIGHT FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-200 text-stone-500 text-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-saath-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
              साथी
            </div>
            <div>
              <span className="font-extrabold text-stone-900">Saathi • साथी</span>
              <p className="text-[11px] text-stone-400">
                {isMr ? 'आंतरपिढी मैत्री व कौटुंबिक मनःशांती' : 'Intergenerational Companionship & Family Peace of Mind'}
              </p>
            </div>
          </div>
          <p className="text-xs text-stone-400 text-center sm:text-right">
            © 2026 साथी (Saathi) Platform • Pune & Kolhapur, Maharashtra.
          </p>
        </div>
      </footer>
    </div>
  );
};
