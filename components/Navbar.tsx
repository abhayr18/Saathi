'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import {
  HeartHandshake,
  User,
  GraduationCap,
  Shield,
  Bell,
  RotateCcw,
  CheckCircle,
  Menu,
  X,
  Calendar,
  MessageSquare,
  ShieldAlert,
  Compass,
  DollarSign,
  Clock,
  Heart,
  FileText,
  Users,
  ChevronDown,
  Sparkles,
  Layers
} from 'lucide-react';
import { RoleSelectorModal } from './RoleSelectorModal';
import { SaathiLogo } from './SaathiLogo';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenRoleModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange, onOpenRoleModal }) => {
  const {
    role,
    language,
    toggleLanguage,
    switchRole,
    currentSenior,
    currentStudent,
    notifications,
    markNotificationAsRead,
    resetDemoData
  } = useApp();

  const isMr = language === 'mr';
  const [showNotifs, setShowNotifs] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalRoleModalOpen, setInternalRoleModalOpen] = useState(false);

  const openRoleModal = () => {
    if (onOpenRoleModal) {
      onOpenRoleModal();
    } else {
      setInternalRoleModalOpen(true);
    }
  };

  // Filter notifications for active user
  const activeUserId =
    role === 'senior'
      ? currentSenior.id
      : role === 'student'
      ? currentStudent.id
      : role === 'family'
      ? 'family-amit'
      : 'admin';

  const userNotifs = notifications.filter(n => n.userId === activeUserId || role === 'admin');
  const unreadCount = userNotifs.filter(n => !n.read).length;

  // Role info for header display
  const roleDisplayInfo = {
    senior: {
      emoji: '👴',
      titleMr: 'ज्येष्ठ',
      titleEn: 'Senior',
      fullNameMr: 'राजेंद्र कुलकर्णी',
      fullNameEn: 'Rajendra Kulkarni',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    student: {
      emoji: '🎓',
      titleMr: 'सोबती',
      titleEn: 'Companion',
      fullNameMr: 'आदित्य पाटील',
      fullNameEn: 'Aditya Patil',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    family: {
      emoji: '👨‍👩‍👧',
      titleMr: 'कुटुंब',
      titleEn: 'Family',
      fullNameMr: 'अमित कुलकर्णी',
      fullNameEn: 'Amit Kulkarni',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    admin: {
      emoji: '🛡️',
      titleMr: 'ॲडमिन',
      titleEn: 'Admin',
      fullNameMr: 'साथी कंट्रोल रूम',
      fullNameEn: 'Saathi Operations',
      badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
    },
  }[role];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
        {/* MaiHoonNa inspired streamlined Topbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* 1. Left: Official Saathi Logo Mark & Brand */}
            <div
              className="cursor-pointer shrink-0"
              onClick={() => onTabChange('landing')}
              role="button"
              tabIndex={0}
              aria-label="साथी Saathi Home"
            >
              <SaathiLogo size="md" />
            </div>

            {/* 2. Center: Desktop Navigation Links (Clean & MaiHoonNa inspired) */}
            <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
              {/* Home */}
              <button
                onClick={() => onTabChange('landing')}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all ${
                  currentTab === 'landing'
                    ? 'text-saath-600 font-black bg-orange-50/70'
                    : 'text-stone-600 hover:text-saath-600 hover:bg-stone-50'
                }`}
              >
                {isMr ? 'मुख्य पान' : 'Home'}
              </button>

              {/* Our Services / Companions */}
              <button
                onClick={() => onTabChange('discovery')}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all ${
                  currentTab === 'discovery'
                    ? 'text-saath-600 font-black bg-orange-50/70'
                    : 'text-stone-600 hover:text-saath-600 hover:bg-stone-50'
                }`}
              >
                {isMr ? 'सोबती शोधा' : 'Our Services'}
              </button>

              {/* Saathi Network / Social Katta */}
              <button
                onClick={() => onTabChange('activities')}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all ${
                  currentTab === 'activities'
                    ? 'text-saath-600 font-black bg-orange-50/70'
                    : 'text-stone-600 hover:text-saath-600 hover:bg-stone-50'
                }`}
              >
                {isMr ? 'साथी कट्टा' : 'Saathi Network'}
              </button>

              {/* Care Plans */}
              <button
                onClick={() => onTabChange('careplans')}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all ${
                  currentTab === 'careplans'
                    ? 'text-saath-600 font-black bg-orange-50/70'
                    : 'text-stone-600 hover:text-saath-600 hover:bg-stone-50'
                }`}
              >
                {isMr ? 'केअर प्लॅन्स' : 'Care Plans'}
              </button>

              {/* Role-Specific Direct Navigation */}
              {role === 'senior' && (
                <button
                  onClick={() => onTabChange('dashboard')}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all ${
                    currentTab === 'dashboard'
                      ? 'text-saath-600 font-black bg-orange-50/70'
                      : 'text-stone-600 hover:text-saath-600 hover:bg-stone-50'
                  }`}
                >
                  {isMr ? 'माझे डॅशबोर्ड' : 'Senior Dashboard'}
                </button>
              )}

              {role === 'student' && (
                <button
                  onClick={() => onTabChange('dashboard')}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all ${
                    currentTab === 'dashboard'
                      ? 'text-saath-600 font-black bg-orange-50/70'
                      : 'text-stone-600 hover:text-saath-600 hover:bg-stone-50'
                  }`}
                >
                  {isMr ? 'सोबती हब' : 'Companion Hub'}
                </button>
              )}

              {role === 'family' && (
                <button
                  onClick={() => onTabChange('familyHub')}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all ${
                    currentTab === 'familyHub'
                      ? 'text-saath-600 font-black bg-orange-50/70'
                      : 'text-stone-600 hover:text-saath-600 hover:bg-stone-50'
                  }`}
                >
                  {isMr ? 'कुटुंब हब' : 'Family Hub'}
                </button>
              )}

              {role === 'admin' && (
                <button
                  onClick={() => onTabChange('dashboard')}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all ${
                    currentTab === 'dashboard'
                      ? 'text-stone-900 font-black bg-stone-100'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  {isMr ? 'कंट्रोल रूम' : 'Admin Console'}
                </button>
              )}

              {/* Safety */}
              <button
                onClick={() => onTabChange('safety')}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all ${
                  currentTab === 'safety'
                    ? 'text-emerald-700 font-black bg-emerald-50'
                    : 'text-stone-600 hover:text-emerald-600 hover:bg-emerald-50/50'
                }`}
              >
                {isMr ? 'सुरक्षा' : 'Safety'}
              </button>
            </nav>

            {/* 3. Right: Unified Role Switcher Button + View Plans + Profile & Alerts */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              
              {/* MaiHoonNa Iconic 'View Plans' Pill Button */}
              <button
                onClick={() => onTabChange('careplans')}
                className={`hidden md:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-extrabold tracking-tight border transition-all ${
                  currentTab === 'careplans'
                    ? 'bg-saath-600 text-white border-saath-600 shadow-xs'
                    : 'bg-white text-stone-800 border-stone-300 hover:border-saath-500 hover:text-saath-700 hover:bg-orange-50/30'
                }`}
              >
                {isMr ? 'प्लॅन्स पहा' : 'View Plans'}
              </button>

              {/* THE REQUESTED ONE ROLE SWITCHER BUTTON */}
              <button
                onClick={openRoleModal}
                className={`px-3 sm:px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 border shadow-xs ${roleDisplayInfo.badgeColor} hover:brightness-95 hover:shadow-sm active:scale-98`}
                title={isMr ? 'भूमिका बदलण्यासाठी येथे क्लिक करा' : 'Click to switch role perspective'}
                aria-label="Switch Role Perspective"
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg leading-none">{roleDisplayInfo.emoji}</span>
                  <span className="hidden sm:inline font-semibold text-stone-600 text-[11px]">
                    {isMr ? 'भूमिका:' : 'Role:'}
                  </span>
                  <span className="font-black text-stone-900 text-xs">
                    {isMr ? roleDisplayInfo.titleMr : roleDisplayInfo.titleEn}
                  </span>
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {/* Notification Alerts Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifs(!showNotifs)}
                  className="relative p-2 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-saath-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifs && (
                  <div className="absolute right-0 mt-3 w-80 max-w-sm bg-white rounded-2xl shadow-elevated border border-stone-200 p-4 z-50 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                      <h3 className="font-bold text-stone-900 text-sm">Alerts & Real-Time Updates</h3>
                      <span className="text-[11px] text-stone-400 font-medium">
                        {userNotifs.length} total
                      </span>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-stone-100 mt-2">
                      {userNotifs.length === 0 ? (
                        <p className="text-stone-500 text-xs py-4 text-center">No alerts for current role</p>
                      ) : (
                        userNotifs.map(n => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationAsRead(n.id)}
                            className={`py-2.5 px-2 rounded-xl transition-colors cursor-pointer ${
                              !n.read ? 'bg-orange-50/60' : 'hover:bg-stone-50'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-xs font-bold text-stone-900">{n.title}</h4>
                              <span className="text-[10px] text-stone-400 shrink-0">{n.timestamp}</span>
                            </div>
                            <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Language Switcher Pill (Quick ENG / मराठी) */}
              <button
                onClick={toggleLanguage}
                title={isMr ? 'Switch to English' : 'मराठीत बदला'}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors"
              >
                <span>🌐</span>
                <span>{isMr ? 'ENG' : 'मराठी'}</span>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
            {/* Quick Role Status Bar in Mobile Menu */}
            <div className="p-3 rounded-2xl bg-orange-50/70 border border-orange-200 flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{roleDisplayInfo.emoji}</span>
                <div>
                  <p className="text-xs font-bold text-stone-900">
                    {isMr ? roleDisplayInfo.fullNameMr : roleDisplayInfo.fullNameEn}
                  </p>
                  <p className="text-[10px] text-stone-500">
                    {isMr ? 'सक्रिय दृष्टिकोन' : 'Active Perspective'}: {isMr ? roleDisplayInfo.titleMr : roleDisplayInfo.titleEn}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRoleModal();
                }}
                className="px-3 py-1 rounded-xl text-xs font-bold bg-saath-600 text-white shadow-xs"
              >
                {isMr ? 'रोल बदला' : 'Switch Role'}
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-1">
              <button
                onClick={() => { onTabChange('landing'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center gap-2.5 ${
                  currentTab === 'landing' ? 'bg-orange-50 text-saath-700' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>🏠</span>
                <span>{isMr ? 'मुख्य पान (Home)' : 'Home'}</span>
              </button>

              <button
                onClick={() => { onTabChange('discovery'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center gap-2.5 ${
                  currentTab === 'discovery' ? 'bg-orange-50 text-saath-700' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Compass className="w-4 h-4 text-saath-600" />
                <span>{isMr ? 'सोबती शोधा' : 'Our Services'}</span>
              </button>

              <button
                onClick={() => { onTabChange('activities'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center gap-2.5 ${
                  currentTab === 'activities' ? 'bg-orange-50 text-saath-700' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Users className="w-4 h-4 text-saath-600" />
                <span>{isMr ? 'साथी कट्टा' : 'Saathi Network'}</span>
              </button>

              <button
                onClick={() => { onTabChange('careplans'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center gap-2.5 ${
                  currentTab === 'careplans' ? 'bg-orange-50 text-saath-700' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Calendar className="w-4 h-4 text-saath-600" />
                <span>{isMr ? 'केअर प्लॅन्स' : 'Care Plans'}</span>
              </button>

              {role === 'senior' && (
                <button
                  onClick={() => { onTabChange('dashboard'); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center gap-2.5 ${
                    currentTab === 'dashboard' ? 'bg-orange-50 text-saath-700' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <User className="w-4 h-4 text-saath-600" />
                  <span>{isMr ? 'माझे डॅशबोर्ड' : 'Senior Dashboard'}</span>
                </button>
              )}

              {role === 'student' && (
                <button
                  onClick={() => { onTabChange('dashboard'); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center gap-2.5 ${
                    currentTab === 'dashboard' ? 'bg-orange-50 text-saath-700' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>{isMr ? 'सोबती हब' : 'Companion Hub'}</span>
                </button>
              )}

              {role === 'family' && (
                <button
                  onClick={() => { onTabChange('familyHub'); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center gap-2.5 ${
                    currentTab === 'familyHub' ? 'bg-orange-50 text-saath-700' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>{isMr ? 'कुटुंब हब' : 'Family Hub'}</span>
                </button>
              )}

              {role === 'admin' && (
                <button
                  onClick={() => { onTabChange('dashboard'); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center gap-2.5 ${
                    currentTab === 'dashboard' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span>{isMr ? 'ॲडमिन कंट्रोल रूम' : 'Admin Console'}</span>
                </button>
              )}

              <button
                onClick={() => { onTabChange('safety'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center gap-2.5 ${
                  currentTab === 'safety' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-emerald-600" />
                <span>{isMr ? 'सुरक्षा व आपत्कालीन SOS' : 'Safety & Emergency SOS'}</span>
              </button>
            </div>

            {/* Mobile Footer Toggle */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-stone-100 text-stone-800 flex items-center gap-1.5"
              >
                <span>🌐</span>
                <span>{isMr ? 'Switch to English' : 'मराठीत पहा'}</span>
              </button>

              <button
                onClick={resetDemoData}
                className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                title="Reset demo data"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Internal Role Selector Modal fallback */}
      <RoleSelectorModal
        isOpen={internalRoleModalOpen}
        onClose={() => setInternalRoleModalOpen(false)}
        onNavigateTab={onTabChange}
      />
    </>
  );
};
