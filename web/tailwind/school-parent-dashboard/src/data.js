export const school = {
  name: 'Whitmore Academy',
  shortName: 'Whitmore',
  term: 'Fall Term 2026',
  campus: 'Riverside Campus',
};

export const parent = {
  firstName: 'Priya',
  lastName: 'Raman',
  name: 'Priya Raman',
  email: 'priya.raman@email.com',
  phone: '(415) 555-0148',
  role: 'Primary guardian',
  initials: 'PR',
};

export const children = [
  {
    id: 'anika',
    name: 'Anika Raman',
    firstName: 'Anika',
    grade: 'Grade 8',
    homeroom: '8-B',
    house: 'Hawthorne',
    teacher: 'Ms. Elena Vasquez',
    status: 'in-school',
    statusLabel: 'In school',
    attendancePct: 96.4,
    present: 27,
    absent: 1,
    late: 0,
    initials: 'AR',
    avatarClass: 'from-[#8a2048] to-[#760031] text-white',
  },
  {
    id: 'rohan',
    name: 'Rohan Raman',
    firstName: 'Rohan',
    grade: 'Grade 4',
    homeroom: '4-A',
    house: 'Maple',
    teacher: 'Mr. David Okonkwo',
    status: 'trip',
    statusLabel: 'Field trip',
    attendancePct: 98.2,
    present: 28,
    absent: 0,
    late: 1,
    initials: 'RR',
    avatarClass: 'from-[#3d4a66] to-[#243044] text-white',
  },
];

export const navItems = [
  { to: '/', label: 'Dashboard', icon: 'grid-1x2', end: true },
  { to: '/children', label: 'My Children', icon: 'people' },
  { to: '/attendance', label: 'Attendance', icon: 'calendar-check' },
  { to: '/grades', label: 'Grades', icon: 'journal-text' },
  { to: '/fees', label: 'Fees & Payments', icon: 'credit-card' },
  { to: '/messages', label: 'Messages', icon: 'chat-dots' },
  { to: '/calendar', label: 'Calendar', icon: 'calendar-event' },
  { to: '/documents', label: 'Documents', icon: 'folder2-open' },
  { to: '/settings', label: 'Settings', icon: 'gear' },
];

export const breadcrumbs = {
  '/': ['Home', 'Dashboard'],
  '/children': ['Home', 'My Children'],
  '/attendance': ['Home', 'Attendance'],
  '/grades': ['Home', 'Grades'],
  '/fees': ['Home', 'Fees & Payments'],
  '/messages': ['Home', 'Messages'],
  '/calendar': ['Home', 'Calendar'],
  '/documents': ['Home', 'Documents'],
  '/settings': ['Home', 'Settings'],
};

export const events = [
  {
    id: 'e1',
    title: 'Lower School Field Trip · Exploratorium',
    date: '2026-09-04',
    time: '8:15 AM – 2:30 PM',
    location: 'San Francisco, CA',
    childId: 'rohan',
    type: 'Trip',
  },
  {
    id: 'e2',
    title: 'Home soccer vs. Lakeside',
    date: '2026-09-09',
    time: '4:00 PM',
    location: 'Whitmore Athletic Field',
    childId: 'anika',
    type: 'Athletics',
  },
  {
    id: 'e3',
    title: 'Fall parent–teacher conferences',
    date: '2026-09-12',
    time: '1:00 PM – 6:00 PM',
    location: 'Hawthorne & Maple Houses',
    childId: null,
    type: 'Conference',
  },
  {
    id: 'e4',
    title: 'Upper School fall concert',
    date: '2026-09-18',
    time: '6:30 PM',
    location: 'Chapel Hall',
    childId: 'anika',
    type: 'Arts',
  },
  {
    id: 'e5',
    title: 'Book fair preview night',
    date: '2026-09-22',
    time: '5:00 PM – 7:00 PM',
    location: 'Library Commons',
    childId: null,
    type: 'Community',
  },
];

export const seedMessages = [
  {
    id: 'm1',
    sender: 'Ms. Elena Vasquez',
    role: 'Homeroom · Grade 8',
    subject: 'Science fair proposal due Friday',
    preview: 'Anika’s group should submit the one-page proposal by 3 PM. I left comments on the draft in Google Classroom.',
    time: '18 min ago',
    read: false,
    childId: 'anika',
  },
  {
    id: 'm2',
    sender: 'Athletics Office',
    role: 'Middle School sports',
    subject: 'Soccer practice moved to Thursday',
    preview: 'Wednesday practice is cancelled for field maintenance. Thursday 3:45 PM, bring water and shin guards.',
    time: '2 hours ago',
    read: false,
    childId: 'anika',
  },
  {
    id: 'm3',
    sender: 'Mr. David Okonkwo',
    role: 'Homeroom · Grade 4',
    subject: 'Permission slip for Friday’s trip',
    preview: 'Rohan is on the Exploratorium roster. Please confirm lunch preference in the form if you have not already.',
    time: 'Yesterday',
    read: false,
    childId: 'rohan',
  },
  {
    id: 'm4',
    sender: 'Business Office',
    role: 'Tuition & billing',
    subject: 'Fall installment reminder',
    preview: 'The September tuition installment of $1,850 is due September 15. You can pay online from Fees & Payments.',
    time: 'Mon',
    read: true,
    childId: null,
  },
  {
    id: 'm5',
    sender: 'Registrar',
    role: 'Student records',
    subject: 'Immunization record on file',
    preview: 'Thank you — Rohan’s updated immunization PDF was received and attached to his health folder.',
    time: 'Aug 28',
    read: true,
    childId: 'rohan',
  },
];

