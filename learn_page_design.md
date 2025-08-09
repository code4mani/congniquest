# Learn (Lessons) Page Design

## Overview
The Learn (or Lessons) page is the core interactive learning space for students. It allows hierarchical navigation through curriculum, lesson viewing, AI-powered chat, and a collaborative QnA section.

---

## Key Features & Flow

### 1. Hierarchical Navigation
- **Grade**: Auto-selected from student profile (editable if allowed)
- **Subject**: E.g., Science, Math
- **Sub-subject**: E.g., Physics, Chemistry
- **Lesson**: E.g., 1. Mechanics
- **Learn Button**: Loads the selected lesson

### 2. Lesson Viewer & Chat
- **PDF Viewer**: Displays the lesson content
- **Chat Window**: AI-powered chat for lesson Q&A
  - Predefined prompts: Summarize, Explain, List formulas, etc.
  - Free-form questions

### 3. QnA Tab
- **Browse Q&A**: View questions/answers from other students
- **Ask a Question**: Post new questions (fill-in-the-blank, MCQ, short/long answer)
- **Import Worksheet (PDF)**: Upload a worksheet PDF; content is parsed and displayed as editable JSON for review
- **JSON Review/Edit**: Students can review and edit the parsed questions in JSON format
- **Submit Questions**: After review, submit to store each question in the database and list under the questions list
- **AI Answers**: Generate answers using AI
- **Upvote/Like**: Upvote helpful answers
- **Filter/Sort**: By recent, upvoted, unanswered, etc.

### 4. Additional Features
- **Bookmark/Favorite Lessons**
- **Progress Tracking** (completed/in-progress lessons)
- **Notes Section** (private notes per lesson)
- **Related Resources** (links to related lessons, worksheets, videos)
- **Teacher’s Corner** (teacher notes, tips, announcements)
- **Peer Discussion** (threaded comments/forum per lesson)
- **Quiz/Practice Button** (quick access to practice questions/quizzes)
- **Handwriting Input** (for answers/notes, if relevant)
- **Download/Print** (lesson PDF)

---

## Example Layout

```
-------------------------------------------------
| Grade | Subject | Sub-subject | Lesson | [Learn] |
-------------------------------------------------
| [PDF Viewer]      | [Chat Window]              |
|                   | - Predefined Prompts       |
|                   | - Free-form Chat           |
-------------------------------------------------
| [Tabs: Lesson | QnA | Notes | Resources]       |
| QnA: Browse, Ask, Upvote, AI Answer            |
-------------------------------------------------
```

---

## Data & Tracking
- Store lesson, QnA, and progress data in Firestore
- Track which lessons are completed/in-progress
- Store QnA, upvotes, and AI answers per lesson

---

## UI/UX Notes
- Responsive, mobile-friendly layout
- Use cards, tabs, and clear section headers
- Show actionable items (e.g., “Learn”, “Ask”, “Bookmark”)
- Pre-fill grade/subject from student profile for quick access
