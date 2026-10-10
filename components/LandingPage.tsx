'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { StudentProfile } from '@/types';
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
  X,
  Play,
  Share2,
  Filter,
  GraduationCap,
  Sparkle,
  Radio,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { SaathiLogo } from './SaathiLogo';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
  onOpenMatchmaker?: () => void;
  onOpenRoleModal?: () => void;
  onSelectStudent?: (student: StudentProfile) => void;
  onBookStudent?: (student: StudentProfile) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenMatchmaker,
  onOpenRoleModal,
  onSelectStudent,
  onBookStudent,
}) => {
  const { role, switchRole, language, students } = useApp();
  const isMr = language === 'mr';

  const [searchCity, setSearchCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeStoryStudent, setActiveStoryStudent] = useState<StudentProfile | null>(null);

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('discovery');
  };

  // Activity filter options for main page profile showcase
  const categoryFilters = [
    { id: 'all', labelMr: 'सर्व सोबती', labelEn: 'All Companions', icon: '🌟' },
    { id: 'Chess', labelMr: 'बुद्धिबळ', labelEn: 'Chess', icon: '♟️' },
    { id: 'Technology Help', labelMr: 'स्मार्टफोन मदत', labelEn: 'Tech Help', icon: '📱' },
    { id: 'Walking', labelMr: 'प्रभातफेरी', labelEn: 'Walking', icon: '🚶' },
    { id: 'Music', labelMr: 'संगीत व भजन', labelEn: 'Music', icon: '🎵' },
    { id: 'Reading', labelMr: 'पुस्तक वाचन', labelEn: 'Reading', icon: '📖' },
    { id: 'Conversation', labelMr: 'गप्पा व चहा', labelEn: 'Tea & Talk', icon: '☕' },
    { id: 'Gardening', labelMr: 'बागकाम', labelEn: 'Gardening', icon: '🌿' },
  ];

  // Filtered companions directly on main page
  const filteredProfiles = useMemo(() => {
    if (selectedCategory === 'all') return students;
    return students.filter(student =>
      student.interests.concat(student.activities).some(
        a => a.toLowerCase() === selectedCategory.toLowerCase()
      )
    );
  }, [students, selectedCategory]);

  // Story companion messages for Instagram-style interactive story spotlight
  const storyQuotes: Record<string, { quoteMr: string; quoteEn: string; tag: string }> = {
    'student-1': {
      quoteMr: 'आज संध्याकाळी बुद्धिबळ खेळणे, फेरफटका आणि नवीन ॲप्स शिकवण्यासाठी मी तयार आहे!',
      quoteEn: 'Ready for an evening game of chess, a colony stroll, and smartphone help!',
      tag: '♟️ Chess & Tech Champion',
    },
    'student-2': {
      quoteMr: 'नाट्यसंगीत, जुनी गाणी आणि मराठी कथा वाचत छान वेळ घालवूया!',
      quoteEn: 'Passionate about classical vocals, old natyasangeet, and reading literature aloud!',
      tag: '🎵 Classical Music & Books',
    },
    'student-3': {
      quoteMr: 'संध्याकाळची प्रभातफेरी आणि गच्चीवरील बागेची काळजी घेण्यात मला खूप आनंद मिळतो.',
      quoteEn: 'Love morning terrace gardening, park walks, and hearing old stories.',
      tag: '🌿 Walks & Terrace Gardening',
    },
    'student-4': {
      quoteMr: 'स्मार्टफोन, व्हॉट्सॲप आणि ऑनलाईन पेमेंट्स अगदी सोप्या भाषेत समजावून सांगते!',
      quoteEn: 'Specialized in friendly, patient digital literacy and WhatsApp safety for seniors!',
      tag: '📱 Friendly Tech Tutor',
    },
    'student-5': {
      quoteMr: 'आपुलकीने संवाद साधणे आणि स्पर्धात्मक बुद्धिबळ खेळणे हा माझा आवडता छंद आहे.',
      quoteEn: 'Patient listener, respectful companion, and passionate chess partner.',
      tag: '♟️ Strategy & Daily Walk',
    },
    'student-6': {
      quoteMr: 'वर्तमानपत्र वाचन, लायब्ररी पुस्तके आणि शांत मनमोकळ्या गप्पांसाठी हक्काची सोबत.',
      quoteEn: 'Love reading newspaper editorials together and sharing calm afternoon tea.',
      tag: '📖 Literature & Calm Chai',
    },
    'student-7': {
      quoteMr: 'स्मार्ट टीव्ही, टॅब्लेट, यूट्यूब आणि रेट्रो बॉलिवूड संगीतासोबत छान गप्पा!',
      quoteEn: 'Helping seniors with smart gadgets, TV remotes, and retro golden songs.',
      tag: '📱 Smart Gadgets & Music',
    },
    'student-8': {
      quoteMr: 'आजी-आजोबांच्या जुन्या आठवणी ऐकणे आणि पारंपारिक पाककृतींवर गप्पा मारणे आवडते.',
      quoteEn: 'Respectful and cheerful. Love listening to ancestral stories and sharing tea.',
      tag: '☕ Nostalgia & Warm Tea',
    },
  };

  // Quick Trust Metrics - Visual & Concise
  const trustMetrics = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      titleMr: '१००% पडताळणी',
      titleEn: '100% Vetted',
      badgeMr: 'कॉलेज आयडी व पोलीस तपासणी',
      badgeEn: 'College ID & Police Verified',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    },
    {
      icon: <MapPin className="w-5 h-5 text-saath-600" />,
      titleMr: 'जिओ-फेन्स चेक-इन',
      titleEn: 'GPS Geo-fenced',
      badgeMr: 'प्रत्येक फेरी अचूक प्रमाणित',
      badgeEn: 'Live Visit Timestamped',
      color: 'bg-orange-50 border-orange-200 text-saath-800',
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-amber-600" />,
      titleMr: 'झिरो-कॅश सुरक्षा',
      titleEn: 'Zero-Cash Safety',
      badgeMr: 'कधीही रोख व्यवहार नाही',
      badgeEn: 'Safe Elder Protocols',
      color: 'bg-amber-50 border-amber-200 text-amber-800',
    },
    {
      icon: <Star className="w-5 h-5 text-amber-500 fill-amber-400" />,
      titleMr: '४.९ / ५ रेटिंग',
      titleEn: '4.9 / 5 Rating',
      badgeMr: '१,२००+ कुटुंबांचा विश्वास',
      badgeEn: '1,200+ Elder Families',
      color: 'bg-rose-50 border-rose-200 text-rose-800',
    },
  ];

  // Visual Challenge Metric Cards (More Visuals, Less Reading)
  const challengeStats = [
    {
      value: '72M+',
      metricMr: 'एकटे राहणारे ज्येष्ठ नागरिक',
      metricEn: 'Seniors Living Alone in India',
      subMr: 'शहरी व उपनगरांमध्ये सामाजिक एकाकीपण',
      subEn: 'Navigating loneliness across cities',
      icon: <Users className="w-6 h-6 text-saath-600" />,
      trend: '+14% दरवर्षी',
      trendColor: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      value: '30M+',
      metricMr: 'परगावी राहणारी मुले',
      metricEn: 'Children Away from Parents',
      subMr: 'बेंगळुरू, मुंबई किंवा परदेशात नोकरीनिमित्त',
      subEn: 'Working in metros or abroad',
      icon: <MapPin className="w-6 h-6 text-saath-600" />,
      trend: 'रिअल-टाइम अपडेट हवेत',
      trendColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      value: '1 in 3',
      metricMr: 'नियमित एकाकीपणाचे प्रमाण',
      metricEn: 'Regular Loneliness Index',
      subMr: 'संवाद व सहवासाची तातडीची गरज',
      subEn: 'Need for heartfelt intergenerational bond',
      icon: <Heart className="w-6 h-6 text-coral-500 fill-coral-100" />,
      trend: 'साथीने आनंद वाढतो',
      trendColor: 'text-rose-700 bg-rose-50 border-rose-200',
    },
  ];

  // 4 Ecosystem Pillars (More Visuals, Less Reading)
  const ecosystemPillars = [
    {
      emoji: '🤝',
      titleMr: 'केअर मित्र भेटी',
      titleEn: 'Care Mitra Visits',
      pointsMr: ['नियमित नियोजित भेटी', 'बीपी, चालणे व औषध खात्री', 'प्रत्येक भेटीचे जीपीएस प्रमाणीकरण'],
      pointsEn: ['Scheduled regular visits', 'Vitals, walks & medicine check', 'GPS timestamped check-in'],
      actionTab: 'discovery',
      actionTextMr: 'सोबती शोधा →',
      actionTextEn: 'Find Mitra →',
    },
    {
      emoji: '🌸',
      titleMr: 'साथी नेटवर्क',
      titleEn: 'Saathi Network',
      pointsMr: ['बुद्धिबळ, वाचन व गप्पा', 'स्मार्टफोन व ॲप्स शिकणे', 'तरुण मित्रांसोबत मनमोकळा आनंद'],
      pointsEn: ['Chess, books & warm chai', 'Smartphone & app mastery', 'Lively youth companionship'],
      actionTab: 'activities',
      actionTextMr: 'नेटवर्क पहा →',
      actionTextEn: 'Explore →',
    },
    {
      emoji: '🏆',
      titleMr: 'सामाजिक कट्टा',
      titleEn: 'Community Katta',
      pointsMr: ['अनुभव व आठवणींची देवाणघेवाण', 'हास्य क्लब व प्रभात फेरी', 'साप्ताहिक छंद मंडळ'],
      pointsEn: ['Wisdom sharing & stories', 'Morning walk & laughter club', 'Weekly senior peer katta'],
      actionTab: 'activities',
      actionTextMr: 'कट्टा फेरफटका →',
      actionTextEn: 'Join Katta →',
    },
    {
      emoji: '📱',
      titleMr: 'कुटुंब कनेक्ट',
      titleEn: 'Family Connect',
      pointsMr: ['थेट व्हॉट्सॲप समरी अलर्ट', 'Know My Normal मूड नोंदी', 'कुठूनही लाईव्ह मनःशांती'],
      pointsEn: ['Instant WhatsApp session logs', 'Know My Normal mood tracking', 'Real-time reassurance anywhere'],
      actionTab: 'familyHub',
      actionTextMr: 'डॅशबोर्ड पहा →',
      actionTextEn: 'Family Hub →',
    },
  ];

  // Visual Wellness Metrics (Visual Health Monitor Card)
  const wellnessFeatures = [
    {
      id: 'vitals',
      icon: <Stethoscope className="w-5 h-5 text-saath-600" />,
      titleMr: 'आरोग्य व व्हायटल्स नोंदी',
      titleEn: 'Vitals Logging',
      badgeMr: 'नियमित खात्री',
      badgeEn: 'Every Visit',
      descMr: 'रक्तदाब (BP), SpO2 व तापमान प्रत्येक भेटीनंतर नोंदवून सुरक्षित ट्रॅकिंग.',
      descEn: 'BP, SpO2 & pulse logged with GPS timestamp after every session.',
      metrics: [
        { label: 'BP', val: '120/80', status: 'Normal ✓', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
        { label: 'SPO2', val: '98%', status: 'Optimal ✓', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
        { label: 'TEMP', val: '98.4°F', status: 'Normal ✓', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
      ],
    },
    {
      id: 'meds',
      icon: <Pill className="w-5 h-5 text-purple-600" />,
      titleMr: 'औषध वेळापत्रक स्मरण',
      titleEn: 'Medicine Adherence',
      badgeMr: 'शून्य विस्मरण',
      badgeEn: 'Zero Missed',
      descMr: 'डॉक्टरांच्या सल्ल्यानुसार ठरलेली औषधे वेळेवर घेतल्याची खात्री.',
      descEn: 'Prescription-linked checks ensure zero missed doses with friendly support.',
      metrics: [
        { label: 'आज', val: '3/3', status: 'पूर्ण ✓', color: 'text-purple-700 bg-purple-50 border-purple-100' },
        { label: 'आठवडा', val: '21/21', status: 'परफेक्ट ✓', color: 'text-purple-700 bg-purple-50 border-purple-100' },
        { label: 'सातत्य', val: '१४ दिवस', status: 'सक्रिय ✓', color: 'text-purple-700 bg-purple-50 border-purple-100' },
      ],
    },
    {
      id: 'mood',
      icon: <Laugh className="w-5 h-5 text-amber-600" />,
      titleMr: 'मूड व हॅपीनेस स्कोअर',
      titleEn: 'Mood Happiness Index',
      badgeMr: 'भावनिक स्वास्थ्य',
      badgeEn: 'Emotional Joy',
      descMr: 'भेटीनंतर आजोबा किंवा आजींचा मूड — हसतमुख, शांत व उत्साही नोंदी.',
      descEn: 'Qualitative mood assessment monitors emotional positivity and joy.',
      metrics: [
        { label: 'मूड', val: 'आनंदी 😊', status: 'उत्साही', color: 'text-amber-700 bg-amber-50 border-amber-100' },
        { label: 'उपक्रम', val: 'बुद्धिबळ + वॉक', status: 'सक्रिय', color: 'text-amber-700 bg-amber-50 border-amber-100' },
        { label: 'आनंद दर', val: '९.४ / १०', status: 'उत्तम ✓', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
      ],
    },
    {
      id: 'clinic',
      icon: <Users className="w-5 h-5 text-blue-600" />,
      titleMr: 'दवाखाना व वॉक सोबत',
      titleEn: 'Clinic & Park Escort',
      badgeMr: 'हक्काचा सोबती',
      badgeEn: 'Door-to-Door',
      descMr: 'डॉक्टर तपासणी, औषध खरेदी किंवा कॉलनी उद्यानातील संध्याकाळची फेरी.',
      descEn: 'Care Mitra safely accompanies to clinic visits, markets, and walks.',
      metrics: [
        { label: 'सोबत', val: 'घरापासून परत', status: 'सुरक्षित ✓', color: 'text-blue-700 bg-blue-50 border-blue-100' },
        { label: 'डॉक्टर भेट', val: 'सहायी नोंद', status: 'पूर्ण ✓', color: 'text-blue-700 bg-blue-50 border-blue-100' },
        { label: 'फेरफटका', val: '४० मिनिटे', status: 'दैनिक ✓', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
      ],
    },
  ];

  // How It Works - Visual 5-Step Process
  const processSteps = [
    { step: '१', titleMr: 'कुटुंबाची माहिती द्या', titleEn: 'Tell us needs', icon: '📝', subMr: 'आवडीनिवडी व वेळ' },
    { step: '२', titleMr: 'योग्य केअर प्लॅन निवडा', titleEn: 'Choose a plan', icon: '💳', subMr: 'तासिका किंवा मासिक' },
    { step: '३', titleMr: 'विश्वासू सोबती मॅच करा', titleEn: 'Match companion', icon: '🤝', subMr: '१००% पडताळणी झालेला' },
    { step: '४', titleMr: 'नियमित भेटी सुरू होतात', titleEn: 'Visits begin', icon: '🌸', subMr: 'गप्पा, वॉक व व्हायटल्स' },
    { step: '५', titleMr: 'कुठूनही जोडलेले राहा', titleEn: 'Family updates', icon: '📱', subMr: 'व्हॉट्सॲप रिअल-टाइम' },
  ];

  // Pricing Plans (Clear, visual, light-themed)
  const pricingPlans = [
    {
      id: 'ondemand',
      badgeMr: 'लवचिक भेट',
      badgeEn: 'Single Visit',
      titleMr: 'ऑन-डिमांड तासिका भेट',
      titleEn: 'Hourly Pay-Per-Visit',
      price: '₹150',
      periodMr: '/ तास',
      periodEn: '/ hour',
      popular: false,
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
      onClick: () => onNavigate('discovery'),
    },
    {
      id: 'monthly-weekly',
      badgeMr: 'सर्वाधिक पसंती ⭐',
      badgeEn: 'Most Popular ⭐',
      titleMr: 'सावली केअर प्लॅन (साप्ताहिक)',
      titleEn: 'Saavli Weekly Care Plan',
      price: '₹599',
      periodMr: '/ महिना',
      periodEn: '/ month',
      popular: true,
      featuresMr: [
        'महिन्यात ४ निश्चित १-तास भेटी (साप्ताहिक)',
        'ठरलेला एकच विश्वासू सोबती (स्थिर आपुलकी)',
        'सविस्तर "Know My Normal" आरोग्य व मूड रिपोर्ट',
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
      onClick: () => onNavigate('careplans'),
    },
    {
      id: 'monthly-biweekly',
      badgeMr: 'संपूर्ण मनःशांती',
      badgeEn: 'Family Complete Care',
      titleMr: 'परिवार सुरक्षा प्लॅन',
      titleEn: 'Parivar Suraksha Plan',
      price: '₹1,199',
      periodMr: '/ महिना',
      periodEn: '/ month',
      popular: false,
      featuresMr: [
        'महिन्यात ८ सविस्तर भेटी (आठवड्यातून २ दिवस)',
        'प्रायॉरिटी कंपॅनियन मॅचिंग (उच्च दर्जा)',
        'दर १५ दिवसांनी कुटुंबासोबत व्हिडिओ कॉल चेक-इन',
        '२४x७ इमर्जन्सी हेल्प व त्वरित अलर्ट सुविधा',
        'स्थानिक औषधे व डॉक्टर भेटीसाठी सोबत',
      ],
      featuresEn: [
        '8 visits per month (twice every week)',
        'Priority top-rated companion matching',
        'Bi-weekly family video check-in call',
        '24/7 emergency hotline & instant SMS alerts',
        'Local pharmacy & doctor appointment escort',
      ],
      onClick: () => onNavigate('careplans'),
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-16 pb-20">

      {/* ─── 0. TOP DEMO PERSPECTIVES BAR ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-5">
        <div className="bg-gradient-to-r from-saath-600 via-amber-500 to-saath-500 rounded-2xl sm:rounded-3xl p-4 sm:p-7 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[11px] font-extrabold uppercase px-3 py-0.5 rounded-full border border-white/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isMr ? 'लाईव्ह चाचणी व प्रात्यक्षिक' : 'Interactive Prototype'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              {isMr ? 'साथी प्लॅटफॉर्मचा अनुभव विविध भूमिकेतून घ्या' : 'Experience Saathi from all 4 Perspectives'}
            </h2>
            <p className="text-xs sm:text-sm text-orange-100/90 leading-relaxed">
              {isMr
                ? 'ज्येष्ठ नागरिक, कॉलेज सोबती, दूर राहणारे कुटुंब किंवा ॲडमिन कंट्रोल रूम — एका क्लिकवर थेट भूमिका बदला.'
                : 'Explore real-time workflows as an elderly senior, a student companion, an outstation family member, or admin.'}
            </p>
          </div>

          <button
            onClick={() => onOpenRoleModal && onOpenRoleModal()}
            className="bg-white text-stone-900 hover:bg-orange-50 font-black text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-2xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2 active:scale-98 w-full sm:w-auto"
          >
            <span>🎭</span>
            <span>{isMr ? 'भूमिका निवडा' : 'Switch Perspective'}</span>
            <ArrowRight className="w-4 h-4 text-saath-600" />
          </button>
        </div>
      </section>

      {/* ─── 1. HERO SECTION (Punchy, Modern Light Theme) ─── */}
      <section className="relative pt-1 sm:pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Headlines, Quick Search & Badges */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">

            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-saath-800 text-xs sm:text-sm font-extrabold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <Sparkles className="w-4 h-4 text-saath-600" />
              <span>
                {isMr
                  ? "भारतातील पहिली जोडलेली ज्येष्ठ संगोपन परिसंस्था"
                  : "India's First Connected Senior Care Ecosystem"}
              </span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-stone-900 tracking-tight font-display leading-[1.18]">
              {isMr ? (
                <>
                  <span className="text-saath-600 block">वय वाढले तरी जगण्याचा आनंद कमी होऊ नये.</span>
                  <span className="text-stone-900 block text-2xl sm:text-4xl mt-1.5 font-bold font-sans">
                    आपुलकीच्या गप्पा, हक्काचा सोबती आणि कुटुंबाला मनःशांती.
                  </span>
                </>
              ) : (
                <>
                  <span className="text-saath-600 block">Growing older, without giving up on living.</span>
                  <span className="text-stone-900 block text-2xl sm:text-4xl mt-1.5 font-bold font-sans">
                    Genuine conversations, verified companions, and family peace of mind.
                  </span>
                </>
              )}
            </h1>

            {/* Visual Value Badges (Replaces wordy paragraphs with glanceable badges) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-800 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{isMr ? '१००% पडताळणी झालेले सोबती' : '100% Vetted Mitras'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-800 shadow-2xs">
                <Activity className="w-4 h-4 text-saath-600" />
                <span>{isMr ? 'Know My Normal आरोग्य ट्रॅकिंग' : 'Know My Normal Vitals'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-800 shadow-2xs">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{isMr ? 'मुलांना व्हॉट्सॲप समरी' : 'WhatsApp Family Alerts'}</span>
              </span>
            </div>

            {/* Instant Locality Search Bar */}
            <form onSubmit={handleCitySearch} className="max-w-xl">
              <div className="bg-white p-2 rounded-2xl border-2 border-orange-200 shadow-soft flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex items-center gap-2.5 px-3 flex-1 py-1 sm:py-0">
                  <MapPin className="w-5 h-5 text-saath-600 shrink-0" />
                  <input
                    type="text"
                    value={searchCity}
                    onChange={e => setSearchCity(e.target.value)}
                    placeholder={isMr ? "आपला परिसर किंवा शहर टाका (उदा. कोल्हापूर, पुणे...)" : "Enter locality or city (e.g. Kolhapur, Pune, Mumbai...)"}
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

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={() => onNavigate('careplans')}
                className="bg-white hover:bg-stone-50 text-stone-800 border-2 border-stone-200 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shadow-2xs flex items-center gap-2"
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
                  <span>{isMr ? 'स्मार्ट मॅचमेकर' : 'Smart Matchmaker'}</span>
                </button>
              )}
            </div>

            {/* Live Service Availability Badge */}
            <div className="flex items-center gap-2 text-xs text-stone-600 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                {isMr
                  ? 'सध्या कोल्हापूर, पुणे, सांगली, मुंबई व दिल्ली NCR येथे सक्रिय उपलब्ध'
                  : 'Live in Kolhapur, Pune, Sangli, Mumbai & Delhi NCR'}
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual with Real-time Family Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border-4 border-white bg-stone-100 aspect-[4/3] sm:aspect-square max-w-lg mx-auto group">
              <img
                src="/assets/maharashtrian_hero.jpg"
                alt="Care Mitra companion assisting elderly Maharashtrian grandfather on verandah with warm tea and laughter"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>

              {/* Floating Real-Time Family Observation Card */}
              <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-elevated border border-white/80 space-y-2">
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
                  <strong>आदित्य (सोबती)</strong> यांनी <strong>राजेंद्र कुलकर्णी</strong> यांच्यासोबत ६० मिनिटांचे सत्र पूर्ण केले: संध्याकाळी बुद्धिबळ व वॉक झाला.
                </p>

                {/* Health Vitals Strip */}
                <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-stone-100 text-center">
                  <div className="bg-orange-50/90 p-1.5 rounded-lg border border-orange-100">
                    <span className="text-[9px] text-stone-500 block font-bold">BP</span>
                    <span className="text-[11px] font-black text-stone-900">120/80</span>
                  </div>
                  <div className="bg-emerald-50/90 p-1.5 rounded-lg border border-emerald-100">
                    <span className="text-[9px] text-stone-500 block font-bold">SPO2</span>
                    <span className="text-[11px] font-black text-emerald-700">98%</span>
                  </div>
                  <div className="bg-amber-50/90 p-1.5 rounded-lg border border-amber-100">
                    <span className="text-[9px] text-stone-500 block font-bold">MOOD</span>
                    <span className="text-[11px] font-black text-amber-700">आनंदी 😊</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-0.5 text-stone-500 font-medium">
                  <span className="text-emerald-700 font-bold">{isMr ? 'स्थिती: सामान्य ✓' : 'Status: Normal ✓'}</span>
                  <span className="text-saath-700 font-bold">{isMr ? 'बेंगळुरूला व्हॉट्सॲप पोहोचले' : 'WhatsApp Sent to Son'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. TRUST & VERIFICATION STRIP ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-soft">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trustMetrics.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-stone-50 transition-colors">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 shadow-2xs">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-black text-stone-900">
                    {isMr ? item.titleMr : item.titleEn}
                  </h4>
                  <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border mt-0.5 ${item.color}`}>
                    {isMr ? item.badgeMr : item.badgeEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. STORY-STYLE PROFILES DIRECTLY ON MAIN PAGE (REQUIREMENTS 3 & 4) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-saath-800 text-xs font-black uppercase tracking-wider mb-2 border border-orange-200">
              <Sparkles className="w-3.5 h-3.5 text-saath-600" />
              <span>{isMr ? 'थेट उपलब्ध सोबती • मुख्य पान' : 'Live Verified Companions • Story Showcase'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 font-display">
              {isMr ? 'आपल्या परिसरातील हक्काचे साथीदार' : 'Meet Your Neighborhood Companions'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {isMr
                ? 'कोणत्याही पॉपअपशिवाय सर्व माहिती थेट उपलब्ध — एका क्लिकवर भेट बुक करा किंवा प्रोफाइल पहा.'
                : 'Key profile details immediately accessible right here without opening any modal.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('discovery')}
            className="text-xs sm:text-sm font-extrabold text-saath-700 hover:text-saath-800 flex items-center gap-1.5 shrink-0 self-start sm:self-end hover:underline"
          >
            <span>{isMr ? 'सर्व सोबती फिल्टर करा' : 'Explore All With Advanced Filters'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ── Story Circles Bar (Social-Media-Story-Inspired Tray) ── */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-black uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{isMr ? 'थेट सोबती स्टोरीज (टॅप करून पहा)' : 'Live Story Highlights (Tap to Spotlight)'}</span>
            </span>
            <span className="text-[11px] text-stone-400 font-semibold hidden sm:inline-block">
              {isMr ? '८ पडताळणी झालेले सोबती उपलब्ध' : '8 Verified Companions Online'}
            </span>
          </div>

          {/* Horizontal Snap Scroll Story Tray */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
            {students.map(student => {
              const isSelected = activeStoryStudent?.id === student.id;
              const storyData = storyQuotes[student.id];

              return (
                <button
                  key={student.id}
                  onClick={() => setActiveStoryStudent(student)}
                  className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none"
                  title={`${student.name} - ${storyData?.tag || 'Companion'}`}
                >
                  {/* Story Avatar Ring */}
                  <div
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[3px] transition-all transform group-hover:scale-105 active:scale-95 ${
                      isSelected
                        ? 'story-ring-gradient story-ring-glow ring-2 ring-saath-500'
                        : 'story-ring-gradient group-hover:story-ring-glow'
                    }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                      <img
                        src={student.profilePhoto}
                        alt={student.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    {/* Online Pulse Indicator */}
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center shadow-xs">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    </div>
                  </div>

                  {/* Name & Quick Activity Emoji */}
                  <div className="text-center w-20 sm:w-22">
                    <p className="text-xs font-black text-stone-900 truncate group-hover:text-saath-700 transition-colors">
                      {student.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-stone-500 truncate font-semibold">
                      {storyData ? storyData.tag.split(' ')[0] : '★ 4.9'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Story Spotlight Callout (When a story is tapped) */}
          {activeStoryStudent && (
            <div className="mt-2 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/60 p-4 rounded-2xl border border-orange-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full p-0.5 story-ring-gradient shrink-0">
                  <img
                    src={activeStoryStudent.profilePhoto}
                    alt={activeStoryStudent.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-stone-900">{activeStoryStudent.name}</span>
                    <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full border border-orange-200 text-saath-800">
                      ₹{activeStoryStudent.hourlyRate}/तास
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ★ {activeStoryStudent.rating}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 mt-0.5 font-medium italic">
                    “{isMr ? storyQuotes[activeStoryStudent.id]?.quoteMr : storyQuotes[activeStoryStudent.id]?.quoteEn}”
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => onBookStudent && onBookStudent(activeStoryStudent)}
                  className="bg-saath-600 hover:bg-saath-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>{isMr ? 'लगेच बुक करा' : 'Book Visit'}</span>
                </button>
                <button
                  onClick={() => setActiveStoryStudent(null)}
                  className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-white"
                  title="Close spotlight"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Visual Filter Pills ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categoryFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedCategory(filter.id)}
              className={`px-3.5 py-2 rounded-full text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 shadow-2xs ${
                selectedCategory === filter.id
                  ? 'bg-saath-600 text-white shadow-xs'
                  : 'bg-white hover:bg-orange-50 text-stone-700 border border-stone-200'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{isMr ? filter.labelMr : filter.labelEn}</span>
            </button>
          ))}
        </div>

        {/* ── Story-Style Profile Cards Grid (Key Info Directly Accessible!) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProfiles.map(student => (
            <div
              key={student.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between overflow-hidden group hover:border-orange-300"
            >
              {/* Card Top Banner with Story Ring Portrait */}
              <div>
                <div className="relative h-24 bg-gradient-to-r from-orange-100 via-amber-50 to-orange-50 p-3.5 flex items-start justify-between">
                  {/* Verified ID badge */}
                  <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[10px] font-black text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{isMr ? 'पडताळणी पूर्ण' : '100% Verified'}</span>
                  </span>

                  {/* Hourly Rate Chip */}
                  <span className="inline-flex items-center gap-1 bg-saath-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                    ₹{student.hourlyRate}
                    <span className="text-[10px] font-medium opacity-90">{isMr ? '/तास' : '/hr'}</span>
                  </span>
                </div>

                {/* Circular Portrait with Story Ring Accent overlapping banner */}
                <div className="px-4 -mt-10 flex items-end justify-between">
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-[2.5px] story-ring-gradient shadow-md bg-white">
                    <img
                      src={student.profilePhoto}
                      alt={student.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                    {student.isVerified && (
                      <div
                        className="absolute bottom-0 right-0 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-xs"
                        title="College Verified ID"
                      >
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  {/* Star Rating Badge */}
                  <div className="bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl text-right">
                    <div className="flex items-center gap-1 text-xs font-black text-amber-900">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span>{student.rating}</span>
                    </div>
                    <span className="text-[10px] text-stone-500 font-bold block">
                      {student.completedSessionsCount || student.reviewCount} {isMr ? 'भेटी' : 'visits'}
                    </span>
                  </div>
                </div>

                {/* Companion Details (Immediately visible without modal!) */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-base font-black text-stone-900 flex items-center gap-1.5 group-hover:text-saath-700 transition-colors">
                      <span>{student.name}</span>
                      <span className="text-xs font-bold text-stone-400">({student.age} {isMr ? 'वर्षे' : 'yrs'})</span>
                    </h3>
                    <p className="text-xs text-stone-600 font-medium flex items-center gap-1 mt-0.5 truncate">
                      <GraduationCap className="w-3.5 h-3.5 text-saath-600 shrink-0" />
                      <span className="truncate">{student.college.split(',')[0]}</span>
                    </p>
                    <p className="text-[11px] text-stone-500 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{student.area}, {student.city} • {student.distanceKm} km</span>
                    </p>
                  </div>

                  {/* Visual Activity Badges */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
                      {isMr ? 'प्रमुख कौशल्ये व आवडी:' : 'Key Hobbies & Activities:'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {student.interests.slice(0, 3).map((interest, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-orange-50 border border-orange-100 text-saath-800"
                        >
                          {interest === 'Chess' ? '♟️ बुद्धिबळ' :
                           interest === 'Technology Help' ? '📱 टेक मदत' :
                           interest === 'Walking' ? '🚶 प्रभातफेरी' :
                           interest === 'Music' ? '🎵 संगीत' :
                           interest === 'Reading' ? '📖 वाचन' :
                           interest === 'Gardening' ? '🌿 बागकाम' :
                           interest === 'Conversation' ? '☕ गप्पा' : interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages Spoken */}
                  <div className="text-[11px] text-stone-600 font-medium flex items-center gap-1.5 pt-1 border-t border-stone-100">
                    <span className="text-stone-400 font-bold">🗣️</span>
                    <span className="truncate">{student.languages.join(' • ')}</span>
                  </div>

                  {/* Availability Pill */}
                  <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">
                      {student.availability.map(a => a.day.slice(0, 3)).slice(0, 3).join(', ')} {isMr ? 'उपलब्ध' : 'available'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Direct Actions) */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onBookStudent && onBookStudent(student)}
                  className="bg-saath-600 hover:bg-saath-700 text-white font-black text-xs py-2.5 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>{isMr ? 'भेट बुक करा' : 'Book Visit'}</span>
                </button>

                <button
                  onClick={() => onSelectStudent && onSelectStudent(student)}
                  className="bg-stone-50 hover:bg-orange-50 text-stone-800 border border-stone-200 font-black text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-stone-600" />
                  <span>{isMr ? 'तपशील' : 'View Profile'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─── 4. THE CHALLENGE & IMPACT (Infographic Visuals) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-10 border border-stone-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-saath-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
              {isMr ? 'वास्तव व गरज' : 'THE REALITY & PURPOSE'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
              {isMr ? 'वय वाढणे म्हणजे एकटे पडणे नव्हे' : "Growing old shouldn't mean growing lonely"}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              {isMr
                ? 'भारतात लाखो ज्येष्ठ नागरिक एकटे राहतात. साथी ही मानवी आपुलकी, स्मार्ट आरोग्य ट्रॅकिंग आणि कुटुंबाला पारदर्शकता देणारी हक्काची व्यवस्था आहे.'
                : 'Restoring everyday joy through empathetic youth companionship, structured health check-ins, and continuous family reassurance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {challengeStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col items-center text-center space-y-2.5 hover:border-orange-300 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                  {stat.icon}
                </div>
                <strong className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
                  {stat.value}
                </strong>
                <h4 className="text-sm font-bold text-stone-900">
                  {isMr ? stat.metricMr : stat.metricEn}
                </h4>
                <p className="text-xs text-stone-500">
                  {isMr ? stat.subMr : stat.subEn}
                </p>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border mt-1 ${stat.trendColor}`}>
                  {stat.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. OUR CONNECTED ECOSYSTEM (4 Pillars - Concise Visuals) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-saath-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
            {isMr ? 'आपुलकीची व्यवस्था' : 'CONNECTED ECOSYSTEM'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
            {isMr ? 'ज्येष्ठांच्या सन्मानासाठी व आनंदासाठी संपूर्ण परिसंस्था' : 'Designed for Dignity, Connection & Joy'}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            {isMr
              ? 'केवळ सेवा नव्हे, तर आजी-आजोबांच्या जीवनात हक्काचा सखा, संवाद आणि कुटुंबाला मनःशांती.'
              : 'Multi-generational bonds, health visibility, and active social katas in one unified platform.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ecosystemPillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-3xl border border-stone-200 shadow-soft hover:shadow-card transition-all flex flex-col justify-between space-y-4 group hover:border-orange-300"
            >
              <div className="space-y-3">
                <span className="text-3xl block">{item.emoji}</span>
                <h3 className="text-base font-black text-stone-900 group-hover:text-saath-700 transition-colors">
                  {isMr ? item.titleMr : item.titleEn}
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {(isMr ? item.pointsMr : item.pointsEn).map((pt, pti) => (
                    <li key={pti} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
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

      {/* ─── 6. HEALTH & PEACE OF MIND (Live Wellness Indicators) ─── */}
      <section className="bg-white py-12 sm:py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-saath-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
              {isMr ? 'आरोग्य व मनःशांती' : 'HEALTH & PEACE OF MIND'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
              {isMr ? 'प्रत्येक भेटीत आरोग्याची व समाधानाची नोंद' : 'Connected Health & Daily Well-being'}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              {isMr
                ? 'नियमित आरोग्य मापदंड, वेळेवर औषध खात्री आणि भावनिक आनंदाचे पारदर्शक ट्रॅकिंग.'
                : 'Medical vitals logging, medication reminders, mood assessments delivered directly to children.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {wellnessFeatures.map(item => (
              <div
                key={item.id}
                className="bg-[#FAF9F6] p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-orange-300 transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-2xs">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-saath-800 border border-orange-200">
                      {isMr ? item.badgeMr : item.badgeEn}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-stone-900">
                      {isMr ? item.titleMr : item.titleEn}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-snug">
                      {isMr ? item.descMr : item.descEn}
                    </p>
                  </div>
                </div>

                {/* Metrics Pill Grid */}
                <div className="bg-white p-2.5 rounded-2xl border border-stone-200/90 space-y-1.5">
                  <div className="grid grid-cols-3 gap-1 text-center">
                    {item.metrics.map((m, mi) => (
                      <div key={mi} className={`p-1 rounded-lg border text-center ${m.color}`}>
                        <span className="text-[8px] font-black uppercase block opacity-80">{m.label}</span>
                        <span className="text-[11px] font-black block truncate">{m.val}</span>
                        <span className="text-[8px] font-bold block">{m.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 7. HOW IT WORKS TIMELINE (5 Clean Steps) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-saath-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
            {isMr ? 'सोपी कार्यपद्धती' : 'HOW IT WORKS'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
            {isMr ? 'पहिल्या फोनपासून पहिल्या भेटीपर्यंत' : 'From First Call to Regular Visits'}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            {isMr ? 'पारदर्शक आणि संवेदनशील प्रक्रिया — प्रत्येक टप्प्यावर आपले पालक सुरक्षित हातात.' : 'Simple, transparent, and empathetic every step of the way.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft flex flex-col space-y-2 hover:border-orange-400 transition-all text-center items-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-saath-600 text-white font-black text-sm flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                {step.step}
              </div>
              <span className="text-2xl pt-1">{step.icon}</span>
              <h3 className="text-xs font-black text-stone-900">
                {isMr ? step.titleMr : step.titleEn}
              </h3>
              <p className="text-[11px] text-stone-500 font-medium">
                {isMr ? step.subMr : step.subEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 8. CARE PLANS & PRICING (Modern Light Comparison Cards) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-saath-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
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
                  ? 'bg-gradient-to-b from-orange-50/80 via-white to-orange-50/30 border-2 border-saath-500 shadow-elevated scale-102 ring-4 ring-saath-400/20'
                  : 'bg-white border border-stone-200 shadow-soft hover:shadow-card hover:border-stone-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-saath-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-xs">
                  {isMr ? 'सर्वाधिक पसंती ⭐' : 'Most Popular ⭐'}
                </div>
              )}

              <div className="space-y-3">
                <span className="text-[11px] font-black uppercase tracking-wide text-saath-700 bg-orange-100 px-2.5 py-0.5 rounded-full inline-block">
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
                  className={`w-full py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
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

      {/* ─── 9. ECOSYSTEM FOOTER (Clean, Light Theme) ─── */}
      <footer className="border-t border-stone-200 bg-white pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* Brand column */}
            <div className="space-y-2.5 md:col-span-2">
              <SaathiLogo size="md" />
              <p className="text-xs text-stone-600 leading-relaxed max-w-md">
                {isMr
                  ? "भारतातील पहिली जोडलेली ज्येष्ठ संगोपन परिसंस्था. आपुलकीचे केअर मित्र, साथी नेटवर्क आणि रिअल-टाइम फॅमिली व्हिजिबिलिटी — एकाच विश्वासू वर्गणीत."
                  : "India's connected senior care ecosystem. Compassionate Care Mitras, Saathi companion network, and real-time family visibility."}
              </p>
              <p className="text-xs text-stone-500 font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-saath-600" />
                <span>{isMr ? 'कार्यक्षेत्र: कोल्हापूर • पुणे • सांगली • मुंबई • दिल्ली NCR' : 'Service Areas: Kolhapur • Pune • Sangli • Mumbai • Delhi NCR'}</span>
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
                    {isMr ? 'आमच्या सेवा (Companions)' : 'Find Companions'}
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
                    {isMr ? 'सुरक्षा धोरण व SOS' : 'Safety Center & SOS'}
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

          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-stone-500">
            <p>© {new Date().getFullYear()} साथी Saathi Eldercare Private Limited. All rights reserved.</p>
            <p className="italic font-bold text-saath-700">
              {isMr ? '“नातं विश्वासाचं, सोबती आपुलकीचा — साथी”' : '“A Bond of Trust, A Companion of Warmth — Saathi”'}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};
