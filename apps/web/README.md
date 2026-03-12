# UniSplit 💸
### Student Expense & Loan Tracker

A mobile-first React app for university students to track shared expenses, split bills, and manage group loans.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

For the best experience, open DevTools → Toggle Device Toolbar → choose a mobile size (e.g. iPhone 14, 390×844).

---

## 📱 Features

### Core
- **Home Dashboard** — Net balance hero, quick actions, group & expense overview
- **Groups** — Create groups, view members, drill into group expenses
- **Friends** — Split by person, see who owes what, settle up with one tap
- **Activity** — Full expense history with category filters
- **Account** — Profile, spending breakdown by category, settings

### Expense Flow
- 2-step "Add Expense" bottom sheet
- Category picker (food, education, transport, entertainment, utilities, health)
- Split-with friend selector with per-person calculation preview
- Real-time balance updates after adding expenses

### UX Details
- Dark theme with teal/green accent
- Syne display font + DM Sans body
- Animated bottom sheet, toast confirmations
- Scroll-locked mobile layout

---

## 🏗 Project Structure

```
src/
├── components/
│   ├── UI.jsx            # Avatar, Card, Button, Input, BottomSheet, Toast...
│   ├── BottomNav.jsx     # Tab navigation
│   └── AddExpenseModal.jsx
├── screens/
│   ├── HomeScreen.jsx
│   ├── GroupsScreen.jsx
│   ├── FriendsScreen.jsx
│   ├── ActivityScreen.jsx
│   └── AccountScreen.jsx
├── hooks/
│   └── useStore.js       # Central state (React useState, no external libs)
├── data/
│   └── mockData.js       # Seed data & constants
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🔧 Tech Stack

- **React 18** (hooks only, no class components)
- **Vite** (instant dev server, fast HMR)
- **Zero UI libraries** — all styles are inline CSS with CSS variables
- **No Redux** — simple `useState` in `useStore.js` hook

---

## 🎨 Design System

CSS variables in `index.css`:

| Token | Value | Usage |
|---|---|---|
| `--green` | `#00e5a0` | Primary accent |
| `--red` | `#ff4b5a` | Negative balance |
| `--bg` | `#0a0b0f` | App background |
| `--surface` | `#111318` | Cards |
| `--font-display` | Syne | Headers |
| `--font-body` | DM Sans | Body text |

---

## 🗺 Next Steps (for backend integration)

1. Replace `useStore.js` with API calls (Express/FastAPI)
2. Add user authentication (JWT or session)
3. Persist data to PostgreSQL or SQLite
4. Add real-time updates with WebSockets or polling
5. Deploy with Docker or on a university server
