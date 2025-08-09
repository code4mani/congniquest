# CogniQuest MVP Development Checklist

## 1. AI-Powered Q&A System
- [✔️] Document ingestion and chunking (PDF upload, storage, and basic processing present)
- [⬜] Vector embeddings for semantic search (backend FastAPI, not in this repo)
- [⬜] RAG pipeline for contextual responses (backend)
- [✔️] Chat interface with message history (LessonChat UI exists)

## 2. Basic Worksheet Generator
- [✔️] Template-based worksheet generation (UI and PDF generation present)
- [✔️] PDF generation capabilities (PDF export in place)
- [🟡] Basic question extraction from content (Gemini Flash parsing stubbed, not fully implemented)
- [✔️] Simple UI for template selection

## 3. Multiple Choice Quiz System
- [✔️] Quiz generation from content (UI and logic present)
- [✔️] Real-time scoring (basic scoring implemented)
- [🟡] Basic progress tracking (UI present, analytics/dashboard partial)
- [🟡] Simple analytics dashboard (basic stats, not full dashboard)

## 4. Teacher Question Management System
- [✔️] Manual question creation interface (UI for 5 types)
- [🟡] PDF upload and parsing using Gemini Flash (UI present, backend/AI partial)
- [🟡] JSON editor for reviewing parsed questions (UI present, backend partial)
- [✔️] Question validation and saving to Firestore
- [✔️] Question management dashboard for teachers

## 5. Basic Handwriting Recognition
- [✔️] HTML5 Canvas for drawing input (Fabric.js integrated)
- [🟡] OCR integration for text recognition (stubbed, not fully functional)
- [🟡] Basic text matching for scoring (partial)
- [✔️] Image storage for submissions

## 6. Student Chat Interface with Lesson Content
- [✔️] Split-screen responsive layout (book view + chat window)
- [✔️] PDF/document viewer integration
- [✔️] Real-time chat with lesson context
- [✔️] Mobile-responsive design with collapsible panels
- [✔️] Chat history persistence per lesson

## 7. Daily Activity & Homework Management
- [✔️] PDF upload and parsing (UI present)
- [🟡] Homework extraction from structured tables (Gemini Flash/AI partial)
- [✔️] Calendar view with assignment visualization
- [✔️] Individual completion tracking
- [✔️] Grade-level homework sharing
- [✔️] Assignment notifications and reminders (basic)

## 8. Content Hierarchy & Access Control

### Admin-Only User & Role Management UI
- Admin page (protected) to view all users
- Add/edit/remove users
- Assign roles (admin, teacher, student)
- Set allowed status for access
- Search/filter users by email, role, allowed

### Lessons Management UI (Admin Only)
- Upload single lesson PDF with metadata:
	- Grade, Subject, Subsubject, Lesson Number, Lesson Title, etc.
- List/search lessons by metadata
- Edit lesson details
## 9. Infrastructure & Deployment
### Bulk Lesson Upload (Admin Only)
- Step 1: Upload multiple PDFs for a specific Grade-Subject-Subsubject
- Step 2: Enter/edit Lesson Number and Lesson Title for each file in a table before confirming upload
- Validate and confirm before saving to Firestore/Storage
- [✔️] Firebase Hosting for frontend
- [✔️] Firebase Auth, Firestore, Storage integration
- [✔️] ESLint, Prettier for frontend
- [⬜] Husky (git hooks) (not present)
- [⬜] Frontend tests (Jest/RTL not present)
- [⬜] E2E tests (Playwright not present)

## 11. Monitoring & Analytics
- [⬜] Sentry, New Relic, or DataDog integration
- [⬜] Google Analytics 4
## 12. Student Dashboard
- [ ] Dashboard UI layout (header, progress, lessons, assignments, activity, chat, leaderboard)
- [ ] Progress bar calculation (lessons, homework, combined)
- [ ] Weekly leaderboard (points, ranking, avatars)
- [ ] Upcoming lessons section
- [ ] Assignments/homework section (status, due dates)
- [ ] Recent activity feed
- [ ] AI chat/Ask a question integration
- [ ] Practice/quizzes quick access
- [ ] Announcements/notifications area
- [ ] Handwriting practice shortcut
- [ ] Resources/links section
- [ ] Firestore data structure for tracking progress and leaderboard
- [ ] Responsive/mobile-friendly design
## 13. Learn (Lessons) Page
- [ ] Hierarchical navigation: Grade → Subject → Sub-subject → Lesson (auto-select grade from profile)
- [ ] Lesson PDF viewer with split-screen chat window
- [ ] Predefined chat prompts (Summarize, Explain, List formulas, etc.)
- [ ] Free-form AI chat about lesson content
- [ ] QnA Tab: Browse, ask, and answer questions (fill-in-the-blank, MCQ, short/long answer)
- [ ] Import worksheet (PDF) and parse to editable JSON
- [ ] JSON review/edit UI for parsed questions
- [ ] Submit reviewed questions to database and list under QnA
- [ ] AI answer generation for QnA
- [ ] Upvote/like answers, filter/sort QnA
- [ ] Bookmark/favorite lessons
- [ ] Progress tracking for lessons (completed/in-progress)
- [ ] Notes section per lesson
- [ ] Related resources (links, worksheets, videos)
- [ ] Teacher’s corner (notes, tips, announcements)
- [ ] Peer discussion/comments per lesson
- [ ] Quiz/practice quick access
- [ ] Handwriting input for answers/notes (if relevant)
- [ ] Download/print lesson PDF
- [ ] Responsive/mobile-friendly design

---

**Legend:**
- ✔️ Complete
- 🟡 Partial/in progress
- ⬜ Not started
