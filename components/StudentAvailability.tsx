'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { TimeSlot } from '@/types';
import { Clock, Plus, Trash2, Check, Sparkles, DollarSign, Calendar } from 'lucide-react';

export const StudentAvailability: React.FC = () => {
  const { currentStudent, updateStudentProfile, showToast } = useApp();

  const [availability, setAvailability] = useState<TimeSlot[]>(currentStudent.availability);
  const [hourlyRate, setHourlyRate] = useState<number>(currentStudent.hourlyRate);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [newDay, setNewDay] = useState<string>('Saturday');
  const [newStart, setNewStart] = useState<string>('5:00 PM');
  const [newEnd, setNewEnd] = useState<string>('8:00 PM');

  const handleAddSlot = () => {
    const updated = [...availability, { day: newDay, startTime: newStart, endTime: newEnd }];
    setAvailability(updated);
    updateStudentProfile({ availability: updated });
    showToast(`Added new slot for ${newDay}: ${newStart} - ${newEnd}`);
  };

  const handleRemoveSlot = (index: number) => {
    const updated = availability.filter((_, i) => i !== index);
    setAvailability(updated);
    updateStudentProfile({ availability: updated });
    showToast('Availability slot removed');
  };

  const handleSaveRate = () => {
    updateStudentProfile({ hourlyRate });
    showToast(`Hourly rate updated to ₹${hourlyRate}/hour`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-stone-900 font-display">
          Manage Your Availability & Rate
        </h1>
        <p className="text-stone-600 text-sm mt-1">
          Seniors will only be able to book you during your confirmed free hours. Changes save immediately.
        </p>
      </div>

      {/* Hourly Rate Card */}
      <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Your Standard Hourly Fee</span>
          <h3 className="text-xl font-bold text-stone-900">Set Hourly Companionship Rate</h3>
          <p className="text-xs text-stone-500 mt-0.5">Recommended student range: ₹120 – ₹180 per hour.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-stone-500">₹</span>
            <input
              type="number"
              min="100"
              max="300"
              step="10"
              value={hourlyRate}
              onChange={e => setHourlyRate(Number(e.target.value))}
              className="w-32 pl-8 pr-3 py-2.5 rounded-xl border border-stone-300 font-bold text-lg text-stone-900 focus:ring-2 focus:ring-saath-500"
            />
          </div>
          <button
            onClick={handleSaveRate}
            className="bg-saath-600 hover:bg-saath-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-xs"
          >
            Save Rate
          </button>
        </div>
      </div>

      {/* Add New Slot Form */}
      <div className="bg-white p-6 rounded-3xl shadow-card border border-stone-200 space-y-4">
        <h3 className="text-lg font-bold text-stone-900 font-display flex items-center gap-2">
          <Plus className="w-5 h-5 text-saath-600" />
          <span>Add New Weekly Free Slot</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="text-xs font-bold text-stone-600 block mb-1">Day of Week</label>
            <select
              value={newDay}
              onChange={e => setNewDay(e.target.value)}
              className="w-full text-sm font-semibold p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
            >
              {daysOfWeek.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-600 block mb-1">From Time</label>
            <input
              type="text"
              value={newStart}
              onChange={e => setNewStart(e.target.value)}
              placeholder="e.g. 5:00 PM"
              className="w-full text-sm font-semibold p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-600 block mb-1">To Time</label>
            <input
              type="text"
              value={newEnd}
              onChange={e => setNewEnd(e.target.value)}
              placeholder="e.g. 8:00 PM"
              className="w-full text-sm font-semibold p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
            />
          </div>

          <button
            onClick={handleAddSlot}
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slot</span>
          </button>
        </div>
      </div>

      {/* Active Slots Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-stone-900 font-display flex items-center gap-2">
          <Calendar className="w-5 h-5 text-saath-600" />
          <span>Current Active Schedule ({availability.length} slots)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availability.map((slot, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-soft flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-saath-100 text-saath-800 font-bold flex items-center justify-center text-xs">
                  {slot.day.slice(0, 3)}
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{slot.day}</h4>
                  <p className="text-xs text-stone-500 font-medium">
                    {slot.startTime} – {slot.endTime}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleRemoveSlot(index)}
                className="text-stone-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition-colors"
                title="Remove slot"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
