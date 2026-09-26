export type UserRole = 'senior' | 'student' | 'family' | 'admin';

export interface TimeSlot {
  day: string; // 'Monday', 'Tuesday', etc.
  startTime: string; // e.g. "10:00 AM", "6:00 PM"
  endTime: string; // e.g. "12:00 PM", "9:00 PM"
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  shareSessionAlerts: boolean;
  city?: string;
}

export interface SeniorProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  city: string;
  area: string;
  languages: string[];
  interests: string[];
  bio: string;
  profilePhoto: string;
  emergencyContact: EmergencyContact;
}

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  college: string;
  course: string;
  year: string;
  city: string;
  area: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  languages: string[];
  interests: string[];
  bio: string;
  activities: string[];
  hourlyRate: number;
  isVerified: boolean;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  collegeIdUrl?: string;
  availability: TimeSlot[];
  profilePhoto: string;
  totalEarnings: number;
  completedSessionsCount: number;
}

export interface Booking {
  id: string;
  seniorId: string;
  seniorName: string;
  companionId: string;
  companionName: string;
  activity: string;
  date: string; // "2026-09-28" or "Saturday, Sep 28"
  timeSlot: string; // "6:00 PM"
  durationMinutes: number; // 30, 60, 120
  hourlyRate: number;
  totalAmount: number;
  serviceFee: number;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled' | 'rejected';
  paymentStatus: 'paid' | 'refunded';
  paymentMethod: 'UPI' | 'Card' | 'Wallet';
  meetingMode: 'In-Person at Senior Home' | 'Nearby Park / Community Center' | 'Video Call Check-in';
  createdAt: string;
  reviewSubmitted?: boolean;
  observationSubmitted?: boolean;
}

export interface Review {
  id: string;
  bookingId: string;
  companionId: string;
  seniorId: string;
  seniorName: string;
  seniorPhoto?: string;
  rating: number; // 1 to 5
  tags: string[];
  comment: string;
  createdAt: string;
}

export interface VisitObservation {
  id: string;
  bookingId: string;
  seniorId: string;
  seniorName: string;
  companionId: string;
  companionName: string;
  date: string;
  activity: string;
  durationMinutes: number;
  mood: 'Cheerful' | 'Content / Calm' | 'Quiet' | 'Low Energy';
  engagement: 'Highly Active' | 'Normal' | 'Reserved';
  mobilityObserved: 'Walked Comfortably' | 'Light Veranda Stroll' | 'Seated Activity';
  notes: string;
  isNormal: boolean; // "Know My Normal" detection
  familyNotified: boolean;
}

export interface CarePlanSubscription {
  id: string;
  seniorId: string;
  seniorName: string;
  sponsorName: string; // Family member sponsoring
  model: 'Model 1 (On-Demand)' | 'Model 2 (Monthly Plan)' | 'Model 3 (Family Care Hub)' | 'Model 4 (Partner / B2B)';
  planName: string; // e.g. "Gold Saath — 8 Visits / Month"
  monthlyCost: number;
  visitsPerMonth: number;
  visitsCompleted: number;
  status: 'active' | 'renewed';
  nextScheduledVisit: string;
  primaryCompanionName: string;
}

export interface Message {
  id: string;
  bookingId?: string;
  companionId: string;
  seniorId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  reportedUserId: string;
  reportedUserName: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  date: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'system' | 'safety' | 'earnings' | 'observation';
  read: boolean;
  timestamp: string;
}

export interface CompatibilityResult {
  score: number;
  breakdown: {
    interestScore: number;
    languageScore: number;
    availabilityScore: number;
    locationScore: number;
    ratingScore: number;
  };
  reasons: string[];
}
