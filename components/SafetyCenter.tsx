'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { EmergencyContact } from '@/types';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Phone,
  Heart,
  Share2,
  Lock,
  UserX,
  CheckCircle,
  Sparkles,
  Info,
  PhoneCall
} from 'lucide-react';

interface SafetyCenterProps {
  onOpenSos: () => void;
}

export const SafetyCenter: React.FC<SafetyCenterProps> = ({ onOpenSos }) => {
  const {
    role,
    currentSenior,
    updateEmergencyContact,
    submitReport,
    showToast,
  } = useApp();

  const [contactName, setContactName] = useState(currentSenior.emergencyContact.name);
  const [relationship, setRelationship] = useState(currentSenior.emergencyContact.relationship);
  const [phone, setPhone] = useState(currentSenior.emergencyContact.phone);
  const [shareAlerts, setShareAlerts] = useState(currentSenior.emergencyContact.shareSessionAlerts);

  // Reporting modal state
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportedUser, setReportedUser] = useState('Companion/User');

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmergencyContact({
      name: contactName,
      relationship,
      phone,
      shareSessionAlerts: shareAlerts,
    });
  };

  const handleSimulateShare = () => {
    showToast(`SMS & WhatsApp Alert Sent to ${contactName} (${phone}) with next scheduled session details!`);
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason.trim()) return;
    submitReport({
      reporterId: currentSenior.id,
      reporterName: currentSenior.name,
      reportedUserId: 'reported-user-1',
      reportedUserName: reportedUser,
      reason: reportReason.trim(),
    });
    setShowReportModal(false);
    setReportReason('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Saath Trust & Safety Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Your Safety & Dignity Always Come First
          </h1>
          <p className="text-stone-300 text-sm">
            Monitored companionship, verified identity checks, and family notification circles.
          </p>
        </div>

        <button
          onClick={onOpenSos}
          className="bg-rose-600 hover:bg-rose-700 text-white font-black text-sm px-6 py-4 rounded-2xl shadow-elevated flex items-center justify-center gap-2 transition-transform transform hover:scale-105 active:scale-95 border-2 border-rose-400"
        >
          <AlertTriangle className="w-5 h-5" />
          <span>Simulate Emergency SOS</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Family Contact Card (Left) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-card border border-stone-200 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="text-xl font-bold text-stone-900 font-display">
                Family & Emergency Contact Circle
              </h2>
              <p className="text-xs text-stone-500">
                Keep your son, daughter, or close relative updated on all companion visits.
              </p>
            </div>
            <Heart className="w-6 h-6 text-saath-600" />
          </div>

          <form onSubmit={handleSaveContact} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Contact Full Name</label>
              <input
                type="text"
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-sm font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Relationship</label>
                <input
                  type="text"
                  value={relationship}
                  onChange={e => setRelationship(e.target.value)}
                  placeholder="e.g. Son, Daughter, Brother"
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Phone Number (with WhatsApp)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-sm font-semibold"
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
              <input
                type="checkbox"
                id="shareAlerts"
                checked={shareAlerts}
                onChange={e => setShareAlerts(e.target.checked)}
                className="mt-1 w-4 h-4 text-emerald-600 rounded"
              />
              <label htmlFor="shareAlerts" className="text-xs text-emerald-900 font-medium cursor-pointer">
                <strong>Automatically share session alerts:</strong> Send an automated SMS & WhatsApp notification to {contactName} whenever a student companion confirms an upcoming booking at my home.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                className="w-full sm:flex-1 bg-saath-600 hover:bg-saath-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-xs"
              >
                Save Emergency Contact
              </button>

              <button
                type="button"
                onClick={handleSimulateShare}
                className="w-full sm:flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4 text-saath-600" />
                <span>Simulate Dispatching Alert</span>
              </button>
            </div>
          </form>
        </div>

        {/* Safety Rules & Boundaries (Right) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-200 space-y-4">
            <h3 className="text-lg font-bold text-stone-900 font-display flex items-center gap-2">
              <Lock className="w-5 h-5 text-saath-600" />
              <span>Core Safety Guidelines</span>
            </h3>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="font-bold text-stone-900">1. Verified College Credentials</p>
                <p className="mt-0.5 text-stone-600">Students have verified college identity cards inspected by Saath admin team before visiting seniors.</p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="font-bold text-stone-900">2. No Financial or Medical Advice</p>
                <p className="mt-0.5 text-stone-600">Companions never ask for bank passwords, OTPs, or give prescription medical opinions.</p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="font-bold text-stone-900">3. Respectful Public or Home Manners</p>
                <p className="mt-0.5 text-stone-600">Sessions are conducted in living rooms, verandas, or designated colony parks.</p>
              </div>
            </div>

            <button
              onClick={() => setShowReportModal(true)}
              className="w-full text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-rose-200"
            >
              <UserX className="w-4 h-4" />
              <span>Report or Block a User</span>
            </button>
          </div>

          {/* Platform Boundary Alert */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-xs text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1">
              <Info className="w-4 h-4 text-amber-700" />
              <span>Non-Medical Platform Disclaimer</span>
            </p>
            <p className="leading-relaxed">
              Saath is dedicated purely to companionship, conversation, and shared activities. Student companions are not medical caregivers.
            </p>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-elevated border border-stone-200 space-y-4">
            <h3 className="text-xl font-bold text-stone-900">Report a Safety Concern</h3>
            <p className="text-xs text-stone-500">
              Reports are treated with strict confidentiality by our moderation team.
            </p>

            <form onSubmit={handleSendReport} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">User Name</label>
                <input
                  type="text"
                  value={reportedUser}
                  onChange={e => setReportedUser(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Reason for Report</label>
                <textarea
                  rows={3}
                  value={reportReason}
                  onChange={e => setReportReason(e.target.value)}
                  placeholder="Describe what occurred..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 bg-stone-100 font-bold text-stone-700 py-2.5 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-rose-600 font-bold text-white py-2.5 rounded-xl text-xs"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
