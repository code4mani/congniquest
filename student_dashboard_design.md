# Student Dashboard Design

## Overview
The student dashboard is the main landing page for students after login. It provides a personalized, actionable overview of their learning journey, progress, and upcoming tasks.

---

## Key Sections & Features

### 1. Welcome/Header
- Student’s name, avatar, and greeting
- Quick link to profile/settings

### 2. Progress Overview
- Visual progress bar (weekly or overall)
- Stats: lessons completed, streaks, badges

### 3. Upcoming Lessons
- List/cards for today’s or upcoming lessons
- “Continue Lesson” button for in-progress content

### 4. Assignments & Homework
- List of active assignments with due dates and status
- Quick action to start or submit homework

### 5. Recent Activity
- Timeline/list of recent quizzes, practice sessions, or chat interactions

### 6. AI Chat/Ask a Question
- Prominent button or input to “Ask the AI” or “Start a Chat”

### 7. Practice & Quizzes
- Quick access to practice worksheets, quizzes, or recommended exercises

### 8. Announcements/Notifications
- Teacher messages, new content alerts, or system notifications

### 9. Handwriting Practice
- Shortcut to handwriting input or practice area

### 10. Resources
- Links to study guides, reference materials, or helpful articles

---

## Progress Bar Calculation
- **Lesson Progress:** (Completed Lessons / Assigned Lessons) × 100%
- **Homework Progress:** (On-Time Submissions / Assigned Homework) × 100%
- **Combined Progress:** Average or weighted sum of lesson and homework progress

---

## Weekly Leaderboard
- Points for each lesson completed
- Bonus points for homework submitted on time
- Extra points for quiz scores or participation
- Display top N students with avatars and scores

---

## Example Layout (Wireframe)

```
-------------------------------------------------
|  Header: Welcome, [Student Name]   [Avatar]   |
-------------------------------------------------
|  [Progress Bar]   [Streaks]   [Badges]        |
-------------------------------------------------
|  Upcoming Lessons      |  Assignments/Homework |
|  [Lesson Card]         |  [Assignment Card]    |
|  [Lesson Card]         |  [Assignment Card]    |
-------------------------------------------------
|  Recent Activity       |  AI Chat/Ask a Q      |
|  [Activity List]       |  [Chat Input/Button]  |
-------------------------------------------------
|  Practice & Quizzes    |  Resources           |
|  [Quiz Card]           |  [Resource Links]    |
-------------------------------------------------
|  Announcements/Notifications                  |
|  [Notification List]                          |
-------------------------------------------------
```

---

## Data & Tracking
- Store lesson, homework, and quiz completion in Firestore
- Track weekly points for leaderboard
- Use timestamps to determine on-time submissions

---

## UI/UX Notes
- Mobile-friendly, responsive grid
- Use cards and clear section headers
- Show actionable items (e.g., “Continue”, “Submit”, “Ask AI”)
