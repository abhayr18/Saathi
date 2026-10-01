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
  Users
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange }) => {
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Light & High-Contrast Demo Perspective Switcher Quick Bar */}
      <div className="bg-[#FAF5EF] text-stone-800 text-xs px-3 sm:px-4 py-2 flex items-center justify-between gap-2 border-b border-orange-200/70 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="font-extrabold text-saath-700 uppercase tracking-wider text-[10px] sm:text-[11px] flex items-center gap-1.5 bg-orange-100/90 px-2 py-0.5 rounded-full border border-orange-200">
            <span className="w-2 h-2 rounded-full bg-saath-600 animate-pulse"></span>
            <span>{isMr ? 'डेमो भूमिका' : 'Demo Perspective'}</span>
          </span>
          <span className="hidden md:inline text-stone-500 font-medium">
            {isMr ? 'पडताळणीसाठी रोल बदला:' : 'Switch viewpoint:'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Senior Role */}
          <button
            onClick={() => { switchRole('senior'); onTabChange('dashboard'); }}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs ${
              role === 'senior'
                ? 'bg-saath-600 text-white shadow-xs font-bold ring-2 ring-saath-400/40'
                : 'bg-white text-stone-700 hover:bg-orange-50/50 border border-stone-200'
            }`}
          >
            <span>👴</span>
            <span>{isMr ? 'ज्येष्ठ (राजेंद्र)' : 'Senior (Rajendra)'}</span>
          </button>

          {/* Student Companion Role */}
          <button
            onClick={() => { switchRole('student'); onTabChange('dashboard'); }}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs ${
              role === 'student'
                ? 'bg-saath-600 text-white shadow-xs font-bold ring-2 ring-saath-400/40'
                : 'bg-white text-stone-700 hover:bg-orange-50/50 border border-stone-200'
            }`}
          >
            <span>🎓</span>
            <span>{isMr ? 'सोबती (आदित्य)' : 'Companion (Aditya)'}</span>
          </button>

          {/* Family Member Role */}
          <button
            onClick={() => { switchRole('family'); onTabChange('familyHub'); }}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs ${
              role === 'family'
                ? 'bg-saath-600 text-white shadow-xs font-bold ring-2 ring-saath-400/40'
                : 'bg-white text-stone-700 hover:bg-orange-50/50 border border-stone-200'
            }`}
          >
            <span>👨‍👩‍👧</span>
            <span>{isMr ? 'कुटुंब (अमित)' : 'Family (Amit)'}</span>
          </button>

          {/* Admin Role */}
          <button
            onClick={() => { switchRole('admin'); onTabChange('dashboard'); }}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs ${
              role === 'admin'
                ? 'bg-stone-900 text-white shadow-xs font-bold ring-2 ring-stone-400/40'
                : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span>{isMr ? 'ॲडमिन' : 'Admin'}</span>
          </button>

          {/* Language Switcher Pill */}
          <button
            onClick={toggleLanguage}
            title={isMr ? 'Switch to English' : 'मराठीत बदला'}
            className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-white border border-stone-300 text-stone-800 hover:border-saath-400 hover:bg-orange-50 transition-all ml-1 shadow-2xs flex items-center gap-1"
          >
            <span>🌐</span>
            <span>{isMr ? 'ENG' : 'मराठी'}</span>
          </button>

          {/* Reset Demo State Button */}
          <button
            onClick={resetDemoData}
            title={isMr ? 'डेमो डेटा मूळ स्थितीत आणा' : 'Reset demo data to initial state'}
            className="p-1 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-white border border-transparent hover:border-stone-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('landing')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-saath-600 to-amber-500 text-white flex items-center justify-center shadow-md shadow-saath-500/20">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-stone-900 font-display">
                  साथी <span className="text-saath-600 font-sans">Saath</span>
                </span>
                <span className="bg-saath-100 text-saath-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-saath-200">
                  Prototype
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium hidden lg:block">
                We give seniors companionship — and give their families visibility & peace of mind.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onTabChange('landing')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'landing'
                  ? 'bg-stone-100 text-stone-900 font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {isMr ? 'मुख्य पान' : 'Home'}
            </button>

            {/* Senior Links */}
            {role === 'senior' && (
              <>
                <button
                  onClick={() => onTabChange('dashboard')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === 'dashboard'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  {isMr ? 'माझे डॅशबोर्ड' : 'My Dashboard'}
                </button>
                <button
                  onClick={() => onTabChange('discovery')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'discovery'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Compass className="w-4 h-4 text-saath-600" />
                  <span>{isMr ? 'सोबती शोधा' : 'Find Companion'}</span>
                </button>
                <button
                  onClick={() => onTabChange('activities')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'activities'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Users className="w-4 h-4 text-saath-600" />
                  <span>{isMr ? 'सामाजिक कट्टा' : 'Social Katta'}</span>
                </button>
                <button
                  onClick={() => onTabChange('careplans')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'careplans'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-saath-600" />
                  <span>{isMr ? 'केअर प्लॅन्स' : 'Care Plans'}</span>
                </button>
                <button
                  onClick={() => onTabChange('bookings')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'bookings'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <span>{isMr ? 'माझ्या भेटी' : 'My Bookings'}</span>
                </button>
                <button
                  onClick={() => onTabChange('messages')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'messages'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-saath-600" />
                  <span>{isMr ? 'संदेश' : 'Messages'}</span>
                </button>
                <button
                  onClick={() => onTabChange('safety')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'safety'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? 'सुरक्षा' : 'Safety'}</span>
                </button>
              </>
            )}

            {/* Student Companion Links */}
            {role === 'student' && (
              <>
                <button
                  onClick={() => onTabChange('dashboard')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === 'dashboard'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  {isMr ? 'सोबती हब' : 'Companion Hub'}
                </button>
                <button
                  onClick={() => onTabChange('activities')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'activities'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Users className="w-4 h-4 text-saath-600" />
                  <span>{isMr ? 'सामाजिक कट्टा' : 'Social Katta'}</span>
                </button>
                <button
                  onClick={() => onTabChange('availability')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'availability'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Clock className="w-4 h-4 text-saath-600" />
                  <span>{isMr ? 'माझी उपलब्धता' : 'Availability'}</span>
                </button>
                <button
                  onClick={() => onTabChange('earnings')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'earnings'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <DollarSign className="w-4 h-4 text-saath-600" />
                  <span>{isMr ? 'मानधन' : 'Earnings'}</span>
                </button>
                <button
                  onClick={() => onTabChange('messages')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'messages'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-saath-600" />
                  <span>{isMr ? 'संदेश' : 'Messages'}</span>
                </button>
              </>
            )}

            {/* Family Member Links */}
            {role === 'family' && (
              <>
                <button
                  onClick={() => onTabChange('familyHub')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'familyHub'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Heart className="w-4 h-4 text-saath-600" />
                  <span>{isMr ? 'कुटुंब हब' : 'Family Hub'}</span>
                </button>
                <button
                  onClick={() => onTabChange('activities')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'activities'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Users className="w-4 h-4 text-saath-600" />
                  <span>{isMr ? 'सामाजिक कट्टा' : 'Social Katta'}</span>
                </button>
                <button
                  onClick={() => onTabChange('careplans')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'careplans'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-saath-600" />
                  <span>{isMr ? 'केअर प्लॅन्स' : 'Care Plans'}</span>
                </button>
                <button
                  onClick={() => onTabChange('messages')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    currentTab === 'messages'
                      ? 'bg-saath-50 text-saath-700 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-saath-600" />
                  <span>{isMr ? 'सोबतीशी संवाद' : 'Chat'}</span>
                </button>
              </>
            )}

            {/* Admin Link */}
            {role === 'admin' && (
              <button
                onClick={() => onTabChange('dashboard')}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  currentTab === 'dashboard'
                    ? 'bg-stone-900 text-white font-bold'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {isMr ? 'ॲडमिन कंट्रोल रूम' : 'Admin Control Room'}
              </button>
            )}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="relative p-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-saath-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifs && (
                <div className="absolute -right-14 sm:right-0 mt-3 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white rounded-2xl shadow-elevated border border-stone-200 p-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <h3 className="font-bold text-stone-900 text-base">Alerts & Updates</h3>
                    <span className="text-xs text-stone-500 font-medium">
                      {userNotifs.length} total
                    </span>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-stone-100 mt-2">
                    {userNotifs.length === 0 ? (
                      <p className="text-stone-500 text-sm py-4 text-center">No notifications yet</p>
                    ) : (
                      userNotifs.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`py-3 px-2 rounded-xl transition-colors cursor-pointer ${
                            !n.read ? 'bg-saath-50/60' : 'hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-semibold text-stone-900">{n.title}</h4>
                            <span className="text-[10px] text-stone-400 shrink-0">{n.timestamp}</span>
                          </div>
                          <p className="text-xs text-stone-600 mt-1 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Current User Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
              <img
                src={
                  role === 'senior'
                    ? currentSenior.profilePhoto
                    : role === 'student'
                    ? currentStudent.profilePhoto
                    : role === 'family'
                    ? 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100'
                    : 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=100'
                }
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-saath-500/40 shadow-xs"
              />
              <div className="hidden lg:block text-left">
                <p className="text-sm font-bold text-stone-900 leading-tight">
                  {role === 'senior'
                    ? currentSenior.name.split(' ')[0]
                    : role === 'student'
                    ? currentStudent.name.split(' ')[0]
                    : role === 'family'
                    ? 'Amit Kulkarni'
                    : 'Admin'}
                </p>
                <p className="text-[11px] font-medium text-stone-500 capitalize">
                  {role === 'senior'
                    ? 'Senior (Kolhapur)'
                    : role === 'student'
                    ? 'Student Companion'
                    : role === 'family'
                    ? 'Son (in Bangalore)'
                    : 'Platform Staff'}
                </p>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-stone-200 text-stone-700"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="pb-2 mb-2 border-b border-stone-100 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Navigation Menu</span>
            <span className="text-xs font-semibold text-saath-700 capitalize bg-saath-50 px-2 py-0.5 rounded-full border border-saath-200">
              Role: {role}
            </span>
          </div>

          <button
            onClick={() => { onTabChange('landing'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
              currentTab === 'landing' ? 'bg-saath-50 text-saath-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <span>🏠</span>
            <span>Platform Overview (Home)</span>
          </button>

          {/* Senior Links */}
          {role === 'senior' && (
            <>
              <button
                onClick={() => { onTabChange('dashboard'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
                  currentTab === 'dashboard' ? 'bg-saath-50 text-saath-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>👴</span>
                <span>My Senior Dashboard</span>
              </button>
              <button
                onClick={() => { onTabChange('discovery'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
                  currentTab === 'discovery' ? 'bg-saath-50 text-saath-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Compass className="w-4 h-4 text-saath-600" />
                <span>Find Student Companions</span>
              </button>
              <button
                onClick={() => { onTabChange('bookings'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
                  currentTab === 'bookings' ? 'bg-saath-50 text-saath-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Calendar className="w-4 h-4 text-saath-600" />
                <span>My Bookings</span>
              </button>
              <button
                onClick={() => { onTabChange('careplans'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
                  currentTab === 'careplans' ? 'bg-saath-50 text-saath-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <FileText className="w-4 h-4 text-saath-600" />
                <span>Care Plans & Subscriptions</span>
              </button>
              <button
                onClick={() => { onTabChange('safety'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
                  currentTab === 'safety' ? 'bg-rose-50 text-rose-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Safety & Emergency SOS</span>
              </button>
            </>
          )}

          {/* Student Companion Links */}
          {role === 'student' && (
            <>
              <button
                onClick={() => { onTabChange('dashboard'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
                  currentTab === 'dashboard' ? 'bg-saath-50 text-saath-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>🎓</span>
                <span>Companion Dashboard</span>
              </button>
              <button
                onClick={() => { onTabChange('availability'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
                  currentTab === 'availability' ? 'bg-saath-50 text-saath-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Clock className="w-4 h-4 text-saath-600" />
                <span>Manage Available Slots</span>
              </button>
              <button
                onClick={() => { onTabChange('earnings'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
                  currentTab === 'earnings' ? 'bg-saath-50 text-saath-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <DollarSign className="w-4 h-4 text-saath-600" />
                <span>Earnings & Payouts</span>
              </button>
              <button
                onClick={() => { onTabChange('safety'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
                  currentTab === 'safety' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-emerald-600" />
                <span>Safety Guidelines</span>
              </button>
            </>
          )}

          {/* Family Role Links */}
          {role === 'family' && (
            <>
              <button
                onClick={() => { onTabChange('familyHub'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
                  currentTab === 'familyHub' ? 'bg-saath-50 text-saath-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Family Visibility Hub</span>
              </button>
              <button
                onClick={() => { onTabChange('careplans'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
                  currentTab === 'careplans' ? 'bg-saath-50 text-saath-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Calendar className="w-4 h-4 text-saath-600" />
                <span>Care Plans & Subscriptions</span>
              </button>
            </>
          )}

          {/* Admin Role Links */}
          {role === 'admin' && (
            <button
              onClick={() => { onTabChange('dashboard'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
                currentTab === 'dashboard' ? 'bg-stone-900 text-white font-bold' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-500" />
              <span>Admin Control Center</span>
            </button>
          )}

          {/* Universal Messages Link */}
          <button
            onClick={() => { onTabChange('messages'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-colors ${
              currentTab === 'messages' ? 'bg-saath-50 text-saath-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-saath-600" />
            <span>Chat & Messages</span>
          </button>
        </div>
      )}
    </header>
  );
};
