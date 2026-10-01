'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  HeartHandshake,
  Users,
  ShieldCheck,
  Sparkles,
  Calendar,
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
  MapPin,
  Shield,
  Stethoscope,
  Pill,
  Laugh,
  Layers,
} from 'lucide-react';
import { SaathiLogo } from './SaathiLogo';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
  onOpenMatchmaker?: () => void;
  onOpenRoleModal?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenMatchmaker,
  onOpenRoleModal,
}) => {
  const { role, switchRole, language } = useApp();
  const isMr = language === 'mr';

  const [searchCity, setSearchCity] = useState('');

  const handleSelectRole = (targetRole: 'senior' | 'student' | 'family' | 'admin', tab: string) => {
    switchRole(targetRole);
    onNavigate(tab);
  };

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('discovery');
  };

  // MaiHoonNa inspired trust metrics
  const trustMetrics = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-saath-600" />,
      titleMr: '१००% पडताळणी झालेले सोबती',
      titleEn: '100% Background Verified',
      subMr: 'कॉलेज आयडी व चारित्र्य तपासणी',
      subEn: 'Every Care Mitra & Student vetted',
    },
    {
      icon: <MapPin className="w-5 h-5 text-saath-600" />,
      titleMr: 'जिओ-फेन्स भेटींची नोंद',
      titleEn: 'Geo-fenced Verified Visits',
      subMr: 'प्रत्येक चेक-इन जीपीएसने प्रमाणित',
      subEn: 'Every check-in GPS-confirmed',
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-saath-600" />,
      titleMr: 'झिरो-कॅश व झिरो-ओटीपी सुरक्षा',
      titleEn: 'Zero-Cash & Safe Protocols',
      subMr: 'ज्येष्ठांच्या सुरक्षिततेची संपूर्ण हमी',
      subEn: 'Strict elder financial safety policy',
    },
    {
      icon: <Star className="w-5 h-5 text-saath-600 fill-saath-500" />,
      titleMr: '४.९ / ५ कुटुंब रेटिंग',
      titleEn: '4.9 / 5 Star Rating',
      subMr: '१,२००+ समाधानी कुटुंबांचा विश्वास',
      subEn: 'From 1,200+ real elder families',
    },
  ];

  // MaiHoonNa inspired urgency impact numbers
  const challengeStats = [
    {
      value: '72M+',
      labelMr: 'भारतात एकटे राहणारे ज्येष्ठ नागरिक',
      labelEn: 'Seniors living alone in India',
      icon: <Users className="w-6 h-6 text-saath-600" />,
    },
    {
      value: '30M+',
      labelMr: 'दुसऱ्या शहरात किंवा परदेशात राहणारी मुले',
      labelEn: 'Outstation & NRI children away from parents',
      icon: <MapPin className="w-6 h-6 text-saath-600" />,
    },
    {
      value: '1 in 3',
      labelMr: 'ज्येष्ठ नागरिक रोज एकाकीपण अनुभवतात',
      labelEn: 'Seniors regularly experiencing loneliness',
      icon: <Heart className="w-6 h-6 text-saath-600" />,
    },
  ];

  // MaiHoonNa Ecosystem 4 Pillars
  const ecosystemPillars = [
    {
      emoji: '🤝',
      titleMr: 'केअर मित्र व सोबती भेटी',
      titleEn: 'Care Mitra & Companion Visits',
      descMr: 'प्रशिक्षित, पडताळणी झालेले सोबती नियमित घरी भेटतात आणि बीपी, मूड, चालणे व औषधांची नोंद करतात.',
      descEn: 'Trained, background-verified companions visiting on schedule and logging vitals, mood, walks, and tasks in real time.',
      actionTab: 'discovery',
      actionTextMr: 'सोबती शोधा →',
      actionTextEn: 'Explore Companions →',
    },
    {
      emoji: '🌸',
      titleMr: 'साथी नेटवर्क (Saathi Network)',
      titleEn: 'Saathi Intergenerational Network',
      descMr: 'मनमोकळ्या गप्पा, वाचन, बुद्धिबळ, संध्याकाळची फेरी आणि स्मार्टफोन शिकण्यासाठी हक्काचे कॉलेज सोबती.',
      descEn: 'Empathetic college students bringing warm laughter, chess, morning walks, tea time, and digital literacy.',
      actionTab: 'activities',
      actionTextMr: 'नेटवर्क पहा →',
      actionTextEn: 'Discover Network →',
    },
    {
      emoji: '🏆',
      titleMr: 'कट्टा व छंद मंडळ (Legacy Circles)',
      titleEn: 'Legacy Circles & Hobby Katta',
      descMr: 'ज्येष्ठांच्या जीवन अनुभवांना सन्मान देणारे व्यासपीठ — कविता, संगीत, पुस्तके, बागकाम व हास्य क्लब.',
      descEn: 'A vibrant peer platform for seniors to share wisdom, memories, gardening, literature, and rediscovering purpose.',
      actionTab: 'activities',
      actionTextMr: 'कट्टा फेरफटका →',
      actionTextEn: 'Join Social Katta →',
    },
    {
      emoji: '📱',
      titleMr: 'कुटुंब कनेक्ट (Family Connect)',
      titleEn: 'Family Connect & "Know My Normal"',
      descMr: 'दूर राहणाऱ्या मुलांसाठी रिअल-टाइम व्हॉट्सॲप अलर्ट्स, लाईव्ह हॅपीनेस स्कोअर आणि आरोग्य नोंदींचा डॅशबोर्ड.',
      descEn: 'Live family visibility showing encounter logs, vitals trends, and mood assessments from any time zone.',
      actionTab: 'familyHub',
      actionTextMr: 'कुटुंब हब पहा →',
      actionTextEn: 'Family Dashboard →',
    },
  ];

  // Health and Peace of Mind Features
  const wellnessFeatures = [
    {
      id: 'vitals',
      badgeMr: 'प्रत्येक भेटीनंतर',
      badgeEn: 'Every Visit',
      titleMr: 'आरोग्य व व्हायटल्स नोंदी',
      titleEn: 'Vitals & Wellness Check',
      subtitleMr: 'सुरक्षित आरोग्य ट्रॅकिंग',
      subtitleEn: 'Medical-grade regular logging',
      descMr: 'रक्तदाब (BP), ऑक्सिजन (SpO2), तापमान — प्रत्येक भेटीनंतर तारीख, वेळ आणि जीपीएससह नोंदवले जाते.',
      descEn: 'BP, SpO2, and temperature logged with timestamp and GPS confirmation after every scheduled session.',
      metrics: [
        { label: 'BP', value: '120/80', status: 'Normal' },
        { label: 'SPO2', value: '98%', status: 'Optimal' },
        { label: 'TEMP', value: '98.4°F', status: 'Normal' },
      ],
      icon: <Stethoscope className="w-6 h-6 text-saath-600" />,
    },
    {
      id: 'meds',
      badgeMr: 'नियमित खात्री',
      badgeEn: 'Adherence',
      titleMr: 'औषध वेळापत्रक स्मरण',
      titleEn: 'Medication Adherence',
      subtitleMr: 'औषध वेळेवर घेण्याची काळजी',
      subtitleEn: 'Zero missed doses',
      descMr: 'डॉक्टरांच्या सल्ल्यानुसार ठरलेली औषधे वेळेवर घेतली आहेत का याची खात्री आणि मुलांपर्यंत त्वरित अपडेट.',
      descEn: 'Prescription-linked schedules and friendly check-ins ensure your parent takes the right doses on time.',
      metrics: [
        { label: 'TODAY', value: '3/3', status: 'Taken' },
        { label: 'THIS WEEK', value: '21/21', status: 'Perfect' },
        { label: 'STREAK', value: '14 Days', status: 'Active' },
      ],
      icon: <Pill className="w-6 h-6 text-purple-600" />,
    },
    {
      id: 'mood',
      badgeMr: 'भावनिक स्वास्थ्य',
      badgeEn: 'Emotional Health',
      titleMr: 'मूड व हॅपीनेस स्कोअर',
      titleEn: 'Mood & Happiness Logging',
      subtitleMr: 'आनंददायी संवादाची मोजणी',
      subtitleEn: 'Feel the positive difference',
      descMr: 'भेटीनंतर आजोबा किंवा आजींचा मूड कसा होता — हसतमुख, शांत, उत्साही — याचा अहवाल थेट कुटुंबाला.',
      descEn: 'Qualitative mood assessment after every visit helps monitor long-term emotional well-being and joy.',
      metrics: [
        { label: 'MOOD', value: 'Cheerful', status: 'High' },
        { label: 'ACTIVITY', value: 'Chess & Walk', status: 'Active' },
        { label: 'SMILE INDEX', value: '9.4/10', status: 'Joyful' },
      ],
      icon: <Laugh className="w-6 h-6 text-emerald-600" />,
    },
    {
      id: 'clinic',
      badgeMr: 'हक्काची सोबत',
      badgeEn: 'Safe Escort',
      titleMr: 'दवाखाना व वॉक सोबत',
      titleEn: 'Clinic & Outdoor Escort',
      subtitleMr: 'कधीही एकटे जाण्याची गरज नाही',
      subtitleEn: 'Never go alone',
      descMr: 'डॉक्टर अपॉइंटमेंट, औषधांची खरेदी किंवा कॉलनी उद्यानातील संध्याकाळची फेरी — हक्काचा सोबती सदैव सोबत.',
      descEn: 'Care Mitra accompanies your parent to doctor appointments, assists with transport, and shares summary notes.',
      metrics: [
        { label: 'ESCORT', value: 'Door-to-Door', status: 'Safe' },
        { label: 'DOCTOR VISITS', value: 'Assisted', status: 'Logged' },
        { label: 'PARK WALKS', value: '45 mins', status: 'Daily' },
      ],
      icon: <Users className="w-6 h-6 text-blue-600" />,
    },
  ];

  // How It Works Steps
  const processSteps = [
    {
      step: '01',
      titleMr: 'आपल्या कुटुंबाची माहिती द्या',
      titleEn: 'Tell us about your family',
      descMr: 'पालकांची दिनचर्या, आवडीनिवडी, भाषा आणि त्यांना कोणत्या प्रकारच्या मदतीची गरज आहे ते सांगा (२ मिनिटांत).',
      descEn: "Share your loved one's routine, language preference, health background, and companionship needs in minutes.",
    },
    {
      step: '02',
      titleMr: 'योग्य केअर प्लॅन निवडा',
      titleEn: 'Choose a tailored plan',
      descMr: 'तासिका ऑन-डिमांड, सावली साप्ताहिक प्लॅन किंवा संपूर्ण परिवार सुरक्षा प्लॅन यातून आपल्या गरजेनुसार निवडा.',
      descEn: 'Select Hourly Pay-Per-Visit, Saavli Weekly, or Parivar Suraksha. Adjust anytime as requirements evolve.',
    },
    {
      step: '03',
      titleMr: 'आपल्या विश्वासू सोबत्याला भेटा',
      titleEn: 'Meet your verified Care Mitra',
      descMr: 'आम्ही परिसर, भाषा, संस्कार आणि समान आवडीनुसार १००% पडताळणी झालेला विद्यार्थी सोबती मॅच करतो.',
      descEn: 'We match a background-verified companion by locality, mother tongue, temperament, and shared interests.',
    },
    {
      step: '04',
      titleMr: 'वेळेनुसार भेटी सुरू होतात',
      titleEn: 'Scheduled visits begin',
      descMr: 'प्रत्येक भेटीचे जिओ-फेन्स चेक-इन, गप्पा, फेरफटका आणि आरोग्य नोंदी (Know My Normal) पद्धतशीर होतात.',
      descEn: 'Geo-fenced check-ins confirm every arrival. Vitals, mood, activities, and tea conversations are logged each time.',
    },
    {
      step: '05',
      titleMr: 'कुठूनही सुरक्षित जोडलेले राहा',
      titleEn: 'Stay connected from anywhere',
      descMr: 'बेंगळुरू, मुंबई किंवा परदेशात असलो तरी कुटुंबाला प्रत्येक भेटीनंतर व्हॉट्सॲप समरी व लाईव्ह हॅपीनेस अपडेट मिळतात.',
      descEn: 'Family Connect dashboard and WhatsApp updates deliver visit summaries and peace of mind to children across time zones.',
    },
  ];

  // Pricing Plans
  const pricingPlans = [
    {
      id: 'ondemand',
      badgeMr: 'लवचिक भेट',
      badgeEn: 'Flexible Single Visit',
      titleMr: 'ऑन-डिमांड तासिका भेट',
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
      popular: false,
      onClick: () => onNavigate('careplans'),
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">
      
      {/* ─── 0. TOP SPOTLIGHT: EXPERIENCE SAATHI FROM ALL 4 PERSPECTIVES (IMAGE 2) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6">
        <div className="bg-gradient-to-r from-orange-500 via-saath-600 to-amber-500 rounded-2xl sm:rounded-3xl p-4 sm:p-9 text-white shadow-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-white/20 text-white px-3 py-0.5 sm:py-1 rounded-full border border-white/30 inline-block">
              {isMr ? 'थेट चाचणी व सिम्युलेशन' : 'Interactive Prototype'}
            </span>
            <h2 className="text-xl sm:text-3xl font-black font-display text-white">
              {isMr ? 'प्लॅटफॉर्मचा अनुभव विविध भूमिकेतून घ्या' : 'Experience Saathi from all 4 Perspectives'}
            </h2>
            <p className="text-xs sm:text-sm text-orange-100/95 leading-relaxed">
              {isMr
                ? 'ज्येष्ठ नागरिक, कॉलेज सोबती, दूर राहणारे कुटुंब किंवा ॲडमिन कंट्रोल रूम — एका क्लिकवर भूमिका बदला आणि सर्व फीचर्स तपासा.'
                : 'Test the live workflows as an elderly senior, a student companion, an outstation son in Bangalore, or a safety admin.'}
            </p>
          </div>

          <button
            onClick={() => onOpenRoleModal && onOpenRoleModal()}
            className="bg-white text-stone-900 hover:bg-orange-50 font-black text-xs sm:text-sm px-5 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all shadow-lg shrink-0 flex items-center justify-center gap-2.5 active:scale-95 w-full sm:w-auto"
          >
            <span>🎭</span>
            <span>{isMr ? 'भूमिका निवडक पॉपअप उघडा' : 'Open Role Switcher Modal'}</span>
            <ArrowRight className="w-4 h-4 text-saath-600" />
          </button>
        </div>
      </section>

      {/* ─── 1. HERO SECTION (MaiHoonNa Inspired) ─── */}
      <section className="relative pt-2 sm:pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Mission, Headlines, Search & Action Bar */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7">
            
            {/* Eyebrow Badge with Pulse */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-50 border border-orange-200 text-saath-800 text-[11px] sm:text-sm font-extrabold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-saath-600" />
              <span>
                {isMr
                  ? "भारतातील पहिली जोडलेली ज्येष्ठ संगोपन परिसंस्था"
                  : "India's First Connected Senior Care Ecosystem"}
              </span>
            </div>

            {/* MaiHoonNa Authentic Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight font-display leading-[1.14]">
              {isMr ? (
                <>
                  <span className="block text-saath-600">वय वाढले तरी जगण्याचा आनंद कमी होऊ नये.</span>
                  <span className="block text-stone-900 text-2xl sm:text-4xl lg:text-5xl mt-2 font-bold font-sans">
                    आपुलकीच्या गप्पा. हक्काचा सोबती. आणि दूर राहणाऱ्या कुटुंबाला मनःशांती.
                  </span>
                </>
              ) : (
                <>
                  <span className="block text-saath-600">Growing older, without giving up on living.</span>
                  <span className="block text-stone-900 text-2xl sm:text-4xl lg:text-5xl mt-2 font-bold font-sans">
                    Real conversations. Real activities. Real dignity, delivered with heart.
                  </span>
                </>
              )}
            </h1>

            {/* Sub-paragraph */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal max-w-2xl">
              {isMr
                ? 'प्रशिक्षित केअर मित्र (पडताळणी झालेले कॉलेज सोबती), आपुलकीचे साथी नेटवर्क, मुलांसाठी रिअल-टाइम व्हॉट्सॲप रिपोर्ट आणि सामाजिक कट्टा — सर्व एकाच सुरक्षित प्लॅटफॉर्मवर.'
                : 'Compassionate Care Mitras (verified student companions), an intergenerational Saathi network, real-time family visibility, and a caring community — all in one trusted subscription.'}
            </p>

            {/* Instant City / Locality Search Bar */}
            <form onSubmit={handleCitySearch} className="max-w-xl">
              <div className="bg-white p-2 rounded-2xl border-2 border-orange-200/90 shadow-elevated flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex items-center gap-2.5 px-3 flex-1 py-1.5 sm:py-0">
                  <MapPin className="w-5 h-5 text-saath-600 shrink-0" />
                  <input
                    type="text"
                    value={searchCity}
                    onChange={e => setSearchCity(e.target.value)}
                    placeholder={isMr ? "आपले शहर / परिसर टाका (उदा. पुणे, कोल्हापूर...)" : "Enter city or area (e.g. Pune, Kolhapur, Delhi NCR...)"}
                    className="w-full bg-transparent text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-saath-600 hover:bg-saath-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 active:scale-98"
                >
                  <Compass className="w-4 h-4" />
                  <span>{isMr ? 'सोबती शोधा' : 'Find Companion'}</span>
                </button>
              </div>
            </form>

            {/* Quick Action CTA Pill Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('careplans')}
                className="bg-white hover:bg-stone-50 text-stone-800 border-2 border-stone-300 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shadow-2xs flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-saath-600" />
                <span>{isMr ? 'केअर प्लॅन्स पहा' : 'View Plans'}</span>
              </button>

              {onOpenMatchmaker && (
                <button
                  onClick={onOpenMatchmaker}
                  className="bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-saath-800 border border-orange-300 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shadow-2xs flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{isMr ? 'AI मॅचमेकर' : 'Smart Matchmaker'}</span>
                </button>
              )}

              {onOpenRoleModal && (
                <button
                  onClick={onOpenRoleModal}
                  className="bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shadow-xs flex items-center gap-2"
                >
                  <span>🎭</span>
                  <span>{isMr ? 'डेमो भूमिका निवडा' : 'Switch Perspective'}</span>
                </button>
              )}
            </div>

            {/* Live City Badge (like MaiHoonNa live status) */}
            <div className="pt-2 flex items-center gap-2 text-xs text-stone-600 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                {isMr
                  ? 'सध्या कोल्हापूर, पुणे, सांगली, मुंबई व गुरुग्राम येथे थेट उपलब्ध'
                  : 'Live in Pune, Kolhapur, Sangli, Mumbai & Gurugram Sectors 53-57'}
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual with Real-time Family Update Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border-4 border-white bg-stone-100 aspect-[4/3] sm:aspect-square max-w-lg mx-auto group">
              <img
                src="/assets/maharashtrian_hero.jpg"
                alt="Care Mitra companion assisting elderly Maharashtrian grandfather on verandah with warm tea and laughter"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>

              {/* Floating Real-Time Family Observation Card */}
              <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-elevated border border-white/70 space-y-1.5 sm:space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-black text-stone-900 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      {isMr ? 'कुटुंबाला अपडेट पाठवला 🌿' : 'Family Connect Transmitted 🌿'}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-semibold">{isMr ? 'आत्ताच' : 'Just now'}</span>
                </div>

                <p className="text-xs text-stone-700 leading-snug">
                  <strong>आदित्य (सोबती)</strong> यांनी <strong>राजेंद्र कुलकर्णी</strong> यांच्यासोबत ६० मिनिटांचे सत्र पूर्ण केले: संध्याकाळी बुद्धिबळ खेळले, ४० मिनिटे वॉक झाला.
                </p>

                {/* Health Vitals Strip */}
                <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-stone-100 text-center">
                  <div className="bg-orange-50/80 p-1.5 rounded-lg border border-orange-100">
                    <span className="text-[9px] text-stone-500 block font-bold">BP</span>
                    <span className="text-[11px] font-black text-stone-900">120/80</span>
                  </div>
                  <div className="bg-emerald-50/80 p-1.5 rounded-lg border border-emerald-100">
                    <span className="text-[9px] text-stone-500 block font-bold">SPO2</span>
                    <span className="text-[11px] font-black text-emerald-700">98%</span>
                  </div>
                  <div className="bg-amber-50/80 p-1.5 rounded-lg border border-amber-100">
                    <span className="text-[9px] text-stone-500 block font-bold">MOOD</span>
                    <span className="text-[11px] font-black text-amber-700">आनंदी 😊</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 text-stone-500 font-medium">
                  <span className="text-emerald-700 font-bold">{isMr ? 'स्थिती: सामान्य ✓' : 'Status: Normal ✓'}</span>
                  <span className="text-saath-700 font-bold">{isMr ? 'बेंगळुरूला व्हॉट्सॲप पोहोचले' : 'WhatsApp Sent to Son'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. TRUST & VERIFICATION STRIP (MaiHoonNa trust-row) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustMetrics.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    {isMr ? item.titleMr : item.titleEn}
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {isMr ? item.subMr : item.subEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. THE CHALLENGE & IMPACT (MaiHoonNa Challenge) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-stone-200/90 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-saath-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
              {isMr ? 'वास्तव व आव्हान' : 'THE CHALLENGE'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
              {isMr ? 'वय वाढणे म्हणजे एकटे पडणे नव्हे' : "Growing old shouldn't mean growing lonely"}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {isMr
                ? 'भारतात लाखो ज्येष्ठ नागरिक एकटे राहतात, तर त्यांची मुले कामाच्या निमित्ताने परगावी असतात. साथी ही मानवी आपुलकी, स्मार्ट आरोग्य ट्रॅकिंग आणि कुटुंबाला पारदर्शकता देणारी हक्काची व्यवस्था आहे.'
                : 'Millions of seniors in India live alone while adult children work in distant metros or abroad. Saathi restores joy through empathetic youth companionship, structured health check-ins, and continuous family reassurance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challengeStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col items-center text-center space-y-3 hover:border-orange-300 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                  {stat.icon}
                </div>
                <strong className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
                  {stat.value}
                </strong>
                <span className="text-xs sm:text-sm font-medium text-stone-600">
                  {isMr ? stat.labelMr : stat.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. OUR CONNECTED ECOSYSTEM (MaiHoonNa Ecosystem) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-saath-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
            {isMr ? 'आमची परिसंस्था' : 'CONNECTED ECOSYSTEM'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
            {isMr ? 'ज्येष्ठांच्या सन्मानासाठी आणि आनंदासाठी संपूर्ण व्यवस्था' : 'Designed to help seniors live with dignity, connection & joy'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {isMr
              ? 'केवळ सेवा पुरवणे नव्हे, तर आजी-आजोबांच्या जीवनात हक्काचा सखा, संवाद आणि कुटुंबाला निःशंक मनःशांती देणे हे आमचे उद्दिष्ट आहे.'
              : 'Not just receiving basic care, but building genuine relationships, meaningful routines, and multi-generational joy.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystemPillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft hover:shadow-card transition-all flex flex-col justify-between space-y-4 group hover:border-orange-300"
            >
              <div className="space-y-3">
                <span className="text-4xl block">{item.emoji}</span>
                <h3 className="text-base font-extrabold text-stone-900 group-hover:text-saath-700 transition-colors">
                  {isMr ? item.titleMr : item.titleEn}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {isMr ? item.descMr : item.descEn}
                </p>
              </div>

              <button
                onClick={() => onNavigate(item.actionTab)}
                className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-saath-700 hover:text-saath-800"
              >
                <span>{isMr ? item.actionTextMr : item.actionTextEn}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 5. HEALTH & PEACE OF MIND (Vitals, Meds, Mood, Escort) ─── */}
      <section className="bg-white py-16 sm:py-20 border-y border-stone-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-saath-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
              {isMr ? 'आरोग्य व मनःशांती' : 'HEALTH & PEACE OF MIND'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
              {isMr ? 'प्रत्येक भेटीत आरोग्याची व समाधानाची नोंद' : 'Connected Health & Daily Well-being'}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {isMr
                ? 'केवळ गप्पा नव्हेत, तर नियमित आरोग्य मापदंड, वेळेवर औषधे आणि भावनिक आनंदाचे पारदर्शक ट्रॅकिंग.'
                : 'Medical-grade vitals logging, medication reminders, mood assessments, and structured summaries delivered straight to loved ones.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wellnessFeatures.map(item => (
              <div
                key={item.id}
                className="bg-[#FAF8F5] p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-5 hover:border-orange-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-2xs">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-orange-100 text-saath-800 border border-orange-200">
                      {isMr ? item.badgeMr : item.badgeEn}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      {isMr ? item.titleMr : item.titleEn}
                    </h3>
                    <p className="text-[11px] font-semibold text-stone-500">
                      {isMr ? item.subtitleMr : item.subtitleEn}
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {isMr ? item.descMr : item.descEn}
                  </p>
                </div>

                {/* Metrics Pill Grid */}
                <div className="bg-white p-3 rounded-2xl border border-stone-200/80 space-y-2">
                  <div className="grid grid-cols-3 gap-1 text-center">
                    {item.metrics.map((m, mi) => (
                      <div key={mi} className="px-1 py-1 rounded-lg bg-stone-50 border border-stone-100">
                        <span className="text-[8px] font-black uppercase text-stone-400 block">{m.label}</span>
                        <span className="text-[11px] font-extrabold text-stone-900 block truncate">{m.value}</span>
                        <span className="text-[8px] font-semibold text-emerald-600 block">{m.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 6. HOW IT WORKS TIMELINE (MaiHoonNa 5-Step Process) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-saath-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
            {isMr ? 'कार्यपद्धती' : 'HOW IT WORKS'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
            {isMr ? 'पहिल्या फोनपासून पहिल्या भेटीपर्यंत' : 'From the first call to the first visit'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {isMr
              ? 'सोपी, पारदर्शक आणि संवेदनशील प्रक्रिया — प्रत्येक टप्प्यावर आपले पालक सुरक्षित हातात.'
              : 'Simple, transparent, and human — every step of the way.'}
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-orange-200 -translate-y-6 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft flex flex-col space-y-3 hover:border-orange-400 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-saath-600 text-white font-black text-base flex items-center justify-center shadow-md shadow-saath-500/30 group-hover:scale-105 transition-transform">
                  {step.step}
                </div>
                <h3 className="text-sm font-black text-stone-900 pt-1">
                  {isMr ? step.titleMr : step.titleEn}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {isMr ? step.descMr : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. CARE PLANS & SUBSCRIPTIONS (MaiHoonNa View Plans) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-saath-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
            {isMr ? 'केअर प्लॅन्स व वर्गणी' : 'VIEW PLANS & PRICING'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
            {isMr ? 'पालकांसाठी सर्वोत्तम केअर प्लॅन निवडा' : 'Transparent Care Plans For Every Family'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {isMr
              ? 'कोणतेही छुपे शुल्क नाही. कधीही बदला किंवा रद्द करा. कुटुंबाला दर आठवड्याला मनःशांती.'
              : 'Zero hidden fees. Change or cancel anytime. Consistent companionship and family peace of mind.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map(plan => (
            <div
              key={plan.id}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-gradient-to-b from-orange-50/80 via-white to-orange-50/40 border-2 border-saath-500 shadow-elevated scale-102 ring-4 ring-saath-400/20'
                  : 'bg-white border border-stone-200 shadow-soft hover:shadow-card hover:border-stone-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-saath-600 text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-xs">
                  {isMr ? 'सर्वाधिक पसंती (Most Popular)' : 'Most Popular'}
                </div>
              )}

              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-wide text-saath-700 bg-orange-100/70 px-3 py-0.5 rounded-full inline-block">
                  {isMr ? plan.badgeMr : plan.badgeEn}
                </span>

                <div>
                  <h3 className="text-xl font-black text-stone-900">
                    {isMr ? plan.titleMr : plan.titleEn}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {isMr ? plan.descMr : plan.descEn}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-4xl font-black text-stone-900 font-display">{plan.price}</span>
                  <span className="text-xs font-bold text-stone-500">{isMr ? plan.periodMr : plan.periodEn}</span>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-stone-100">
                  <span className="text-[11px] font-black text-stone-400 uppercase tracking-wider block">
                    {isMr ? 'यात काय समाविष्ट आहे:' : "What's included:"}
                  </span>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {(isMr ? plan.featuresMr : plan.featuresEn).map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4">
                <button
                  onClick={plan.onClick}
                  className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-saath-600 hover:bg-saath-700 text-white shadow-md shadow-saath-500/25 active:scale-98'
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

      {/* ─── 9. ECOSYSTEM FOOTER (MaiHoonNa Inspired) ─── */}
      <footer className="border-t border-stone-200 bg-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand column */}
            <div className="space-y-3 md:col-span-2">
              <SaathiLogo size="md" />
              <p className="text-xs text-stone-600 leading-relaxed max-w-md">
                {isMr
                  ? "भारतातील पहिली जोडलेली ज्येष्ठ संगोपन परिसंस्था. आपुलकीचे केअर मित्र, साथी नेटवर्क आणि रिअल-टाइम फॅमिली व्हिजिबिलिटी — एकाच विश्वासू वर्गणीत."
                  : "India's connected senior care ecosystem. Compassionate Care Mitras, intergenerational Saathi Network, and real-time family visibility — all in one trusted subscription."}
              </p>
              <p className="text-xs text-stone-500 font-medium">
                📍 {isMr ? 'कार्यक्षेत्र: पुणे • कोल्हापूर • सांगली • मुंबई • दिल्ली NCR' : 'Service Areas: Pune • Kolhapur • Sangli • Mumbai • Delhi NCR'}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-stone-900">
                {isMr ? 'मुख्य दुवे' : 'Quick Navigation'}
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-600">
                <li>
                  <button onClick={() => onNavigate('landing')} className="hover:text-saath-600 transition-colors">
                    {isMr ? 'मुख्य पान (Home)' : 'Home'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('discovery')} className="hover:text-saath-600 transition-colors">
                    {isMr ? 'आमच्या सेवा (Services)' : 'Our Services'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('activities')} className="hover:text-saath-600 transition-colors">
                    {isMr ? 'साथी कट्टा (Social Network)' : 'Saathi Network'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('careplans')} className="hover:text-saath-600 transition-colors">
                    {isMr ? 'केअर प्लॅन्स (Care Plans)' : 'Care Plans & Subscriptions'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Safety & Trust */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-stone-900">
                {isMr ? 'सुरक्षा व हमी' : 'Trust & Safety'}
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-600">
                <li>
                  <button onClick={() => onNavigate('safety')} className="hover:text-saath-600 transition-colors">
                    {isMr ? 'सुरक्षा धोरण व SOS' : 'Safety Guidelines & SOS'}
                  </button>
                </li>
                <li className="text-[11px] text-stone-500">
                  {isMr ? 'कॉलेज आयडी व पोलीस पडताळणी' : '100% Background Verified'}
                </li>
                <li className="text-[11px] text-stone-500">
                  {isMr ? 'झिरो-ओटीपी व झिरो-कॅश नियम' : 'Zero-Cash Elder Security'}
                </li>
                <li className="text-[11px] text-stone-500">
                  {isMr ? '२४x७ इमर्जन्सी हेल्पलाइन' : '24/7 Rapid Emergency Response'}
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
            <p>© {new Date().getFullYear()} साथी Saathi Eldercare Private Limited. All rights reserved.</p>
            <p className="italic font-semibold text-saath-700">
              {isMr ? '“नातं विश्वासाचं, सोबती आपुलकीचा — साथी”' : '“A Bond of Trust, A Companion of Warmth — Saathi”'}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};
