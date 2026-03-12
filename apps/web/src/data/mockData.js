export const CURRENT_USER = {
  id: 'u1',
  name: 'MHD Mirsadh',
  email: 'mirsadhmhd@gmail.com',
  initials: 'MM',
  color: '#00e5a0',
}

export const INITIAL_FRIENDS = [
  { id: 'u2', name: 'Sara Ali',      initials: 'SA', color: '#ff4b5a', balance:  45.50 },
  { id: 'u3', name: 'Karim Hassan',  initials: 'KH', color: '#ffb938', balance: -20.00 },
  { id: 'u4', name: 'Lena Nour',     initials: 'LN', color: '#4dabf7', balance:   0    },
  { id: 'u5', name: 'Ziad Omar',     initials: 'ZO', color: '#a78bfa', balance:  12.75 },
  { id: 'u6', name: 'Rania Fawzi',   initials: 'RF', color: '#f97316', balance: -8.30  },
]

export const INITIAL_GROUPS = [
  {
    id: 'g1',
    name: 'CS Dorm — Floor 3',
    emoji: '🏠',
    members: ['u1','u2','u3','u6'],
    balance: 67.50,
    color: '#00e5a0',
    description: 'Shared living expenses',
  },
  {
    id: 'g2',
    name: 'Study Crew',
    emoji: '📚',
    members: ['u1','u4','u5'],
    balance: -15.00,
    color: '#a78bfa',
    description: 'Library runs & supplies',
  },
  {
    id: 'g3',
    name: 'Cafeteria Gang',
    emoji: '☕',
    members: ['u1','u2','u5','u3'],
    balance: 0,
    color: '#ffb938',
    description: 'Daily food & drinks',
  },
]

export const INITIAL_EXPENSES = [
  {
    id: 'e1', title: 'Pizza Night',       amount: 54.00, paidBy: 'u1',
    splitWith: ['u2','u3'], date: '2026-03-10', category: 'food', groupId: 'g1',
  },
  {
    id: 'e2', title: 'Textbooks',          amount: 120.00, paidBy: 'u3',
    splitWith: ['u1','u2'], date: '2026-03-08', category: 'education', groupId: null,
  },
  {
    id: 'e3', title: 'Uber to Campus',     amount: 18.00, paidBy: 'u1',
    splitWith: ['u4'], date: '2026-03-07', category: 'transport', groupId: null,
  },
  {
    id: 'e4', title: 'Grocery Run',        amount: 85.50, paidBy: 'u2',
    splitWith: ['u1','u3','u5'], date: '2026-03-05', category: 'food', groupId: 'g1',
  },
  {
    id: 'e5', title: 'Netflix Split',      amount: 15.00, paidBy: 'u5',
    splitWith: ['u1'], date: '2026-03-01', category: 'entertainment', groupId: 'g2',
  },
  {
    id: 'e6', title: 'Lab Equipment',      amount: 42.00, paidBy: 'u1',
    splitWith: ['u4','u5'], date: '2026-02-28', category: 'education', groupId: 'g2',
  },
  {
    id: 'e7', title: 'Coffee & Pastries',  amount: 22.40, paidBy: 'u6',
    splitWith: ['u1','u2'], date: '2026-02-25', category: 'food', groupId: 'g3',
  },
]

export const CATEGORY_META = {
  food:          { emoji: '🍕', label: 'Food',          color: '#f97316' },
  education:     { emoji: '📖', label: 'Education',     color: '#6366f1' },
  transport:     { emoji: '🚗', label: 'Transport',     color: '#06b6d4' },
  entertainment: { emoji: '🎬', label: 'Entertainment', color: '#ec4899' },
  utilities:     { emoji: '⚡', label: 'Utilities',     color: '#eab308' },
  health:        { emoji: '💊', label: 'Health',        color: '#22c55e' },
  other:         { emoji: '💸', label: 'Other',         color: '#8b5cf6' },
}
