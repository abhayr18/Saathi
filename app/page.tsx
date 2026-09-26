'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StudentProfile, Booking } from '@/types';
import { Navbar } from '@/components/Navbar';
import { LandingPage } from '@/components/LandingPage';
import { SeniorDashboard } from '@/components/SeniorDashboard';
import { CompanionDiscovery } from '@/components/CompanionDiscovery';
import { MyBookingsView } from '@/components/MyBookingsView';
import { StudentDashboard } from '@/components/StudentDashboard';
import { StudentAvailability } from '@/components/StudentAvailability';
import { EarningsView } from '@/components/EarningsView';
import { SafetyCenter } from '@/components/SafetyCenter';
import { MessagingView } from '@/components/MessagingView';
import { AdminDashboard } from '@/components/AdminDashboard';
import { FamilyDashboard } from '@/components/FamilyDashboard';
import { CarePlansView } from '@/components/CarePlansView';
import { CompanionProfileModal } from '@/components/CompanionProfileModal';
import { BookingModal } from '@/components/BookingModal';
import { ReviewModal } from '@/components/ReviewModal';
import { ObservationModal } from '@/components/ObservationModal';
import { SosModal } from '@/components/SosModal';
import { MobileBottomNav } from '@/components/MobileBottomNav';

export default function Home() {
  const { role, switchRole, students } = useApp();

  const [currentTab, setCurrentTab] = useState<string>('landing');

  // Modals
  const [profileModalStudent, setProfileModalStudent] = useState<StudentProfile | null>(null);
  const [bookingModalStudent, setBookingModalStudent] = useState<StudentProfile | null>(null);
  const [reviewModalBooking, setReviewModalBooking] = useState<Booking | null>(null);
  const [observationModalBooking, setObservationModalBooking] = useState<Booking | null>(null);
  const [isSosOpen, setIsSosOpen] = useState<boolean>(false);
  const [messagingTargetId, setMessagingTargetId] = useState<string | undefined>(undefined);

  // Handlers
  const handleOpenProfile = (student: StudentProfile) => {
    setProfileModalStudent(student);
  };

  const handleOpenBooking = (student: StudentProfile) => {
    setBookingModalStudent(student);
  };

  const handleOpenReview = (booking: Booking) => {
    setReviewModalBooking(booking);
  };

  const handleOpenObservation = (booking: Booking) => {
    setObservationModalBooking(booking);
  };

  const handleOpenMessageFromBooking = (booking: Booking) => {
    setMessagingTargetId(booking.companionId);
    setCurrentTab('messages');
  };

  const handleOpenMessageFromStudent = (student: StudentProfile) => {
    setMessagingTargetId(student.id);
    setCurrentTab('messages');
  };

  const handleBookAgain = (companionId: string) => {
    const companion = students.find(s => s.id === companionId);
    if (companion) {
      setBookingModalStudent(companion);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Universal Top Navigation & Role Switcher */}
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main Content Area */}
      <main className="flex-1 pb-24 md:pb-8">
        {currentTab === 'landing' ? (
          <LandingPage onNavigate={setCurrentTab} />
        ) : currentTab === 'careplans' ? (
          <CarePlansView
            onSelectPlan={(name, price, visits) => {
              setCurrentTab(role === 'family' ? 'familyHub' : 'dashboard');
            }}
            onBookOnDemand={() => setCurrentTab('discovery')}
          />
        ) : role === 'admin' ? (
          <AdminDashboard />
        ) : role === 'family' ? (
          /* Family / Son View (Model 3 & Know My Normal) */
          <>
            {currentTab === 'familyHub' && <FamilyDashboard onNavigate={setCurrentTab} />}
            {currentTab === 'messages' && <MessagingView initialCompanionId={messagingTargetId} />}
            {currentTab === 'safety' && <SafetyCenter onOpenSos={() => setIsSosOpen(true)} />}
          </>
        ) : role === 'student' ? (
          /* Student Companion Views */
          <>
            {currentTab === 'dashboard' && (
              <StudentDashboard
                onNavigate={setCurrentTab}
                onOpenObservation={handleOpenObservation}
              />
            )}
            {currentTab === 'availability' && <StudentAvailability />}
            {currentTab === 'earnings' && <EarningsView />}
            {currentTab === 'messages' && <MessagingView initialCompanionId={messagingTargetId} />}
            {currentTab === 'safety' && <SafetyCenter onOpenSos={() => setIsSosOpen(true)} />}
          </>
        ) : (
          /* Senior Citizen Views */
          <>
            {currentTab === 'dashboard' && (
              <SeniorDashboard
                onNavigate={setCurrentTab}
                onSelectStudent={handleOpenProfile}
                onBookStudent={handleOpenBooking}
                onOpenSos={() => setIsSosOpen(true)}
              />
            )}
            {currentTab === 'discovery' && (
              <CompanionDiscovery
                onSelectStudent={handleOpenProfile}
                onBookStudent={handleOpenBooking}
              />
            )}
            {currentTab === 'bookings' && (
              <MyBookingsView
                onOpenReview={handleOpenReview}
                onOpenMessage={handleOpenMessageFromBooking}
                onBookAgain={handleBookAgain}
              />
            )}
            {currentTab === 'messages' && (
              <MessagingView initialCompanionId={messagingTargetId} />
            )}
            {currentTab === 'safety' && (
              <SafetyCenter onOpenSos={() => setIsSosOpen(true)} />
            )}
          </>
        )}
      </main>

      {/* Profile Detail Modal */}
      <CompanionProfileModal
        student={profileModalStudent}
        onClose={() => setProfileModalStudent(null)}
        onBook={handleOpenBooking}
        onMessage={handleOpenMessageFromStudent}
      />

      {/* Booking & Payment Simulation Modal */}
      <BookingModal
        student={bookingModalStudent}
        onClose={() => setBookingModalStudent(null)}
        onSuccessNavigate={tab => setCurrentTab(tab)}
      />

      {/* Senior Review Modal */}
      <ReviewModal
        booking={reviewModalBooking}
        onClose={() => setReviewModalBooking(null)}
      />

      {/* Student Visit Observation Modal (Transmits to Family) */}
      <ObservationModal
        booking={observationModalBooking}
        onClose={() => setObservationModalBooking(null)}
      />

      {/* Emergency SOS Simulation Modal */}
      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
      />

      {/* Mobile Bottom Navigation (Persistent thumb bar) */}
      <MobileBottomNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenSos={() => setIsSosOpen(true)}
      />
    </div>
  );
}
