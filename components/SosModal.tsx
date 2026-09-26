'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { AlertTriangle, Phone, ShieldCheck, X, HeartHandshake, CheckCircle } from 'lucide-react';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose }) => {
  const { currentSenior, showToast } = useApp();

  if (!isOpen) return null;

  const handleSimulateCall = (target: string) => {
    showToast(`Simulated Call Dispatched to ${target}! Alert coordinates transmitted.`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-rose-950/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-elevated border-2 border-rose-300 relative space-y-6 animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5 text-rose-600 font-bold">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h3 className="text-xl font-black text-stone-900 font-display">
                Emergency Support Trigger
              </h3>
              <p className="text-xs text-rose-600 font-bold uppercase tracking-wider">
                Simulated Safety Protocol
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed">
          In a real emergency situation, pressing this SOS button immediately broadcasts your GPS location, current companion session status, and home address to your family contact and local emergency lines.
        </p>

        {/* Emergency Contacts List */}
        <div className="space-y-3">
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-rose-700 uppercase block">Family Primary Contact</span>
              <p className="text-sm font-black text-stone-900">
                {currentSenior.emergencyContact.name} ({currentSenior.emergencyContact.relationship})
              </p>
              <p className="text-xs text-stone-600 font-mono mt-0.5">
                {currentSenior.emergencyContact.phone}
              </p>
            </div>
            <button
              onClick={() => handleSimulateCall(currentSenior.emergencyContact.name)}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </button>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase block">National Senior Helpline</span>
              <p className="text-sm font-black text-stone-900">Elderline (Ministry of Social Justice)</p>
              <p className="text-xs text-stone-600 font-mono mt-0.5">Toll-Free: 14567</p>
            </div>
            <button
              onClick={() => handleSimulateCall('Elderline 14567')}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </button>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase block">Police & Emergency Medical</span>
              <p className="text-sm font-black text-stone-900">Kolhapur Emergency Response</p>
              <p className="text-xs text-stone-600 font-mono mt-0.5">Dial: 112 / 100</p>
            </div>
            <button
              onClick={() => handleSimulateCall('Police Emergency 112')}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <CheckCircle className="w-4 h-4" />
          <span>I am Safe / Close Emergency Screen</span>
        </button>
      </div>
    </div>
  );
};
