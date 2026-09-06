export type Tone = '' | 'ember' | 'ink';
export type StatusTone = 'ok' | 'warn' | 'muted' | '';

export const staff = {
  name: 'Maya Chen',
  initials: 'MC',
  role: 'Club manager · Downtown'
};

export const navClub = [
  { path: '/', label: 'Dashboard', icon: 'grid-1x2', exact: true, group: 'Home' },
  { path: '/members', label: 'Members', icon: 'people', group: 'Club' },
  { path: '/trainers', label: 'Trainers', icon: 'person-badge', group: 'Club' },
  { path: '/classes', label: 'Classes', icon: 'calendar2-week', group: 'Club' },
  { path: '/checkins', label: 'Check-in', icon: 'qr-code-scan', badge: '8', group: 'Club' },
  { path: '/memberships', label: 'Memberships', icon: 'credit-card', group: 'Club' }
];

export const navTemplate = [
  { path: '/about', label: 'About', icon: 'info-circle', group: 'Template' },
  { path: '/docs', label: 'Docs', icon: 'journal-text', group: 'Template' },
  { path: '/contact', label: 'Contact', icon: 'headset', group: 'Template' }
];

export const kpis = [
  { icon: 'people', label: 'Active members', value: '1,284', hint: '+18 this week' },
  { icon: 'box-arrow-in-right', label: 'Check-ins today', value: '186', hint: 'Peak 6–8 AM' },
  { icon: 'activity', label: 'Class fill', value: '91%', hint: '2 waitlists' },
  { icon: 'currency-dollar', label: 'Membership MRR', value: '$84.2k', hint: '12 dues overdue' }
];

export const classes = [
  { time: '6:00 AM', name: 'Sunrise Cycle', coach: 'Cole Brennan', studio: 'Ride Room', studioKey: 'ride', fill: '18/20', pct: 90, status: 'open', action: 'book' as const },
  { time: '7:15 AM', name: 'Strength Lab', coach: 'Elena Vasquez', studio: 'Iron Floor', studioKey: 'iron', fill: 'Waitlist 6', pct: 100, status: 'full', action: 'waitlist' as const },
  { time: '9:00 AM', name: 'Power Yoga', coach: 'Lila Ortega', studio: 'Loft', studioKey: 'loft', fill: '14/16', pct: 88, status: 'open', action: 'book' as const },
  { time: '12:15 PM', name: 'Lunch HIIT', coach: 'David Okonkwo', studio: 'Studio B', studioKey: 'studio', fill: '10/16', pct: 62, status: 'open', action: 'book' as const },
  { time: '5:30 PM', name: 'After-work Strength', coach: 'Elena Vasquez', studio: 'Iron Floor', studioKey: 'iron', fill: '16/18', pct: 89, status: 'open', action: 'cancel' as const },
  { time: '6:45 PM', name: 'Ride Club', coach: 'Cole Brennan', studio: 'Ride Room', studioKey: 'ride', fill: 'Full', pct: 100, status: 'full', action: 'waitlist' as const }
];

export const zones = [
  { name: 'Weights', pct: 78 },
  { name: 'Cardio deck', pct: 64 },
  { name: 'Ride Room', pct: 90 },
  { name: 'Locker rooms', pct: 41 }
];

export const alerts = [
  { icon: 'exclamation-triangle', title: '12 memberships overdue', detail: 'Follow up before Friday freeze window.' },
  { icon: 'tools', title: 'Rack 4 cable out of service', detail: 'Tech booked 4:00 PM.' },
  { icon: 'hourglass-split', title: 'Strength Lab waitlist = 6', detail: 'Offer 6:00 PM overflow class.' }
];

export const recentCheckins = [
  { name: 'Jordan Hale', id: '#4821', initials: 'JH', tone: '' as Tone, plan: 'Unlimited', time: '6:02 AM', gate: 'Gate A', status: 'In club', statusTone: 'ok' as StatusTone },
  { name: 'Priya Raman', id: '#3904', initials: 'PR', tone: 'ember' as Tone, plan: '3-day', time: '6:08 AM', gate: 'Gate A', status: 'In club', statusTone: 'ok' as StatusTone },
  { name: 'Luis Ortega', id: '#2750', initials: 'LO', tone: 'ink' as Tone, plan: 'PT pack', time: '6:11 AM', gate: 'PT suite', status: 'Expiring', statusTone: 'warn' as StatusTone },
  { name: 'Amira Haddad', id: '#5118', initials: 'AH', tone: '' as Tone, plan: 'Student', time: '7:40 AM', gate: 'Gate B', status: 'Frozen', statusTone: 'muted' as StatusTone }
];

export const checkinLog = [
  { time: '6:02 AM', member: 'Jordan Hale', gate: 'Gate A', plan: 'Unlimited' },
  { time: '6:08 AM', member: 'Priya Raman', gate: 'Gate A', plan: '3-day' },
  { time: '6:11 AM', member: 'Luis Ortega', gate: 'PT suite', plan: 'PT pack' },
  { time: '6:18 AM', member: 'Noah Kim', gate: 'Gate B', plan: 'Unlimited' },
  { time: '6:22 AM', member: 'Sofia Reyes', gate: 'Gate A', plan: '3-day' },
  { time: '7:40 AM', member: 'Amira Haddad', gate: 'Gate B', plan: 'Student · frozen' },
  { time: '7:51 AM', member: 'Guest · Hale', gate: 'Gate A', plan: 'Day pass' },
  { time: '8:04 AM', member: 'Elena Vasquez', gate: 'Staff', plan: 'Coach' }
];

