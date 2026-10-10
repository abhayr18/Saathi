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
  const { currentSenior, subscribeCarePlan, showToast, language } = useApp();
  const isMr = language === 'mr';

  const handleSubscribe = (name: string, cost: number, visits: number) => {
    subscribeCarePlan({
      seniorId: currentSenior.id,
      seniorName: currentSenior.name,
      sponsorName: isMr ? 'अमित कुलकर्णी (मुलगा, बेंगळुरू)' : 'Amit Kulkarni (Son in Bangalore)',
      model: isMr ? 'मॉडेल २ (मासिक केअर प्लॅन)' : 'Model 2 (Monthly Plan)',
      planName: name,
      monthlyCost: cost,
      visitsPerMonth: visits,
      nextScheduledVisit: isMr ? 'मंगळवार, संध्याकाळी ५:००' : 'Tuesday, Oct 6 • 5:00 PM',
      primaryCompanionName: isMr ? 'आदित्य पाटील' : 'Aditya Patil',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-saath-700 bg-saath-100 px-3.5 py-1 rounded-full border border-saath-200">
          {isMr ? 'लवचिक सोबती व कुटुंब सुरक्षा मॉडेल' : 'Flexible Companionship & Support Models'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
          {isMr ? 'आपुलकीचे सोबती व परिवार मनःशांती प्लॅन्स' : 'Companionship & Family Visibility Plans'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {isMr
            ? 'स्वावलंबी ज्येष्ठ नागरिकांसाठी आणि परगावी राहणाऱ्या मुलांच्या मनातील काळजी दूर करण्यासाठी खास तयार केलेले सुरक्षित प्लॅन्स.'
            : 'Flexible service models designed for seniors living independently and families seeking consistent care and peace of mind from anywhere.'}
        </p>
      </div>

      {/* Model 1 & 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Model 1: On-Demand */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-stone-200 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              {isMr ? 'मॉडेल १: तासिका भेट' : 'Model 1: Pay-Per-Visit'}
            </span>
            <h3 className="text-2xl font-black text-stone-900 font-display">
              {isMr ? 'ऑन-डिमांड तासिका भेट' : 'On-Demand Visit'}
            </h3>
            <p className="text-xs text-stone-500">
              {isMr
                ? 'कधीतरी बुद्धिबळ खेळणे, स्मार्टफोन शिकणे किंवा सण-उत्सवाच्या खरेदीसाठी सोबत.'
                : 'Ideal for occasional chess games, technology guidance, or festival companion visits.'}
            </p>

            <div className="pt-2">
              <span className="text-3xl font-black text-stone-900">₹150</span>
              <span className="text-xs font-medium text-stone-500"> / {isMr ? 'तास' : 'hour'}</span>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isMr ? 'कोणताही पडताळणी झालेला सोबती निवडा' : 'Choose any verified student companion'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isMr ? 'घर, पार्क किंवा व्हिडिओ कॉल सत्र' : 'Home, park, or video call sessions'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isMr ? 'सोपी व त्वरित बुकिंग पद्धती' : 'Instant easy checkout'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isMr ? 'भेटीनंतर कुटुंबाला संक्षिप्त अपडेट' : 'Visit completed family update'}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onBookOnDemand}
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-xl text-xs transition-colors"
          >
            {isMr ? 'एकल तासिका भेट शोधा व बुक करा' : 'Find & Book Single Visit'}
          </button>
        </div>

        {/* Model 2A: Silver Monthly */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-stone-200 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-saath-700 uppercase tracking-wider block">
              {isMr ? 'मॉडेल २: मासिक केअर प्लॅन' : 'Model 2: Monthly Care Plan'}
            </span>
            <h3 className="text-2xl font-black text-stone-900 font-display">
              {isMr ? 'सावली साथी (४ भेटी)' : 'Silver Saath (4 Visits)'}
            </h3>
            <p className="text-xs text-stone-500">
              {isMr
                ? 'आठवड्यातून १ नियोजित भेट — आपुलकीचा नियमित संवाद आणि छंदांची सोबत.'
                : '1 scheduled visit every week for consistent human touch and shared hobbies.'}
            </p>

            <div className="pt-2">
              <span className="text-3xl font-black text-saath-700">₹599</span>
              <span className="text-xs font-medium text-stone-500"> / {isMr ? 'महिना' : 'month'}</span>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isMr ? 'महिन्यात ४ निश्चित १:१ भेटी' : '4 In-person quality time sessions / mo'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isMr ? 'भेटींच्या दरम्यान साप्ताहिक फोन चेक-इन' : 'Weekly phone check-in between visits'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isMr ? 'कुटुंबासाठी ॲपवर निरीक्षण अहवाल' : 'Family Observation Reports on app'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isMr ? 'ठरलेला एकच मुख्य सोबती' : 'Dedicated primary student buddy'}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSubscribe(isMr ? 'सावली साथी — ४ भेटी / महिना' : 'Silver Saath — 4 Visits / Month', 599, 4)}
            className="w-full bg-saath-600 hover:bg-saath-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-xs"
          >
            {isMr ? 'सावली प्लॅन सुरू करा (₹५९९)' : 'Sponsor Silver Plan (₹599)'}
          </button>
        </div>

        {/* Model 2B: Gold Monthly (Most Popular) */}
        <div className="bg-white text-stone-900 rounded-3xl p-6 sm:p-8 shadow-elevated border-2 border-saath-500 flex flex-col justify-between space-y-6 relative">
          <span className="absolute -top-3 right-6 bg-saath-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-xs">
            {isMr ? 'कुटुंबांची पहिली पसंती ⭐' : 'Recommended by Families ⭐'}
          </span>

          <div className="space-y-4">
            <span className="text-xs font-bold text-saath-700 uppercase tracking-wider block">
              {isMr ? 'मॉडेल २ व ३: संपूर्ण परिवार सुरक्षा' : 'Model 2 & 3: Comprehensive Care'}
            </span>
            <h3 className="text-2xl font-black text-stone-900 font-display">
              {isMr ? 'परिवार सुरक्षा (८ भेटी)' : 'Gold Saath (8 Visits)'}
            </h3>
            <p className="text-xs text-stone-600">
              {isMr
                ? 'आठवड्यातून २ भेटी. परगावी किंवा परदेशात राहणाऱ्या मुलांसाठी संपूर्ण मनःशांती.'
                : '2 visits per week. Complete peace of mind for children living in another city or abroad.'}
            </p>

            <div className="pt-2">
              <span className="text-3xl font-black text-saath-700">₹1,199</span>
              <span className="text-xs font-medium text-stone-500"> / {isMr ? 'महिना' : 'month'}</span>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isMr ? 'महिन्यात ८ सविस्तर भेटी (आठवड्यातून २)' : '8 Bi-weekly companionship visits'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isMr ? 'Know My Normal आरोग्य व मूड ट्रॅकिंग' : 'Know My Normal baseline tracking'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isMr ? 'मुलांना व्हॉट्सॲप समरी अलर्ट' : 'WhatsApp dispatches to son/daughter'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isMr ? '२४x७ इमर्जन्सी हेल्पलाइन सहाय्य' : 'Emergency coordination support'}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSubscribe(isMr ? 'परिवार सुरक्षा — ८ भेटी / महिना' : 'Gold Saath — 8 Visits / Month (Bi-Weekly)', 1199, 8)}
            className="w-full bg-saath-600 hover:bg-saath-700 text-white font-black py-3 rounded-xl text-xs transition-colors shadow-xs"
          >
            {isMr ? 'परिवार सुरक्षा प्लॅन सुरू करा (₹१,१९९)' : 'Sponsor Gold Plan (₹1,199)'}
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
              <span className="text-[11px] font-bold text-stone-500 uppercase">{isMr ? 'मॉडेल ३' : 'Model 3'}</span>
              <h4 className="text-lg font-bold text-stone-900">{isMr ? 'कुटुंब-नियंत्रित रिमोट केअर हब' : 'Family-Managed Remote Care Hub'}</h4>
            </div>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isMr
              ? 'बेंगळुरू, मुंबई किंवा परदेशात राहणाऱ्या मुलांना आपल्या वृद्ध आई-वडिलांच्या आरोग्याची आणि भावनिक समाधानाची थेट माहिती ठेवण्याची सुविधा.'
              : "Allows children living in Bangalore, Mumbai, or overseas to oversee elderly parents' emotional wellbeing with structured observation reports, routine assistance, and proactive notifications."}
          </p>
        </div>

        {/* Model 4 B2B */}
        <div className="bg-stone-50 p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              🏥
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase">{isMr ? 'मॉडेल ४' : 'Model 4'}</span>
              <h4 className="text-lg font-bold text-stone-900">{isMr ? 'संस्थात्मक व हॉस्पिटल भागीदारी मॉडेल' : 'Institutional & Partner Model'}</h4>
            </div>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isMr
              ? 'हॉस्पिटल्स (डिस्चार्जनंतर सोबती), कॉर्पोरेट कंपन्या (कर्मचाऱ्यांच्या पालकांसाठी वेलनेस) आणि ज्येष्ठ नागरिक गृह प्रकल्पांसाठी एकत्रित सेवा.'
              : 'Partnership integration for Hospitals (post-discharge non-clinical companionship), Companies (employee parent-care wellness benefit), and Senior Living Communities.'}
          </p>
        </div>
      </div>
    </div>
  );
};
