'use client';

import React, { useState } from 'react';
import { StudentProfile, Booking } from '@/types';
import { useApp } from '@/context/AppContext';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  QrCode,
  Wallet,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  CalendarCheck,
  MessageSquare
} from 'lucide-react';

interface BookingModalProps {
  student: StudentProfile | null;
  onClose: () => void;
  onSuccessNavigate: (tab: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  student,
  onClose,
  onSuccessNavigate,
}) => {
  const { currentSenior, createBooking, showToast } = useApp();

  // Booking form state
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [selectedActivity, setSelectedActivity] = useState<string>('Chess');
  const [selectedDate, setSelectedDate] = useState<string>('Saturday, Oct 3, 2026');
  const [selectedTime, setSelectedTime] = useState<string>('6:00 PM');
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [meetingMode, setMeetingMode] = useState<Booking['meetingMode']>('In-Person at Senior Home');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Wallet'>('UPI');
  const [upiId, setUpiId] = useState<string>('rajendra@oksbi');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!student) return null;

  // Price calculations
  const durationMultiplier = durationMinutes / 60;
  const companionFee = Math.round(student.hourlyRate * durationMultiplier);
  const serviceFee = 15;
  const totalAmount = companionFee + serviceFee;

  const activitiesList = [
    'Chess',
    'Conversation',
    'Technology Help',
    'Walking',
    'Reading',
    'Music',
    'Gardening',
    'Storytelling',
  ];

  const dateOptions = [
    'Saturday, Oct 3, 2026',
    'Sunday, Oct 4, 2026',
    'Monday, Oct 5, 2026',
    'Wednesday, Oct 7, 2026',
    'Tomorrow, Sep 27, 2026',
  ];

  const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
  ];

  const handleProceedToPayment = () => {
    setStep('payment');
  };

  const handleExecutePayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      const created = createBooking({
        seniorId: currentSenior.id,
        seniorName: currentSenior.name,
        companionId: student.id,
        companionName: student.name,
        activity: selectedActivity,
        date: selectedDate,
        timeSlot: selectedTime,
        durationMinutes,
        hourlyRate: student.hourlyRate,
        totalAmount,
        serviceFee,
        paymentMethod,
        meetingMode,
      });

      setConfirmedBooking(created);
      setStep('confirmed');

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#EA580C', '#F97316', '#10B981', '#3B82F6'],
        });
      } catch (e) {}
    }, 1200);
  };

  const handleAddToCalendar = () => {
    showToast(`Added to your device calendar: ${selectedActivity} with ${student.name} on ${selectedDate}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-elevated border border-stone-200 relative animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 border-saath-500 shadow-xs">
              <img
                src={student.profilePhoto}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-display">
                {step === 'confirmed' ? 'Booking Confirmed! 🎉' : `Book a Session with ${student.name}`}
              </h2>
              <p className="text-xs text-stone-500">
                {student.college} • ₹{student.hourlyRate}/hour
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Details */}
        {step === 'details' && (
          <div className="p-4 sm:p-6 space-y-6">
            {/* Step indicator */}
            <div className="flex items-center justify-between text-xs font-bold text-stone-400 border-b border-stone-100 pb-3">
              <span className="text-saath-600">Step 1: Session Details</span>
              <span>Step 2: Simulated Checkout</span>
            </div>

            {/* 1. Choose Activity */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 block">
                1. What would you like to do together?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activitiesList.map(act => (
                  <button
                    key={act}
                    type="button"
                    onClick={() => setSelectedActivity(act)}
                    className={`p-3 rounded-xl text-xs font-bold text-center border transition-all ${
                      selectedActivity === act
                        ? 'bg-saath-50 border-saath-600 text-saath-800 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Choose Date */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 block">
                2. Select Date
              </label>
              <div className="flex flex-wrap gap-2">
                {dateOptions.map(date => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedDate === date
                        ? 'bg-saath-600 text-white border-saath-600 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Choose Time Slot */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 block">
                3. Select Time Slot
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                      selectedTime === time
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Choose Duration */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 block">
                4. Select Duration
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: '30 Minutes', mins: 30 },
                  { label: '1 Hour (Standard)', mins: 60 },
                  { label: '2 Hours (Extended)', mins: 120 },
                ].map(d => (
                  <button
                    key={d.mins}
                    type="button"
                    onClick={() => setDurationMinutes(d.mins)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border text-center transition-all ${
                      durationMinutes === d.mins
                        ? 'bg-amber-100 border-amber-500 text-amber-900 ring-1 ring-amber-400'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Meeting Mode */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 block">
                5. Meeting Location Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'In-Person at Senior Home',
                  'Nearby Park / Community Center',
                  'Video Call Check-in',
                ].map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setMeetingMode(mode as any)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left border transition-all ${
                      meetingMode === mode
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-stone-500 italic">
                Address: {currentSenior.area}, {currentSenior.city}
              </p>
            </div>

            {/* Live Price Summary Box */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Session Fee (₹{student.hourlyRate} × {durationMinutes / 60} hr):</span>
                <span className="font-semibold text-stone-900">₹{companionFee}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Saath Trust & Safety Fee:</span>
                <span className="font-semibold text-stone-900">₹{serviceFee}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-bold text-stone-900">
                <span>Total Amount:</span>
                <span className="text-saath-700 text-lg">₹{totalAmount}</span>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleProceedToPayment}
              className="w-full bg-saath-600 hover:bg-saath-700 text-white font-bold py-4 rounded-2xl shadow-elevated transition-all flex items-center justify-center gap-2 text-base"
            >
              <span>Continue to Payment (₹{totalAmount})</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 2: Simulated Checkout */}
        {step === 'payment' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between text-xs font-bold text-stone-400 border-b border-stone-100 pb-3">
              <button
                onClick={() => setStep('details')}
                className="text-stone-500 hover:text-stone-900 flex items-center gap-1 font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Details</span>
              </button>
              <span className="text-saath-600">Step 2 of 2: Simulated Checkout</span>
            </div>

            {/* Session Summary Card */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <h4 className="font-bold text-stone-900 text-sm">Session Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-stone-600">
                <p><strong>Companion:</strong> {student.name}</p>
                <p><strong>Activity:</strong> {selectedActivity}</p>
                <p><strong>Date & Time:</strong> {selectedDate}, {selectedTime}</p>
                <p><strong>Duration:</strong> {durationMinutes} minutes</p>
                <p className="col-span-2"><strong>Location:</strong> {meetingMode}</p>
              </div>
            </div>

            {/* Simulated Payment Method Selection */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-stone-900 block">
                Select Simulated Payment Option:
              </label>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'UPI'
                      ? 'bg-saath-50 border-saath-600 ring-2 ring-saath-500'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <QrCode className="w-6 h-6 mx-auto text-saath-600 mb-1" />
                  <span className="text-xs font-bold block text-stone-900">UPI / QR</span>
                  <span className="text-[10px] text-stone-500">GPay, PhonePe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'Card'
                      ? 'bg-saath-50 border-saath-600 ring-2 ring-saath-500'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto text-saath-600 mb-1" />
                  <span className="text-xs font-bold block text-stone-900">Debit / Card</span>
                  <span className="text-[10px] text-stone-500">RuPay, Visa</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Wallet')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'Wallet'
                      ? 'bg-saath-50 border-saath-600 ring-2 ring-saath-500'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <Wallet className="w-6 h-6 mx-auto text-saath-600 mb-1" />
                  <span className="text-xs font-bold block text-stone-900">Saath Wallet</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Bal: ₹2,400</span>
                </button>
              </div>

              {/* UPI ID input mock */}
              {paymentMethod === 'UPI' && (
                <div className="space-y-1 pt-2">
                  <label className="text-xs font-bold text-stone-600">Simulated UPI ID / VPA</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 text-base font-medium focus:ring-2 focus:ring-saath-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-stone-400">Prototype demo mode: No real money is deducted.</p>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button
              onClick={handleExecutePayment}
              disabled={isProcessingPayment}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-elevated transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-70"
            >
              {isProcessingPayment ? (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Authorizing Simulated Payment...</span>
                </div>
              ) : (
                <span>Pay ₹{totalAmount} & Confirm Session</span>
              )}
            </button>
          </div>
        )}

        {/* STEP 3: Booking Confirmed Screen */}
        {step === 'confirmed' && confirmedBooking && (
          <div className="p-8 text-center space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase">
                Payment Successful • ₹{confirmedBooking.totalAmount}
              </span>
              <h3 className="text-3xl font-black text-stone-900 font-display">
                Booking Confirmed! 🎉
              </h3>
              <p className="text-stone-600 text-base max-w-md mx-auto">
                You've booked a companionship session with <strong className="text-stone-900">{confirmedBooking.companionName}</strong>.
              </p>
            </div>

            {/* Booking Receipt Card */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-left max-w-md mx-auto space-y-2.5 text-xs text-stone-700">
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500">Booking Reference:</span>
                <span className="font-mono font-bold text-stone-900">#SAATH-{confirmedBooking.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Activity:</span>
                <span className="font-bold text-stone-900">{confirmedBooking.activity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Date & Time:</span>
                <span className="font-bold text-stone-900">{confirmedBooking.date} • {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Duration:</span>
                <span className="font-bold text-stone-900">{confirmedBooking.durationMinutes} Minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Meeting Mode:</span>
                <span className="font-bold text-stone-900">{confirmedBooking.meetingMode}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900">
                <span>Amount Paid:</span>
                <span className="text-emerald-700 font-black text-sm">₹{confirmedBooking.totalAmount} (via {confirmedBooking.paymentMethod})</span>
              </div>
            </div>

            {/* Presentation next steps banner */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 max-w-md mx-auto">
              <p className="font-bold flex items-center justify-center gap-1">
                <span>💡</span>
                <span>Next Step in Presentation Flow:</span>
              </p>
              <p className="mt-0.5">
                Switch to <strong>Student (Aditya)</strong> in the top black demo bar to accept this booking request!
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onSuccessNavigate('bookings');
                }}
                className="w-full sm:w-auto bg-saath-600 hover:bg-saath-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md text-sm"
              >
                View in My Bookings
              </button>

              <button
                onClick={handleAddToCalendar}
                className="w-full sm:w-auto bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold px-5 py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-1.5"
              >
                <CalendarCheck className="w-4 h-4 text-stone-600" />
                <span>Add to Calendar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
