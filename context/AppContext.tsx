'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  SeniorProfile,
  StudentProfile,
  Booking,
  Review,
  Message,
  Report,
  NotificationItem,
  EmergencyContact,
  VisitObservation,
  CarePlanSubscription,
  SocialActivity,
  LanguageMode,
} from '@/types';
import {
  INITIAL_SENIORS,
  INITIAL_STUDENTS,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  INITIAL_MESSAGES,
  INITIAL_REPORTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_OBSERVATIONS,
  INITIAL_CARE_PLANS,
  INITIAL_SOCIAL_ACTIVITIES,
} from '@/data/mockData';

interface AppContextType {
  role: UserRole;
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  toggleLanguage: () => void;
  currentSenior: SeniorProfile;
  currentStudent: StudentProfile;
  seniors: SeniorProfile[];
  students: StudentProfile[];
  bookings: Booking[];
  reviews: Review[];
  messages: Message[];
  reports: Report[];
  notifications: NotificationItem[];
  observations: VisitObservation[];
  carePlans: CarePlanSubscription[];
  socialActivities: SocialActivity[];
  registerForActivity: (activityId: string) => void;
  unregisterFromActivity: (activityId: string) => void;
  switchRole: (role: UserRole) => void;
  setSeniorUser: (seniorId: string) => void;
  setStudentUser: (studentId: string) => void;
  createBooking: (newBooking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => Booking;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  submitVisitObservation: (obs: Omit<VisitObservation, 'id' | 'familyNotified'>) => void;
  subscribeCarePlan: (plan: Omit<CarePlanSubscription, 'id' | 'status' | 'visitsCompleted'>) => void;
  sendMessage: (bookingId: string | undefined, companionId: string, seniorId: string, text: string) => void;
  updateStudentProfile: (updated: Partial<StudentProfile>) => void;
  updateSeniorProfile: (updated: Partial<SeniorProfile>) => void;
  updateEmergencyContact: (contact: EmergencyContact) => void;
  submitStudentVerification: (studentId: string) => void;
  verifyStudentByAdmin: (studentId: string, approve: boolean) => void;
  submitReport: (report: Omit<Report, 'id' | 'status' | 'date'>) => void;
  markNotificationAsRead: (id: string) => void;
  resetDemoData: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'saath_role',
  CURRENT_SENIOR_ID: 'saath_current_senior_id',
  CURRENT_STUDENT_ID: 'saath_current_student_id',
  SENIORS: 'saath_seniors',
  STUDENTS: 'saath_students',
  BOOKINGS: 'saath_bookings',
  REVIEWS: 'saath_reviews',
  MESSAGES: 'saath_messages',
  REPORTS: 'saath_reports',
  NOTIFICATIONS: 'saath_notifications',
  OBSERVATIONS: 'saath_observations',
  CARE_PLANS: 'saath_care_plans',
  LANGUAGE: 'saath_language',
  ACTIVITIES: 'saath_social_activities',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('senior');
  const [language, setLanguage] = useState<LanguageMode>('mr');
  const [currentSeniorId, setCurrentSeniorId] = useState<string>('senior-1');
  const [currentStudentId, setCurrentStudentId] = useState<string>('student-1');

  const [seniors, setSeniors] = useState<SeniorProfile[]>(INITIAL_SENIORS);
  const [students, setStudents] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [observations, setObservations] = useState<VisitObservation[]>(INITIAL_OBSERVATIONS);
  const [carePlans, setCarePlans] = useState<CarePlanSubscription[]>(INITIAL_CARE_PLANS);
  const [socialActivities, setSocialActivities] = useState<SocialActivity[]>(INITIAL_SOCIAL_ACTIVITIES);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'mr' ? 'en' : 'mr'));
  };

  const registerForActivity = (activityId: string) => {
    const activeUserId = role === 'student' ? currentStudentId : currentSeniorId;
    setSocialActivities(prev =>
      prev.map(act => {
        if (act.id === activityId) {
          if (act.registeredUserIds.includes(activeUserId)) {
            showToast('तुम्ही आधीच या उपक्रमासाठी नोंदणी केली आहे! (Already registered)');
            return act;
          }
          showToast('उपक्रमासाठी नोंदणी यशस्वी झाली! (Successfully registered)');
          return {
            ...act,
            registeredCount: act.registeredCount + 1,
            registeredUserIds: [...act.registeredUserIds, activeUserId],
          };
        }
        return act;
      })
    );
  };

  const unregisterFromActivity = (activityId: string) => {
    const activeUserId = role === 'student' ? currentStudentId : currentSeniorId;
    setSocialActivities(prev =>
      prev.map(act => {
        if (act.id === activityId && act.registeredUserIds.includes(activeUserId)) {
          showToast('नोंदणी रद्द केली आहे. (Registration cancelled)');
          return {
            ...act,
            registeredCount: Math.max(0, act.registeredCount - 1),
            registeredUserIds: act.registeredUserIds.filter(id => id !== activeUserId),
          };
        }
        return act;
      })
    );
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
      if (savedRole && ['senior', 'student', 'family', 'admin'].includes(savedRole)) {
        setRoleState(savedRole as UserRole);
      }
      const savedSeniorId = localStorage.getItem(STORAGE_KEYS.CURRENT_SENIOR_ID);
      if (savedSeniorId) setCurrentSeniorId(savedSeniorId);

      const savedStudentId = localStorage.getItem(STORAGE_KEYS.CURRENT_STUDENT_ID);
      if (savedStudentId) setCurrentStudentId(savedStudentId);

      const savedSeniors = localStorage.getItem(STORAGE_KEYS.SENIORS);
      if (savedSeniors) setSeniors(JSON.parse(savedSeniors));

      const savedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (savedStudents) setStudents(JSON.parse(savedStudents));

      const savedBookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (savedBookings) setBookings(JSON.parse(savedBookings));

      const savedReviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (savedReviews) setReviews(JSON.parse(savedReviews));

      const savedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (savedMessages) setMessages(JSON.parse(savedMessages));

      const savedReports = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (savedReports) setReports(JSON.parse(savedReports));

      const savedNotifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (savedNotifications) setNotifications(JSON.parse(savedNotifications));

      const savedObservations = localStorage.getItem(STORAGE_KEYS.OBSERVATIONS);
      if (savedObservations) setObservations(JSON.parse(savedObservations));

      const savedCarePlans = localStorage.getItem(STORAGE_KEYS.CARE_PLANS);
      if (savedCarePlans) setCarePlans(JSON.parse(savedCarePlans));
    } catch (e) {
      console.error('Error loading Saath state from localStorage:', e);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.ROLE, role); } catch {}
  }, [role]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.CURRENT_SENIOR_ID, currentSeniorId); } catch {}
  }, [currentSeniorId]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT_ID, currentStudentId); } catch {}
  }, [currentStudentId]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.SENIORS, JSON.stringify(seniors)); } catch {}
  }, [seniors]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students)); } catch {}
  }, [students]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings)); } catch {}
  }, [bookings]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews)); } catch {}
  }, [reviews]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages)); } catch {}
  }, [messages]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.OBSERVATIONS, JSON.stringify(observations)); } catch {}
  }, [observations]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.CARE_PLANS, JSON.stringify(carePlans)); } catch {}
  }, [carePlans]);

  const switchRole = (newRole: UserRole) => {
    setRoleState(newRole);
    const label =
      newRole === 'senior'
        ? 'Senior (Rajendra, Kolhapur)'
        : newRole === 'student'
        ? 'Student Companion (Aditya, ADCET)'
        : newRole === 'family'
        ? 'Family Member (Amit, Bangalore)'
        : 'Admin Control Center';
    showToast(`Switched view to ${label}`);
  };

  const setSeniorUser = (seniorId: string) => {
    setCurrentSeniorId(seniorId);
  };

  const setStudentUser = (studentId: string) => {
    setCurrentStudentId(studentId);
  };

  const currentSenior = seniors.find(s => s.id === currentSeniorId) || seniors[0];
  const currentStudent = students.find(s => s.id === currentStudentId) || students[0];

  const createBooking = (newBookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'paymentStatus'>): Booking => {
    const newId = `book-${Date.now().toString().slice(-4)}`;
    const createdBooking: Booking = {
      ...newBookingData,
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'pending',
      paymentStatus: 'paid',
      reviewSubmitted: false,
      observationSubmitted: false,
    };

    setBookings(prev => [createdBooking, ...prev]);

    // Send notifications
    const notifStudent: NotificationItem = {
      id: `notif-${Date.now()}-stu`,
      userId: newBookingData.companionId,
      title: 'New Booking Request! 🎉',
      message: `${newBookingData.seniorName} requested a ${newBookingData.durationMinutes}-min ${newBookingData.activity} session for ${newBookingData.date} at ${newBookingData.timeSlot}.`,
      type: 'booking',
      read: false,
      timestamp: 'Just now',
    };

    const notifFamily: NotificationItem = {
      id: `notif-${Date.now()}-fam`,
      userId: 'family-amit',
      title: 'Upcoming Parent Visit Booked 📅',
      message: `${newBookingData.companionName} scheduled to visit Rajendra for ${newBookingData.activity} on ${newBookingData.date}.`,
      type: 'booking',
      read: false,
      timestamp: 'Just now',
    };

    setNotifications(prev => [notifStudent, notifFamily, ...prev]);
    showToast(`Session booked with ${newBookingData.companionName}! Family notified.`);

    return createdBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status } : b))
    );

    if (status === 'accepted') {
      showToast(`Booking accepted! Confirmed session with ${booking.seniorName}.`);
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          userId: booking.seniorId,
          title: 'Booking Accepted! 🤝',
          message: `${booking.companionName} accepted your session for ${booking.date} at ${booking.timeSlot}.`,
          type: 'booking',
          read: false,
          timestamp: 'Just now',
        },
        ...prev,
      ]);
    } else if (status === 'completed') {
      // Add earnings to student
      setStudents(prev =>
        prev.map(s => {
          if (s.id === booking.companionId) {
            return {
              ...s,
              totalEarnings: s.totalEarnings + (booking.totalAmount - booking.serviceFee),
              completedSessionsCount: s.completedSessionsCount + 1,
            };
          }
          return s;
        })
      );
      showToast(`Session completed! ₹${booking.totalAmount - booking.serviceFee} added to earnings.`);
    } else if (status === 'cancelled') {
      showToast(`Booking cancelled.`);
    } else if (status === 'rejected') {
      showToast(`Booking declined.`);
    }
  };

  const submitVisitObservation = (obsData: Omit<VisitObservation, 'id' | 'familyNotified'>) => {
    const newObs: VisitObservation = {
      ...obsData,
      id: `obs-${Date.now().toString().slice(-4)}`,
      familyNotified: true,
    };

    setObservations(prev => [newObs, ...prev]);

    // Mark booking as observationSubmitted
    setBookings(prev =>
      prev.map(b => (b.id === obsData.bookingId ? { ...b, observationSubmitted: true } : b))
    );

    // Notify family
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}-obs`,
        userId: 'family-amit',
        title: 'New Visit Observation Report 🌿',
        message: `${obsData.companionName} logged notes for ${obsData.seniorName}: Mood: ${obsData.mood}. Routine on track.`,
        type: 'observation',
        read: false,
        timestamp: 'Just now',
      },
      ...prev,
    ]);

    showToast('Visit Observation Report saved & transmitted to family circle in Bangalore!');
  };

  const subscribeCarePlan = (planData: Omit<CarePlanSubscription, 'id' | 'status' | 'visitsCompleted'>) => {
    const newPlan: CarePlanSubscription = {
      ...planData,
      id: `plan-${Date.now().toString().slice(-4)}`,
      status: 'active',
      visitsCompleted: 0,
    };
    setCarePlans(prev => [newPlan, ...prev]);
    showToast(`Subscribed to ${planData.planName}! Visits scheduled for parent.`);
  };

  const addReview = (newReviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...newReviewData,
      id: `rev-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
    };

    setReviews(prev => [newReview, ...prev]);

    setBookings(prev =>
      prev.map(b => (b.id === newReviewData.bookingId ? { ...b, reviewSubmitted: true } : b))
    );

    setStudents(prev =>
      prev.map(s => {
        if (s.id === newReviewData.companionId) {
          const studentReviews = [...reviews.filter(r => r.companionId === s.id), newReview];
          const avgRating =
            studentReviews.reduce((sum, r) => sum + r.rating, 0) / studentReviews.length;
          return {
            ...s,
            rating: Math.round(avgRating * 10) / 10,
            reviewCount: studentReviews.length,
          };
        }
        return s;
      })
    );

    showToast('Thank you! Your 5-star review has been published.');
  };

  const sendMessage = (bookingId: string | undefined, companionId: string, seniorId: string, text: string) => {
    if (!text.trim()) return;
    const isSenior = role === 'senior';
    const isFamily = role === 'family';

    const senderName = isSenior
      ? currentSenior.name
      : isFamily
      ? 'Amit Kulkarni (Son in Bangalore)'
      : currentStudent.name;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      bookingId,
      companionId,
      seniorId,
      senderId: isSenior ? seniorId : isFamily ? 'family-amit' : companionId,
      senderName,
      senderRole: role,
      text: text.trim(),
      timestamp: 'Just now',
      isRead: false,
    };

    setMessages(prev => [...prev, newMsg]);

    if (isSenior || isFamily) {
      setTimeout(() => {
        const autoReply: Message = {
          id: `msg-${Date.now() + 1}`,
          bookingId,
          companionId,
          seniorId,
          senderId: companionId,
          senderName: currentStudent.name,
          senderRole: 'student',
          text: `Namaskar! Received your message: "${text.trim()}". I am looking forward to our session and will post a detailed update after our visit!`,
          timestamp: 'Just now',
          isRead: true,
        };
        setMessages(m => [...m, autoReply]);
      }, 1500);
    }
  };

  const updateStudentProfile = (updated: Partial<StudentProfile>) => {
    setStudents(prev =>
      prev.map(s => (s.id === currentStudentId ? { ...s, ...updated } : s))
    );
    showToast('Student profile updated successfully!');
  };

  const updateSeniorProfile = (updated: Partial<SeniorProfile>) => {
    setSeniors(prev =>
      prev.map(s => (s.id === currentSeniorId ? { ...s, ...updated } : s))
    );
    showToast('Senior profile updated successfully!');
  };

  const updateEmergencyContact = (contact: EmergencyContact) => {
    setSeniors(prev =>
      prev.map(s => (s.id === currentSeniorId ? { ...s, emergencyContact: contact } : s))
    );
    showToast('Family circle preferences saved! Session alert dispatches active.');
  };

  const submitStudentVerification = (studentId: string) => {
    setStudents(prev =>
      prev.map(s => (s.id === studentId ? { ...s, verificationStatus: 'pending' } : s))
    );
    showToast('College ID submitted for verification! Admin will review shortly.');
  };

  const verifyStudentByAdmin = (studentId: string, approve: boolean) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === studentId
          ? {
              ...s,
              isVerified: approve,
              verificationStatus: approve ? 'verified' : 'rejected',
            }
          : s
      )
    );
    showToast(approve ? 'Student College ID Approved!' : 'Student verification rejected.');
  };

  const submitReport = (reportData: Omit<Report, 'id' | 'status' | 'date'>) => {
    const newReport: Report = {
      ...reportData,
      id: `rep-${Date.now()}`,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    setReports(prev => [newReport, ...prev]);
    showToast('Safety incident reported. Our trust & safety team has been alerted.');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const resetDemoData = () => {
    try {
      localStorage.clear();
      setRoleState('senior');
      setCurrentSeniorId('senior-1');
      setCurrentStudentId('student-1');
      setSeniors(INITIAL_SENIORS);
      setStudents(INITIAL_STUDENTS);
      setBookings(INITIAL_BOOKINGS);
      setReviews(INITIAL_REVIEWS);
      setMessages(INITIAL_MESSAGES);
      setReports(INITIAL_REPORTS);
      setNotifications(INITIAL_NOTIFICATIONS);
      setObservations(INITIAL_OBSERVATIONS);
      setCarePlans(INITIAL_CARE_PLANS);
      setSocialActivities(INITIAL_SOCIAL_ACTIVITIES);
      setLanguage('mr');
      showToast('Reset demo state to pristine initial presentation data!');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        language,
        setLanguage,
        toggleLanguage,
        currentSenior,
        currentStudent,
        seniors,
        students,
        bookings,
        reviews,
        messages,
        reports,
        notifications,
        observations,
        carePlans,
        socialActivities,
        registerForActivity,
        unregisterFromActivity,
        switchRole,
        setSeniorUser,
        setStudentUser,
        createBooking,
        updateBookingStatus,
        addReview,
        submitVisitObservation,
        subscribeCarePlan,
        sendMessage,
        updateStudentProfile,
        updateSeniorProfile,
        updateEmergencyContact,
        submitStudentVerification,
        verifyStudentByAdmin,
        submitReport,
        markNotificationAsRead,
        resetDemoData,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
