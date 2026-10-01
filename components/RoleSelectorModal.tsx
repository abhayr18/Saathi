'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import {
  X,
  Check,
  Shield,
  Heart,
  GraduationCap,
  User,
  Compass,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface RoleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const RoleSelectorModal: React.FC<RoleSelectorModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const { role, switchRole, language, toggleLanguage, resetDemoData, showToast } = useApp();
  const isMr = language === 'mr';

  if (!isOpen) return null;

  interface RoleConfig {
    id: UserRole;
    defaultTab: string;
    icon: string;
    photo: string;
    lucideIcon: React.ReactNode;
    titleMr: string;
    titleEn: string;
    personNameMr: string;
    personNameEn: string;
    subtitleMr: string;
    subtitleEn: string;
    descriptionMr: string;
    descriptionEn: string;
    featuresMr: string[];
    featuresEn: string[];
    tagMr: string;
    tagEn: string;
    themeGradient: string;
    accentBorder: string;
    badgeStyle: string;
  }

  const rolesList: RoleConfig[] = [
    {
      id: 'senior',
      defaultTab: 'discovery',
      icon: '👴',
      photo: '/assets/senior_rajendra.jpg',
      lucideIcon: <User className="w-5 h-5 text-orange-600" />,
      titleMr: 'ज्येष्ठ नागरिक',
      titleEn: 'Senior Citizen',
      personNameMr: 'राजेंद्र कुलकर्णी (वय ६८, कोल्हापूर)',
      personNameEn: 'Rajendra Kulkarni (Age 68, Kolhapur)',
      subtitleMr: 'सेवेचे मुख्य लाभार्थी',
      subtitleEn: 'Primary Care Recipient',
      descriptionMr: 'बुद्धिबळ, मॉर्निंग वॉक, वाचन आणि स्मार्टफोन शिकण्यासाठी तरुण सोबती शोधत असलेले आजी-आजोबा.',
      descriptionEn: 'Independent senior seeking warmth, unhurried conversations, tea time, chess, and tech help.',
      featuresMr: [
        'पडताळणी झालेले सोबती शोधा व १:१ भेट बुक करा',
        'सामाजिक कट्टा व हास्य क्लबमध्ये सहभागी व्हा',
        'तात्काळ इमर्जन्सी SOS आणि सुरक्षितता बटण',
        'आरोग्य आणि भेटींचा इतिहास पहा',
      ],
      featuresEn: [
        'Browse vetted companions & book 1:1 sessions',
        'Explore Social Katta, chess & gardening clubs',
        'One-touch Emergency SOS assistance',
        'View upcoming scheduled visits & companion ratings',
      ],
      tagMr: 'ज्येष्ठ दृष्टिकोन',
      tagEn: 'Senior Perspective',
      themeGradient: 'from-orange-500/10 to-amber-500/10 hover:border-orange-400',
      accentBorder: 'border-orange-200',
      badgeStyle: 'bg-orange-100 text-orange-800 border-orange-200',
    },
    {
      id: 'student',
      defaultTab: 'dashboard',
      icon: '🎓',
      photo: '/assets/student_aditya.jpg',
      lucideIcon: <GraduationCap className="w-5 h-5 text-blue-600" />,
      titleMr: 'कॉलेज सोबती / केअर मित्र',
      titleEn: 'Student Companion (Care Mitra)',
      personNameMr: 'आदित्य पाटील (वय २१, इंजिनिअरिंग)',
      personNameEn: 'Aditya Patil (Age 21, Engineering Student)',
      subtitleMr: 'प्रशिक्षित व पडताळणी झालेला तरुण',
      subtitleEn: 'Vetted College Youth',
      descriptionMr: 'फावल्या वेळेत ज्येष्ठांना सोबत करून स्वाभिमानाने कॉलेज मानधन कमावणारा संवेदनशील तरुण.',
      descriptionEn: 'Empathetic college student earning a dignified stipend while sharing companionship with elders.',
      featuresMr: [
        'आपल्या कॉलेज वेळेनुसार उपलब्ध स्लॉट्स निश्चित करा',
        'ज्येष्ठांच्या भेटींचे आमंत्रण स्वीकारा / व्यवस्थापित करा',
        'भेटीनंतर "Know My Normal" मूड व आरोग्य रिपोर्ट नोंदवा',
        'पारदर्शक मानधन व बँक खात्यात थेट जमा पहा',
      ],
      featuresEn: [
        'Set custom weekly availability around college schedule',
        'Accept & manage scheduled senior visit sessions',
        'Submit Know-My-Normal mood & vitals observation logs',
        'Track student stipend earnings & verified payout history',
      ],
      tagMr: 'सोबती दृष्टिकोन',
      tagEn: 'Companion Perspective',
      themeGradient: 'from-blue-500/10 to-indigo-500/10 hover:border-blue-400',
      accentBorder: 'border-blue-200',
      badgeStyle: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      id: 'family',
      defaultTab: 'familyHub',
      icon: '👨‍👩‍👧',
      photo: '/assets/family_amit.jpg',
      lucideIcon: <Heart className="w-5 h-5 text-rose-600" />,
      titleMr: 'दूर राहणारे कुटुंब (Family)',
      titleEn: 'Outstation Family / NRI Children',
      personNameMr: 'अमित कुलकर्णी (मुलगा, बेंगळुरू IT)',
      personNameEn: 'Amit Kulkarni (Son, Tech Lead in Bangalore)',
      subtitleMr: 'आई-वडिलांच्या आरोग्याची काळजी घेणारे मुले',
      subtitleEn: 'Caring Adult Children Out of Town',
      descriptionMr: 'कामासाठी दुसऱ्या शहरात किंवा परदेशात राहणारे मुले, ज्यांना पालकांच्या काळजीसाठी रिअल-टाइम माहिती हवी आहे.',
      descriptionEn: 'Working professionals away from parents needing continuous health visibility and peace of mind.',
      featuresMr: [
        'प्रत्येक भेटीचे रिअल-टाइम व्हॉट्सॲप व ॲप अपडेट्स',
        'लाईव्ह हॅपीनेस स्कोअर आणि मूड ट्रेंड ग्राफ',
        'सावली व परिवार सुरक्षा केअर प्लॅनचे व्यवस्थापन',
        'सोबतीशी थेट चॅट आणि विशेष सूचना देणे',
      ],
      featuresEn: [
        'Instant WhatsApp & dashboard alerts after every visit',
        'Live Happiness Score, vitals logs & weekly trends',
        'Manage recurring Care Plan subscriptions',
        'Direct chat with primary Care Mitra for family instructions',
      ],
      tagMr: 'कुटुंब दृष्टिकोन',
      tagEn: 'Family Perspective',
      themeGradient: 'from-emerald-500/10 to-teal-500/10 hover:border-emerald-400',
      accentBorder: 'border-emerald-200',
      badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'admin',
      defaultTab: 'dashboard',
      icon: '🛡️',
      photo: '/assets/admin_officer.jpg',
      lucideIcon: <Shield className="w-5 h-5 text-amber-600" />,
      titleMr: 'ॲडमिन व सुरक्षा कंट्रोल रूम',
      titleEn: 'Trust & Safety Admin',
      personNameMr: 'साथी पडताळणी व ऑपरेशन्स टीम',
      personNameEn: 'Saathi Operations & Safety Console',
      subtitleMr: 'प्लॅटफॉर्म व्यवस्थापन व नियंत्रण कक्ष',
      subtitleEn: 'Platform Oversight & Dispatch',
      descriptionMr: 'कॉलेज विद्यार्थ्यांची आयडी पडताळणी, जिओ-फेन्सिंग ऑडिट आणि इमर्जन्सी हेल्पलाइन सांभाळणारी टीम.',
      descriptionEn: 'Central team managing college ID vetting, geo-fenced visit compliance, and SOS escalations.',
      featuresMr: [
        'कॉलेज विद्यार्थ्यांचे आयडी व चारित्र्य पडताळणी',
        'जिओ-फेन्स चेक-इन व रिअल-टाइम सेशन ऑडिट',
        'झिरो-कॅश व झिरो-ओटीपी आर्थिक सुरक्षा नियमन',
        '२४x७ इमर्जन्सी SOS ट्रॅकिंग व कॉल डिस्पॅच',
      ],
      featuresEn: [
        'Review pending college companion ID verification queues',
        'Audit geo-fenced check-in timestamps & encounter logs',
        'Enforce zero-cash & zero-OTP elder security protocols',
        '24/7 SOS alert console with instant family notification',
      ],
      tagMr: 'सुरक्षा दृष्टिकोन',
      tagEn: 'Admin Perspective',
      themeGradient: 'from-stone-500/10 to-slate-500/10 hover:border-stone-400',
      accentBorder: 'border-stone-200',
      badgeStyle: 'bg-stone-200 text-stone-800 border-stone-300',
    },
  ];

  const handleSelect = (item: RoleConfig) => {
    switchRole(item.id);
    if (onNavigateTab) {
      onNavigateTab(item.defaultTab);
    }
    showToast(
      isMr
        ? `भूमिका बदलली: ${item.titleMr}`
        : `Switched perspective to: ${item.titleEn}`
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-stone-950/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-5 border-b border-stone-200/80 bg-gradient-to-r from-orange-50/60 via-white to-amber-50/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-saath-500 to-amber-500 text-white flex items-center justify-center shadow-md shadow-saath-500/20 text-base sm:text-xl font-bold shrink-0">
              🎭
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h2 className="text-base sm:text-2xl font-black text-stone-900 font-display">
                  {isMr ? 'डेमो भूमिका निवडा' : 'Select Demo Perspective'}
                </h2>
                <span className="bg-orange-100 text-saath-800 text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full border border-orange-200">
                  Interactive Demo
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-1 sm:line-clamp-none mt-0.5">
                {isMr
                  ? 'प्लॅटफॉर्मचा अनुभव कोणत्याही भूमिकेतून घ्या — संबंधित डॅशबोर्ड व फीचर्स त्वरित लोड होतील.'
                  : 'Experience Saathi from any stakeholder viewpoint to test features and simulated real-time logs.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - 4 Role Cards Grid */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4 max-h-[calc(92vh-125px)] sm:max-h-[calc(92vh-150px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {rolesList.map(item => {
              const isActive = role === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`relative p-3.5 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-card bg-gradient-to-b ${
                    item.themeGradient
                  } ${
                    isActive
                      ? 'border-saath-600 bg-orange-50/50 ring-2 ring-saath-500/30'
                      : 'border-stone-200 bg-white hover:bg-stone-50/80'
                  }`}
                >
                  {/* Active Indicator Badge */}
                  {isActive && (
                    <div className="absolute top-3 right-3 bg-saath-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                      <span>{isMr ? 'सक्रिय' : 'Active'}</span>
                    </div>
                  )}

                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Role Header */}
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      {/* Strictly constrained avatar container */}
                      <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-stone-100 border-2 border-white shadow-xs">
                        <img
                          src={item.photo}
                          alt={item.personNameEn}
                          className="w-full h-full object-cover"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <span className="absolute bottom-0 right-0 text-[10px] bg-white/95 rounded-tl-md px-1 py-0.5 shadow-2xs">
                          {item.icon}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 pr-10 sm:pr-14">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-saath-700 transition-colors truncate">
                            {isMr ? item.titleMr : item.titleEn}
                          </h3>
                        </div>
                        <p className="text-xs font-semibold text-stone-700 truncate mt-0.5">
                          {isMr ? item.personNameMr : item.personNameEn}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-stone-500 truncate">{isMr ? item.subtitleMr : item.subtitleEn}</p>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed bg-white/70 p-2 sm:p-2.5 rounded-xl border border-stone-100">
                      {isMr ? item.descriptionMr : item.descriptionEn}
                    </p>

                    {/* Feature Highlights */}
                    <div className="space-y-1 pt-0.5">
                      <span className="text-[9px] sm:text-[10px] font-extrabold text-stone-400 uppercase tracking-wider block">
                        {isMr ? 'या भूमिकेतील मुख्य सुविधा:' : 'What you can explore:'}
                      </span>
                      <ul className="space-y-1 text-xs text-stone-700">
                        {(isMr ? item.featuresMr : item.featuresEn).map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5 sm:gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-saath-500 shrink-0"></span>
                            <span className="text-[11px] leading-tight text-stone-600">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Switch CTA button */}
                  <div className="pt-3 mt-2.5 sm:pt-4 sm:mt-3 border-t border-stone-200/60 flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${item.badgeStyle}`}>
                      {isMr ? item.tagMr : item.tagEn}
                    </span>

                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-2xs shrink-0 ${
                        isActive
                          ? 'bg-saath-600 text-white font-black'
                          : 'bg-white border border-stone-300 text-stone-800 group-hover:bg-saath-600 group-hover:text-white group-hover:border-saath-600'
                      }`}
                    >
                      <span>
                        {isActive
                          ? isMr
                            ? 'सुरू आहे ✓'
                            : 'Active ✓'
                          : isMr
                          ? 'निवडा'
                          : 'Switch'}
                      </span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer Controls (Language Toggle & Reset Data) */}
        <div className="px-3.5 py-2.5 sm:px-6 sm:py-3.5 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-stone-500 font-medium text-[11px] sm:text-xs hidden sm:inline">
              {isMr ? 'भाषा बदला:' : 'Toggle Language:'}
            </span>
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-bold bg-white border border-stone-300 text-stone-800 hover:border-saath-500 hover:text-saath-700 transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <span>🌐</span>
              <span>{isMr ? 'English' : 'मराठीत पहा'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                resetDemoData();
                showToast(isMr ? 'डेमो डेटा मूळ स्थितीत आणला' : 'Demo data reset to initial state');
                onClose();
              }}
              className="px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 hover:border-stone-300 transition-colors flex items-center gap-1 shadow-2xs"
            >
              <RotateCcw className="w-3 h-3 text-stone-500" />
              <span>{isMr ? 'रीसेट डेटा' : 'Reset'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-3 py-1 rounded-xl text-[11px] sm:text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 transition-colors"
            >
              {isMr ? 'बंद करा' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
