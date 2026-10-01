'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Home,
  Compass,
  Calendar,
  MessageSquare,
  ShieldAlert,
  Clock,
  DollarSign,
  Heart,
  Shield,
  Sparkles,
  Users
} from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenSos?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onTabChange,
  onOpenSos,
}) => {
  const { role, language, notifications, messages, currentSenior, currentStudent } = useApp();
  const isMr = language === 'mr';

  // Calculate unread messages
  const activeUserId =
    role === 'senior'
      ? currentSenior.id
      : role === 'student'
      ? currentStudent.id
      : 'family';

  const unreadMessagesCount = messages.filter(
    m => (role === 'senior' ? m.senderRole === 'student' : m.senderRole === 'senior')
  ).length > 0 ? 1 : 0;

  // Items per role
  const getNavItems = () => {
    if (role === 'senior') {
      return [
        {
          id: 'dashboard',
          label: isMr ? 'होम' : 'Home',
          icon: Home,
        },
        {
          id: 'discovery',
          label: isMr ? 'शोधा' : 'Find',
          icon: Compass,
        },
        {
          id: 'activities',
          label: isMr ? 'कट्टा' : 'Katta',
          icon: Users,
        },
        {
          id: 'bookings',
          label: isMr ? 'भेटी' : 'Bookings',
          icon: Calendar,
        },
        {
          id: 'safety',
          label: isMr ? 'सुरक्षा' : 'Safety',
          icon: ShieldAlert,
          isSos: true,
        },
      ];
    }

    if (role === 'student') {
      return [
        {
          id: 'dashboard',
          label: isMr ? 'हब' : 'Hub',
          icon: Home,
        },
        {
          id: 'activities',
          label: isMr ? 'कट्टा' : 'Katta',
          icon: Users,
        },
        {
          id: 'availability',
          label: isMr ? 'वेळ' : 'Slots',
          icon: Clock,
        },
        {
          id: 'earnings',
          label: isMr ? 'मानधन' : 'Earnings',
          icon: DollarSign,
        },
        {
          id: 'messages',
          label: isMr ? 'संदेश' : 'Messages',
          icon: MessageSquare,
          badge: unreadMessagesCount > 0,
        },
      ];
    }

    if (role === 'family') {
      return [
        {
          id: 'familyHub',
          label: isMr ? 'कुटुंब हब' : 'Family Hub',
          icon: Heart,
        },
        {
          id: 'activities',
          label: isMr ? 'कट्टा' : 'Katta',
          icon: Users,
        },
        {
          id: 'careplans',
          label: isMr ? 'प्लॅन्स' : 'Care Plans',
          icon: Calendar,
        },
        {
          id: 'messages',
          label: isMr ? 'संवाद' : 'Companion',
          icon: MessageSquare,
        },
        {
          id: 'safety',
          label: isMr ? 'सुरक्षा' : 'Safety',
          icon: ShieldAlert,
        },
      ];
    }

    // Admin role
    return [
      {
        id: 'dashboard',
        label: isMr ? 'ॲडमिन' : 'Admin Hub',
        icon: Shield,
      },
      {
        id: 'landing',
        label: isMr ? 'मुख्य पान' : 'Public View',
        icon: Home,
      },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all relative min-w-[56px] ${
                isActive
                  ? 'text-saath-700 font-bold'
                  : 'text-stone-500 hover:text-stone-900 font-medium'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all relative ${
                  isActive ? 'bg-saath-100/80 scale-105' : 'hover:bg-stone-100'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'text-saath-600 stroke-[2.4]' : 'text-stone-600 stroke-[1.8]'
                  }`}
                />
                {(item as any).badge && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-saath-600 ring-2 ring-white"></span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-bold text-saath-800' : 'text-stone-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
