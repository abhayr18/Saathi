'use client';

import React, { useState } from 'react';
import { Booking } from '@/types';
import { useApp } from '@/context/AppContext';
import { X, FileText, CheckCircle2, Smile, Activity, HeartHandshake } from 'lucide-react';

interface ObservationModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const ObservationModal: React.FC<ObservationModalProps> = ({ booking, onClose }) => {
  const { currentStudent, submitVisitObservation, language } = useApp();
  const isMr = language === 'mr';

  const [mood, setMood] = useState<'Cheerful' | 'Content / Calm' | 'Quiet' | 'Low Energy'>('Cheerful');
  const [engagement, setEngagement] = useState<'Highly Active' | 'Normal' | 'Reserved'>('Highly Active');
  const [mobility, setMobility] = useState<'Walked Comfortably' | 'Light Veranda Stroll' | 'Seated Activity'>('Walked Comfortably');
  const [notes, setNotes] = useState<string>(
    isMr
      ? 'राजेंद्र काका आज खूप छान आणि उत्साही मूडमध्ये होते. आम्ही बुद्धिबळाचे २ डाव खेळलो आणि बागेत फेरफटका मारला. गप्पागोष्टी आणि खाणेपिणे नेहमीप्रमाणे उत्तम होते.'
      : 'Rajendra-kaka was in very good spirits today. We completed 2 games of chess and walked 40 minutes around the colony park. Appetite and conversation normal.'
  );

  if (!booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitVisitObservation({
      bookingId: booking.id,
      seniorId: booking.seniorId,
      seniorName: booking.seniorName,
      companionId: currentStudent.id,
      companionName: currentStudent.name,
      date: booking.date,
      activity: booking.activity,
      durationMinutes: booking.durationMinutes,
      mood,
      engagement,
      mobilityObserved: mobility,
      notes: notes.trim(),
      isNormal: true,
    });
    onClose();
  };

  const moodOptions = [
    { id: 'Cheerful', label: isMr ? 'आनंदी व उत्साही' : 'Cheerful' },
    { id: 'Content / Calm', label: isMr ? 'शांत व समाधानी' : 'Content / Calm' },
    { id: 'Quiet', label: isMr ? 'मितभाषी' : 'Quiet' },
    { id: 'Low Energy', label: isMr ? 'कमी ऊर्जा / थकवा' : 'Low Energy' },
  ];

  const engagementOptions = [
    { id: 'Highly Active', label: isMr ? 'अतिशय सक्रिय' : 'Highly Active' },
    { id: 'Normal', label: isMr ? 'सामान्य' : 'Normal' },
    { id: 'Reserved', label: isMr ? 'संकोची' : 'Reserved' },
  ];

  const mobilityOptions = [
    { id: 'Walked Comfortably', label: isMr ? 'सहजतेने चालले' : 'Walked Comfortably' },
    { id: 'Light Veranda Stroll', label: isMr ? 'व्हरांड्यात फेरफटका' : 'Light Veranda Stroll' },
    { id: 'Seated Activity', label: isMr ? 'बसून केलेले उपक्रम' : 'Seated Activity' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 shadow-elevated border border-stone-200 relative space-y-6 animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-saath-100 text-saath-700 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-saath-600" />
            </div>
            <div>
              <h3 className="text-xl font-black text-stone-900 font-display">
                {isMr ? 'भेटीचे निरीक्षण नोंदवा' : 'Log Visit Observation'}
              </h3>
              <p className="text-xs text-stone-500">
                {isMr ? `${booking.seniorName} यांच्यासाठी • ${booking.activity} सत्र` : `For ${booking.seniorName} • ${booking.activity} session`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mood */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              {isMr ? 'ज्येष्ठांची मनस्थिती (मूड)' : 'Senior\'s Mood Observed'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {moodOptions.map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(m.id as any)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    mood === m.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-400'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Engagement */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              {isMr ? 'सहभाग आणि प्रतिसाद' : 'Engagement & Responsiveness'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {engagementOptions.map(eng => (
                <button
                  key={eng.id}
                  type="button"
                  onClick={() => setEngagement(eng.id as any)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    engagement === eng.id
                      ? 'bg-saath-50 border-saath-500 text-saath-900 ring-1 ring-saath-400'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  {eng.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobility */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              {isMr ? 'शारीरिक हालचाल / चालणे' : 'Mobility / Physical Movement'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {mobilityOptions.map(mob => (
                <button
                  key={mob.id}
                  type="button"
                  onClick={() => setMobility(mob.id as any)}
                  className={`p-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                    mobility === mob.id
                      ? 'bg-blue-50 border-blue-500 text-blue-900 ring-1 ring-blue-400'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  {mob.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              {isMr ? 'कुटुंबासाठी सविस्तर नोंदी' : 'Observation Notes for Family Circle'}
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 leading-relaxed focus:bg-white focus:ring-2 focus:ring-saath-500"
              required
            />
          </div>

          {/* Notice */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {isMr
                ? 'ही नोंद बंगळुरूमध्ये असणारे सुपुत्र अमित यांच्याकडे जाईल आणि \"नो माय नॉर्मल\" ट्रॅकर अपडेट करेल.'
                : 'This log transmits to son Amit in Bangalore and updates the family\'s "Know My Normal" wellness tracker.'}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-saath-600 hover:bg-saath-700 text-white font-bold py-3.5 rounded-2xl shadow-elevated transition-colors text-sm"
          >
            {isMr ? 'कुटुंबाला निरीक्षण पाठवा' : 'Submit Observation to Family'}
          </button>
        </form>
      </div>
    </div>
  );
};