export const members = [
  { name: 'Jordan Hale', id: '#4821', joined: 'Jan 2024', initials: 'JH', tone: '' as Tone, plan: 'unlimited', planLabel: 'Unlimited', status: 'active', note: 'Last visit today 6:02 AM · 14 check-ins this week', action: 'standard' as const },
  { name: 'Priya Raman', id: '#3904', joined: 'Mar 2025', initials: 'PR', tone: 'ember' as Tone, plan: '3-day', planLabel: '3-day', status: 'active', note: 'Last visit today 6:08 AM · Strength Lab regular', action: 'standard' as const },
  { name: 'Luis Ortega', id: '#2750', joined: 'Aug 2023', initials: 'LO', tone: 'ink' as Tone, plan: 'pt', planLabel: 'PT pack', status: 'expiring', note: '2 sessions left with Elena · renews Sep 12', action: 'standard' as const },
  { name: 'Amira Haddad', id: '#5118', joined: 'Sep 2025', initials: 'AH', tone: '' as Tone, plan: 'student', planLabel: 'Student', status: 'frozen', note: 'Freeze until Sep 20 · access paused at gates', action: 'frozen' as const },
  { name: 'Noah Kim', id: '#4488', joined: 'Jun 2022', initials: 'NK', tone: 'ember' as Tone, plan: 'unlimited', planLabel: 'Unlimited', status: 'active', note: 'Ride Club 6:45 PM waitlisted', action: 'standard' as const },
  { name: 'Sofia Reyes', id: '#3291', joined: 'Nov 2024', initials: 'SR', tone: '' as Tone, plan: '3-day', planLabel: '3-day', status: 'expiring', note: 'Card ends Sep 8 · offer Unlimited upgrade', action: 'upgrade' as const }
];

export const trainers = [
  { name: 'Elena Vasquez', role: 'Head of Strength · 8 yrs', initials: 'EV', tone: 'ember' as Tone, focus: 'strength', status: 'on-floor', statusLabel: 'On floor', note: '7:15 AM Strength Lab (full) · 5:30 PM After-work Strength · 3 PT seats open' },
  { name: 'Cole Brennan', role: 'Cycle lead · 6 yrs', initials: 'CB', tone: '' as Tone, focus: 'cycle', status: 'on-floor', statusLabel: 'On floor', note: '6:00 AM Sunrise Cycle · 6:45 PM Ride Club (full)' },
  { name: 'David Okonkwo', role: 'HIIT · 5 yrs', initials: 'DO', tone: 'ink' as Tone, focus: 'hiit', status: 'on-floor', statusLabel: 'On floor', note: '12:15 PM Lunch HIIT · Studio B · 6 spots left' },
  { name: 'Lila Ortega', role: 'Yoga & mobility · 7 yrs', initials: 'LO', tone: '' as Tone, focus: 'yoga', status: 'off', statusLabel: 'Off until 8:30', note: '9:00 AM Power Yoga · Loft · 2 spots left' }
];

export const plans = [
  { kicker: 'Most popular', name: 'Unlimited', price: '$89', unit: '/mo', detail: 'All classes, open gym, 2 guest passes. 742 members.' },
  { kicker: 'Off-peak', name: '3-day', price: '$59', unit: '/mo', detail: 'Mon / Wed / Fri access. 318 members.' },
  { kicker: 'Coaching', name: 'PT pack', price: '$720', unit: '/8', detail: 'Eight 45-minute sessions. 96 packs active.' }
];

export const dues = [
  { name: 'Sofia Reyes', plan: '3-day', amount: '$59', due: 'Sep 8', status: 'Expiring', tone: 'warn' as StatusTone, action: 'upgrade' as const },
  { name: 'Luis Ortega', plan: 'PT pack', amount: '$180', due: 'Sep 12', status: '2 sessions left', tone: 'warn' as StatusTone, action: 'remind' as const },
  { name: 'Amira Haddad', plan: 'Student', amount: '$0', due: 'Sep 20', status: 'Frozen', tone: 'muted' as StatusTone, action: 'unfreeze' as const },
  { name: 'Noah Kim', plan: 'Unlimited', amount: '$89', due: 'Sep 1', status: 'Current', tone: 'ok' as StatusTone, action: 'freeze' as const }
];

export const memberNames = ['Jordan Hale', 'Priya Raman', 'Luis Ortega', 'Noah Kim', 'Sofia Reyes'];
export const gates = ['Gate A', 'Gate B', 'PT suite'];

export function avatarClass(tone: Tone, large = false): string {
  const size = large ? ' gxd-avatar-lg' : '';
  if (tone === 'ember') return `gxd-avatar${size} gxd-avatar-ember`;
  if (tone === 'ink') return `gxd-avatar${size} gxd-avatar-ink`;
  return `gxd-avatar${size}`;
}

export function badgeClass(tone: StatusTone | string): string {
  if (tone === 'ok' || tone === 'active' || tone === 'on-floor') return 'gxd-badge gxd-badge-ok';
  if (tone === 'warn' || tone === 'expiring') return 'gxd-badge gxd-badge-warn';
  if (tone === 'muted' || tone === 'frozen' || tone === 'off') return 'gxd-badge gxd-badge-muted';
  return 'gxd-badge';
}