export const seedNotifications = [
  {
    id: 'n1',
    title: 'Permission slip pending',
    body: 'Exploratorium trip for Rohan — confirm by tomorrow morning.',
    time: '12 min ago',
    read: false,
    icon: 'clipboard-check',
  },
  {
    id: 'n2',
    title: 'Fee due September 15',
    body: '$1,850 fall installment is still outstanding.',
    time: '1 hour ago',
    read: false,
    icon: 'credit-card',
  },
  {
    id: 'n3',
    title: 'Early dismissal Friday',
    body: 'Campus closes at 12:30 PM. After-care is cancelled that day.',
    time: 'Yesterday',
    read: true,
    icon: 'megaphone',
  },
];

export const feeAccount = {
  outstanding: 1850,
  nextDue: 'September 15, 2026',
  status: 'Due soon',
  method: 'Visa •• 4242',
  lineItems: [
    { id: 'f1', label: 'Fall tuition installment', child: 'Family', amount: 1850, due: 'Sep 15', status: 'Due' },
    { id: 'f2', label: 'Grade 8 activity fee', child: 'Anika Raman', amount: 125, due: 'Aug 20', status: 'Paid' },
    { id: 'f3', label: 'Grade 4 field trip', child: 'Rohan Raman', amount: 45, due: 'Sep 1', status: 'Paid' },
    { id: 'f4', label: 'Lunch plan · September', child: 'Family', amount: 180, due: 'Sep 1', status: 'Paid' },
  ],
};

export const grades = [
  { id: 'g1', childId: 'anika', subject: 'Algebra I', grade: 'A−', score: 91, teacher: 'Mr. Cole Brennan', feedback: 'Strong work on linear systems; watch distribution signs.' },
  { id: 'g2', childId: 'anika', subject: 'English 8', grade: 'A', score: 94, teacher: 'Ms. Priya Nair', feedback: 'Thoughtful thesis on the memoir unit. Excellent citations.' },
  { id: 'g3', childId: 'anika', subject: 'Physical science', grade: 'B+', score: 88, teacher: 'Dr. Helen Cho', feedback: 'Lab write-up was complete; next time quantify error more clearly.' },
  { id: 'g4', childId: 'anika', subject: 'World history', grade: 'A−', score: 90, teacher: 'Mr. James Adeyemi', feedback: 'Map quiz improved. Keep using the timeline study sheet.' },
  { id: 'g5', childId: 'anika', subject: 'Visual arts', grade: 'A', score: 96, teacher: 'Ms. Lila Ortega', feedback: 'Print series shows real control of contrast and composition.' },
  { id: 'g6', childId: 'rohan', subject: 'Mathematics 4', grade: 'A', score: 95, teacher: 'Ms. Ruth Klein', feedback: 'Fractions unit is solid. Challenge set completed early.' },
  { id: 'g7', childId: 'rohan', subject: 'Reading workshop', grade: 'A−', score: 92, teacher: 'Mr. David Okonkwo', feedback: 'Great stamina in independent reading. Add more text evidence.' },
  { id: 'g8', childId: 'rohan', subject: 'Science 4', grade: 'A', score: 94, teacher: 'Ms. Amira Haddad', feedback: 'Curious questions during the habitats unit — keep them coming.' },
];

export const announcements = [
  {
    id: 'a1',
    tone: 'alert',
    title: 'Early dismissal this Friday',
    body: 'All divisions dismiss at 12:30 PM on September 5 for faculty in-service. After-care is cancelled.',
    date: 'Posted today',
  },
  {
    id: 'a2',
    tone: 'info',
    title: 'Campus flu clinic — September 16',
    body: 'The school nurse will host a walk-in clinic in the wellness suite from 9 AM to 1 PM. Consent forms are in Documents.',
    date: 'Posted Sep 1',
  },
  {
    id: 'a3',
    tone: 'notice',
    title: 'Fall uniform reminder',
    body: 'Navy blazers are required for chapel and concerts beginning September 18. The campus shop is open weekdays until 4 PM.',
    date: 'Posted Aug 29',
  },
];

export const documents = [
  { id: 'd1', name: 'Fall 2026 family handbook.pdf', type: 'PDF', size: '1.2 MB', updated: 'Aug 12', category: 'Policies' },
  { id: 'd2', name: 'Exploratorium permission slip.pdf', type: 'PDF', size: '220 KB', updated: 'Sep 1', category: 'Trips' },
  { id: 'd3', name: 'Immunization record — Rohan.pdf', type: 'PDF', size: '540 KB', updated: 'Aug 28', category: 'Health' },
  { id: 'd4', name: 'Progress report — Anika, Q1.pdf', type: 'PDF', size: '380 KB', updated: 'Aug 22', category: 'Academics' },
  { id: 'd5', name: 'Flu clinic consent form.pdf', type: 'PDF', size: '160 KB', updated: 'Sep 1', category: 'Health' },
];

export const attendanceDays = {
  anika: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'A', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  rohan: ['P', 'P', 'P', 'L', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
};

export const searchIndex = [
  { type: 'Child', label: 'Anika Raman', to: '/children' },
  { type: 'Child', label: 'Rohan Raman', to: '/children' },
  { type: 'Page', label: 'Attendance', to: '/attendance' },
  { type: 'Page', label: 'Grades', to: '/grades' },
  { type: 'Page', label: 'Fees & Payments', to: '/fees' },
  { type: 'Message', label: 'Science fair proposal due Friday', to: '/messages' },
  { type: 'Event', label: 'Fall parent–teacher conferences', to: '/calendar' },
  { type: 'Document', label: 'Family handbook', to: '/documents' },
];

export function formatLongDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatShortDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(y, m - 1, d));
}

export function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
