'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { StudentProfile } from '@/types';
import { calculateCompatibility, MatchingFilters } from '@/lib/matching';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  MapPin,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowUpDown,
  X,
  ChevronRight
} from 'lucide-react';

interface CompanionDiscoveryProps {
  onSelectStudent: (student: StudentProfile) => void;
  onBookStudent: (student: StudentProfile) => void;
}

export const CompanionDiscovery: React.FC<CompanionDiscoveryProps> = ({
  onSelectStudent,
  onBookStudent,
}) => {
  const { currentSenior, students } = useApp();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [minRating, setMinRating] = useState<number>(4.0);
  const [genderFilter, setGenderFilter] = useState<'any' | 'male' | 'female'>('any');
  const [sortBy, setSortBy] = useState<'compatibility' | 'rating' | 'price' | 'distance'>('compatibility');
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  // Available unique filters
  const activitiesList = ['all', 'Chess', 'Conversation', 'Technology Help', 'Walking', 'Reading', 'Music', 'Gardening', 'Storytelling'];
  const languagesList = ['all', 'Marathi', 'Hindi', 'English', 'Kannada'];
  const daysList = ['all', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Calculate compatibility for each student
  const studentsWithScore = useMemo(() => {
    const filters: MatchingFilters = {
      interest: selectedActivity !== 'all' ? selectedActivity : undefined,
      language: selectedLanguage !== 'all' ? selectedLanguage : undefined,
      day: selectedDay !== 'all' ? selectedDay : undefined,
      maxDistance,
      maxPrice,
      minRating,
      genderPreference: genderFilter,
    };

    return students.map(student => {
      const matchResult = calculateCompatibility(currentSenior, student, filters);
      return {
        ...student,
        matchResult,
      };
    });
  }, [students, currentSenior, selectedActivity, selectedLanguage, selectedDay, maxDistance, maxPrice, minRating, genderFilter]);

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    return studentsWithScore
      .filter(s => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = s.name.toLowerCase().includes(q);
          const matchCollege = s.college.toLowerCase().includes(q);
          const matchInterests = s.interests.some(i => i.toLowerCase().includes(q));
          const matchArea = s.area.toLowerCase().includes(q);
          if (!matchName && !matchCollege && !matchInterests && !matchArea) return false;
        }

        // Activity filter
        if (selectedActivity !== 'all') {
          const hasActivity = s.interests.concat(s.activities).some(
            a => a.toLowerCase() === selectedActivity.toLowerCase()
          );
          if (!hasActivity) return false;
        }

        // Language filter
        if (selectedLanguage !== 'all') {
          const hasLanguage = s.languages.some(
            l => l.toLowerCase() === selectedLanguage.toLowerCase()
          );
          if (!hasLanguage) return false;
        }

        // Day filter
        if (selectedDay !== 'all') {
          const hasDay = s.availability.some(
            slot => slot.day.toLowerCase() === selectedDay.toLowerCase()
          );
          if (!hasDay) return false;
        }

        // Distance filter
        if (s.distanceKm > maxDistance) return false;

        // Price filter
        if (s.hourlyRate > maxPrice) return false;

        // Rating filter
        if (s.rating < minRating) return false;

        // Gender filter
        if (genderFilter !== 'any' && s.gender !== genderFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'compatibility') {
          return b.matchResult.score - a.matchResult.score;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'price') {
          return a.hourlyRate - b.hourlyRate;
        }
        if (sortBy === 'distance') {
          return a.distanceKm - b.distanceKm;
        }
        return 0;
      });
  }, [studentsWithScore, searchQuery, selectedActivity, selectedLanguage, selectedDay, maxDistance, maxPrice, minRating, genderFilter, sortBy]);

  const resetAllFilters = () => {
    setSelectedActivity('all');
    setSelectedLanguage('all');
    setSelectedDay('all');
    setMaxDistance(10);
    setMaxPrice(200);
    setMinRating(4.0);
    setGenderFilter('any');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saath-100 text-saath-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-saath-600" />
            <span>Intelligent Matching Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-display tracking-tight">
            Find your Saath
          </h1>
          <p className="text-stone-600 text-base mt-1">
            Matching companions based on your interests ({currentSenior.interests.slice(0, 3).join(', ')}), fluent languages, and proximity in Kolhapur.
          </p>
        </div>

        {/* Demo Quick Highlight */}
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl max-w-sm">
          <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <span>🎯</span>
            <span>Presentation Tip:</span>
          </p>
          <p className="text-xs text-amber-800 mt-0.5">
            Notice <strong>Aditya Patil</strong> ranks at top with <strong>94% Match</strong> (Chess + Marathi + Saturday 6 PM slot).
          </p>
        </div>
      </div>

      {/* Search and Quick Filters Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-card border border-stone-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search by student name, college, hobby, or area..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-base focus:bg-white focus:ring-2 focus:ring-saath-500 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto appearance-none bg-stone-50 border border-stone-200 font-semibold text-stone-800 text-sm py-3.5 pl-4 pr-10 rounded-2xl focus:bg-white focus:ring-2 focus:ring-saath-500 focus:outline-none cursor-pointer"
              >
                <option value="compatibility">Sort: Highest Match %</option>
                <option value="rating">Sort: Top Rated (★)</option>
                <option value="price">Sort: Price: Low to High</option>
                <option value="distance">Sort: Nearest First</option>
              </select>
              <ArrowUpDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* More Filters Toggle */}
            <button
              onClick={() => setShowFiltersModal(!showFiltersModal)}
              className={`p-3.5 rounded-2xl border transition-all flex items-center gap-2 shrink-0 ${
                showFiltersModal
                  ? 'bg-saath-600 text-white border-saath-600'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="text-sm font-semibold hidden md:inline">Advanced Filters</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Pills (Activity / Interest) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-1 text-xs">
          <span className="font-bold text-stone-400 shrink-0 mr-1">Activity:</span>
          {activitiesList.map(act => (
            <button
              key={act}
              onClick={() => setSelectedActivity(act)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
                selectedActivity === act
                  ? 'bg-saath-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {act === 'all' ? 'All Activities' : act}
            </button>
          ))}
        </div>

        {/* Quick Language & Day Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            <span className="font-bold text-stone-400 shrink-0">Language:</span>
            {languagesList.map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 ${
                  selectedLanguage === lang
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {lang === 'all' ? 'Any' : lang}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            <span className="font-bold text-stone-400 shrink-0">Day:</span>
            {['all', 'Saturday', 'Sunday'].map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 ${
                  selectedDay === day
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {day === 'all' ? 'Any Day' : day}
              </button>
            ))}
          </div>
        </div>

        {/* Expanded Filters Drawer (if toggled) */}
        {showFiltersModal && (
          <div className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Max Distance: {maxDistance} km
              </label>
              <input
                type="range"
                min="1"
                max="15"
                value={maxDistance}
                onChange={e => setMaxDistance(Number(e.target.value))}
                className="w-full accent-saath-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Max Hourly Rate: ₹{maxPrice}/hr
              </label>
              <input
                type="range"
                min="100"
                max="250"
                step="10"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-saath-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Minimum Rating: ★ {minRating}
              </label>
              <select
                value={minRating}
                onChange={e => setMinRating(Number(e.target.value))}
                className="w-full text-xs font-medium py-1.5 px-2 bg-stone-50 border border-stone-200 rounded-lg"
              >
                <option value={4.0}>★ 4.0 & above</option>
                <option value={4.5}>★ 4.5 & above</option>
                <option value={4.8}>★ 4.8 & above</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Gender Preference</label>
              <select
                value={genderFilter}
                onChange={e => setGenderFilter(e.target.value as any)}
                className="w-full text-xs font-medium py-1.5 px-2 bg-stone-50 border border-stone-200 rounded-lg"
              >
                <option value="any">No Preference (Any)</option>
                <option value="male">Male Companions</option>
                <option value="female">Female Companions</option>
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
              <button
                onClick={resetAllFilters}
                className="text-xs font-bold text-stone-500 hover:text-saath-600 underline"
              >
                Reset all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count & Active Status */}
      <div className="flex items-center justify-between text-sm text-stone-600">
        <p>
          Showing <strong className="text-stone-900">{filteredStudents.length} verified companions</strong> matching your profile
        </p>
        <span className="text-xs text-stone-400">Deterministic Compatibility Algorithm Active</span>
      </div>

      {/* Companion Cards Grid */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
          <p className="text-4xl">🔍</p>
          <h3 className="text-xl font-bold text-stone-900">No companions match these exact filters</h3>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            Try broadening your activity, price, or distance filters to see more verified student companions nearby.
          </p>
          <button
            onClick={resetAllFilters}
            className="bg-saath-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map(student => {
            const { score, reasons } = student.matchResult;
            const isHighMatch = score >= 90;

            return (
              <div
                key={student.id}
                className={`bg-white rounded-3xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:shadow-card hover:-translate-y-0.5 ${
                  isHighMatch
                    ? 'border-saath-300 shadow-soft ring-1 ring-saath-200'
                    : 'border-stone-200 shadow-xs'
                }`}
              >
                {/* Card Top Banner / Match Pill */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative">
                      <img
                        src={student.profilePhoto}
                        alt={student.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-stone-100 shadow-xs group-hover:scale-105 transition-transform"
                      />
                      {student.isVerified && (
                        <div
                          className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full border-2 border-white"
                          title="College Verified ID"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Compatibility Pill & Hourly Price */}
                    <div className="text-right space-y-1">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-tight ${
                          isHighMatch
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                            : score >= 75
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{score}% Match</span>
                      </div>
                      <div className="text-lg font-black text-stone-900">
                        ₹{student.hourlyRate}<span className="text-xs font-normal text-stone-500">/hr</span>
                      </div>
                    </div>
                  </div>

                  {/* Name & Basic Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-stone-900 group-hover:text-saath-700 transition-colors">
                        {student.name}
                      </h3>
                      <span className="text-xs font-semibold text-stone-400">{student.age} yrs</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-stone-500 mt-1">
                      <GraduationCap className="w-4 h-4 text-saath-600 shrink-0" />
                      <span className="truncate">{student.college}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-stone-600 mt-2 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{student.distanceKm} km away ({student.area})</span>
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{student.rating}</span>
                        <span className="text-stone-400 font-normal">({student.reviewCount})</span>
                      </span>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {student.languages.map(lang => (
                      <span
                        key={lang}
                        className="bg-stone-100 text-stone-700 text-[11px] font-semibold px-2 py-0.5 rounded-md"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>

                  {/* Interests / Activities */}
                  <div className="flex flex-wrap gap-1.5">
                    {student.interests.slice(0, 3).map(interest => (
                      <span
                        key={interest}
                        className="bg-saath-50 text-saath-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-saath-100"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  {/* "Why this match?" Box (Core intelligent feature!) */}
                  <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 space-y-1.5">
                    <p className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Why this match?</span>
                    </p>
                    <ul className="space-y-1 text-xs text-stone-600">
                      {reasons.slice(0, 3).map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span className="leading-tight">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 bg-stone-50/70 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectStudent(student)}
                    className="flex-1 bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors"
                  >
                    View Profile
                  </button>

                  <button
                    onClick={() => onBookStudent(student)}
                    className="flex-1 bg-saath-600 hover:bg-saath-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1"
                  >
                    <span>Book Session</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
