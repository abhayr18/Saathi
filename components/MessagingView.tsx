'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Message } from '@/types';
import {
  Send,
  MessageSquare,
  Sparkles,
  Phone,
  Video,
  CheckCheck,
  Smile,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';

interface MessagingViewProps {
  initialCompanionId?: string;
}

export const MessagingView: React.FC<MessagingViewProps> = ({ initialCompanionId }) => {
  const {
    role,
    currentSenior,
    currentStudent,
    students,
    seniors,
    messages,
    sendMessage,
    showToast,
  } = useApp();

  const [activePartnerId, setActivePartnerId] = useState<string>(
    initialCompanionId || (role === 'senior' ? 'student-1' : 'senior-1')
  );
  const [isMobileChatOpen, setIsMobileChatOpen] = useState<boolean>(Boolean(initialCompanionId));
  const [inputText, setInputText] = useState('');

  // Determine current active chat partner
  const activeStudent = students.find(s => s.id === activePartnerId) || students[0];
  const activeSenior = seniors.find(s => s.id === activePartnerId) || seniors[0];

  const partnerName = role === 'senior' ? activeStudent.name : activeSenior.name;
  const partnerPhoto = role === 'senior' ? activeStudent.profilePhoto : activeSenior.profilePhoto;
  const partnerSub =
    role === 'senior'
      ? `${activeStudent.college} • ${activeStudent.course}`
      : `${activeSenior.area}, ${activeSenior.city}`;

  // Filter messages between current user and active partner
  const conversationMessages = messages.filter(
    m =>
      (role === 'senior' && m.companionId === activeStudent.id && m.seniorId === currentSenior.id) ||
      (role === 'student' && m.seniorId === activeSenior.id && m.companionId === currentStudent.id)
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (role === 'senior') {
      sendMessage(undefined, activeStudent.id, currentSenior.id, inputText);
    } else {
      sendMessage(undefined, currentStudent.id, activeSenior.id, inputText);
    }
    setInputText('');
  };

  const handleQuickChip = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="bg-white rounded-3xl shadow-card border border-stone-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
        {/* Left: Chat Contacts List */}
        <div
          className={`md:col-span-4 border-r border-stone-200 bg-stone-50/60 p-4 space-y-3 ${
            isMobileChatOpen ? 'hidden md:block' : 'block'
          }`}
        >
          <div className="pb-2 border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-base">Conversations</h3>
            <span className="text-[11px] text-stone-500 font-bold bg-white px-2 py-0.5 rounded-full border border-stone-200">
              Active
            </span>
          </div>

          <div className="space-y-1">
            {(role === 'senior' ? students.slice(0, 5) : seniors.slice(0, 4)).map(partner => {
              const isSelected = partner.id === activePartnerId;
              return (
                <div
                  key={partner.id}
                  onClick={() => {
                    setActivePartnerId(partner.id);
                    setIsMobileChatOpen(true);
                  }}
                  className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-white shadow-soft border border-saath-300 ring-1 ring-saath-200'
                      : 'hover:bg-white/70 text-stone-600'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={partner.profilePhoto}
                      alt={partner.name}
                      className="w-11 h-11 rounded-full object-cover border border-stone-200"
                    />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0"></span>
                  </div>

                  <div className="overflow-hidden flex-1">
                    <h4 className="font-bold text-stone-900 text-sm truncate">
                      {partner.name}
                    </h4>
                    <p className="text-xs text-stone-500 truncate">
                      {'college' in partner ? partner.college : partner.city}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Message Window */}
        <div
          className={`md:col-span-8 flex flex-col justify-between bg-white h-[calc(100vh-230px)] min-h-[500px] md:h-[600px] ${
            !isMobileChatOpen ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/40">
            <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
              {/* Mobile Back Button */}
              <button
                onClick={() => setIsMobileChatOpen(false)}
                className="md:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-200/70 transition-colors shrink-0"
                aria-label="Back to conversations list"
              >
                <ArrowLeft className="w-5 h-5 text-stone-700" />
              </button>

              <div className="relative shrink-0">
                <img
                  src={partnerPhoto}
                  alt={partnerName}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-saath-500"
                />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0"></span>
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-tight truncate">
                  {partnerName}
                </h3>
                <p className="text-xs text-stone-500 font-medium truncate">
                  {partnerSub}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => showToast(`Initiating simulated voice check-in call with ${partnerName}...`)}
                className="p-2 sm:p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
                title="Voice Call"
              >
                <Phone className="w-4 h-4 text-saath-600" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
            {/* Safety Reminder Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-center text-xs text-amber-900 leading-snug">
              🔒 Safe & Monitored Chat: Never share banking OTPs, passwords, or personal financial details.
            </div>

            {conversationMessages.length === 0 ? (
              <div className="text-center py-12 text-stone-400 text-sm">
                No messages yet. Say Namaskar to begin the conversation!
              </div>
            ) : (
              conversationMessages.map(msg => {
                const isMe =
                  (role === 'senior' && msg.senderRole === 'senior') ||
                  (role === 'student' && msg.senderRole === 'student');

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[11px] font-bold text-stone-500">
                        {msg.senderName}
                      </span>
                      <span className="text-[10px] text-stone-400 font-medium">
                        {msg.timestamp}
                      </span>
                    </div>

                    <div
                      className={`max-w-[85%] sm:max-w-md rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm font-medium leading-relaxed ${
                        isMe
                          ? 'bg-saath-600 text-white rounded-br-xs shadow-xs'
                          : 'bg-stone-100 text-stone-900 rounded-bl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 sm:px-4 py-2 bg-stone-50/70 border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-stone-400 font-bold shrink-0">Suggestions:</span>
            {[
              'Looking forward to our session!',
              'I will bring my tournament chess board.',
              'Namaskar! See you at 6:00 PM.',
              'I have reached the society gate.',
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickChip(chip)}
                className="px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-stone-700 hover:border-saath-400 whitespace-nowrap active:bg-stone-100 shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-stone-200 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Message ${partnerName.split(' ')[0]}...`}
              className="flex-1 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-base text-stone-900 focus:bg-white focus:ring-2 focus:ring-saath-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-saath-600 hover:bg-saath-700 disabled:opacity-50 text-white p-3 rounded-2xl transition-colors shrink-0 shadow-xs"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
