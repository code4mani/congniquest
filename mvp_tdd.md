# CogniQuest MVP - Technical Design Document

## 📋 Executive Summary
This document outlines the Minimum Viable Product (MVP) for CogniQuest, an AI-powered educational platform. The MVP focuses on core learning features with a simplified tech stack to enable rapid development and early user feedback.

## 🎯 MVP Scope & Objectives

### Primary Goal
Deliver a functional learning platform that demonstrates core AI-powered educational capabilities within 3-4 months of development.

### Success Criteria
- Students can interact with lesson content through AI chat
- Teachers can generate basic worksheets
- Basic quiz functionality with automated scoring
- Simple handwriting recognition for short answers
- 100+ concurrent users supported

## 🏗️ MVP Features

### 1. AI-Powered Q&A System (Core Feature)
**Description**: Students can ask questions about uploaded lesson content and receive contextual answers.

**User Stories**:
- As a student, I can upload lesson PDFs/documents
- As a student, I can ask questions about the content in natural language
- As a student, I can receive accurate, context-aware answers with source citations
- As a student, I can see conversation history

**Technical Requirements**:
- Document ingestion and chunking
- Vector embeddings for semantic search
- RAG pipeline for contextual responses
- Chat interface with message history

### 2. Basic Worksheet Generator
**Description**: Generate simple worksheets from lesson content in PDF format.

**User Stories**:
- As a teacher, I can select lesson topics
- As a teacher, I can choose worksheet type (MCQ, Fill-in-blanks)
- As a teacher, I can generate worksheets in PDF format
- As a teacher, I can preview worksheets before downloading

**Technical Requirements**:
- Template-based worksheet generation
- PDF generation capabilities
- Basic question extraction from content
- Simple UI for template selection

### 3. Multiple Choice Quiz System
**Description**: Interactive quizzes with immediate feedback and basic analytics.

**User Stories**:
- As a student, I can take auto-generated quizzes from lesson content
- As a student, I can receive immediate feedback on answers
- As a student, I can see my quiz scores and progress
- As a teacher, I can view student quiz performance

**Technical Requirements**:
- Quiz generation from content
- Real-time scoring
- Basic progress tracking
- Simple analytics dashboard

### 4. Teacher Question Management System
**Description**: Teachers can create and manage questions for lessons through manual input or bulk PDF upload.

**User Stories**:
- As a teacher, I can manually add different types of questions to any lesson
- As a teacher, I can upload a PDF worksheet and have it automatically parsed into questions
- As a teacher, I can review and edit the auto-parsed questions before saving
- As a teacher, I can organize questions by lesson and question type
- As a teacher, I can view and edit existing questions for lessons

**Technical Requirements**:
- Manual question creation interface (5 question types)
- PDF upload and parsing using Gemini Flash
- JSON editor for reviewing parsed questions
- Question validation and saving to Firestore
- Question management dashboard for teachers

**Question Types Supported**:
- Fill-in-the-blank
- Multiple Choice Questions (MCQ)
- Match the Following
- Short Answer Questions
- Long Answer Questions

### 5. Basic Handwriting Recognition
**Description**: Canvas-based handwritten answer submission with OCR evaluation.

**User Stories**:
- As a student, I can write answers on a digital canvas
- As a student, I can submit handwritten responses
- As a student, I can receive automated scoring for text-based answers
- As a teacher, I can review handwritten submissions

**Technical Requirements**:
- HTML5 Canvas for drawing input
- OCR integration for text recognition
- Basic text matching for scoring
- Image storage for submissions

### 7. Student Chat Interface with Lesson Content
**Description**: Interactive chat interface with side-by-side lesson content viewing.

**User Stories**:
- As a student, I can select a lesson and view its content alongside a chat window
- As a student, I can ask questions about the lesson while reading the material
- As a student, I can switch between different lesson files while maintaining chat context
- As a student, I can use the interface on different screen sizes (responsive design)

**Technical Requirements**:
- Split-screen responsive layout (book view + chat window)
- PDF/document viewer integration
- Real-time chat with lesson context
- Mobile-responsive design with collapsible panels
- Chat history persistence per lesson

### 8. Daily Activity & Homework Management
**Description**: Students can upload daily activity PDFs and view homework assignments in a calendar format.

**User Stories**:
- As a student, I can upload my daily activity PDF received via email
- As a student, I can view homework assignments in a calendar layout
- As a student, I can mark homework as completed in my personal calendar
- As a student, I can see homework shared across my grade level
- As a student, I can view homework details and submission dates

**Technical Requirements**:
- PDF upload and parsing using Gemini Flash
- Homework extraction from structured tables (Subject, Description, Date)
- Calendar view with assignment visualization
- Individual completion tracking
- Grade-level homework sharing
- Assignment notifications and reminders
**Description**: Admin-managed content hierarchy with student grade-based access.

**User Stories**:
- As an admin, I can upload lesson PDFs organized by grade/subject/lesson
- As an admin, I can manage student access and grade assignments
- As a student, I can access lessons appropriate for my grade level
- As a student, I can browse lessons by subject and topics

**Technical Requirements**:
- Firebase Authentication for all user roles
- Firestore for user profiles and lesson metadata
- Firebase Storage for lesson PDFs
- Grade-based content filtering
- Lesson hierarchy: Grade → Subject → Sub-subject → Lesson

## 🛠️ Tech Stack

### Frontend
**Framework**: **React 18** with TypeScript
- **Hosting**: Firebase Hosting
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Storage**: Firebase Storage
- **AI Integration**: Firebase AI (Gemini Flash) for client-side LLM calls
- **State Management**: Zustand or React Context
- **UI Library**: Tailwind CSS + Headless UI
- **Canvas Library**: Fabric.js (for handwriting input)

**Additional Frontend Libraries**:
```json
{
  "react": "^18.2.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "fabric": "^5.3.0",
  "firebase": "^10.0.0",
  "react-router-dom": "^6.15.0",
  "zustand": "^4.4.1",
  "react-pdf": "^7.3.3",
  "pdf-lib": "^1.17.1",
  "react-hook-form": "^7.45.4",
  "react-big-calendar": "^1.8.2",
  "react-split-pane": "^2.0.3",
  "@react-pdf-viewer/core": "^3.12.0",
  "@react-pdf-viewer/default-layout": "^3.12.0"
}
```

### Backend (Semantic Search Only)
**Framework**: **FastAPI** (Python) - Limited to semantic search functionality
- **Vector Database**: Firebase Vector Store
- **Embeddings**: OpenAI Ada-002
- **Document Processing**: LangChain + PyPDF2
- **Authentication**: Firebase Admin SDK for token verification

**Python Dependencies**:
```python
fastapi==0.103.0
firebase-admin==6.2.0
langchain==0.0.292
openai==0.28.0
pypdf2==3.0.1
sentence-transformers==2.2.2
google-cloud-firestore==2.11.1
```

### AI/ML Stack
**Primary LLM**: **Firebase AI with Gemini Flash** (client-side)
**Semantic Search**: **Backend FastAPI + OpenAI Embeddings**
- **Vector Database**: Firebase Vector Store
- **Embeddings**: OpenAI Ada-002 embeddings
- **Document Processing**: LangChain + PyPDF2
- **OCR Service**: **Google Vision API** (via Firebase ML)

**Architecture Split**:
- **Client-side**: Chat interactions, quiz generation, basic Q&A using Firebase AI
- **Server-side**: Document embedding, semantic search, complex RAG operations

**AI/ML Dependencies**:
```python
# Backend only
openai==0.28.0
langchain==0.0.292
firebase-admin==6.2.0
google-cloud-vision==3.4.4
pypdf2==3.0.1
sentence-transformers==2.2.2
```

```javascript
// Frontend
import { getGenerativeModel } from 'firebase/vertexai-preview';
import { initializeApp } from 'firebase/app';
```

### Database Schema
**Firestore Collections**:

**Users Collection**: `users/{userId}`
```javascript
{
  uid: string,
  email: string,
  role: "admin" | "student" | "teacher",
  grade: number, // e.g., 8 for 8th grade
  profile: {
    name: string,
    createdAt: timestamp,
    lastLoginAt: timestamp
  }
}
```

**Lessons Collection**: `lessons/{lessonId}`
```javascript
{
  grade: number,
  subject: string, // e.g., "Mathematics"
  subSubject: string, // e.g., "Algebra"
  lessonNumber: number,
  lessonTitle: string,
  additionalTags: string[],
  files: [{
    fileName: string,
    storageUrl: string,
    uploadedAt: timestamp,
    fileSize: number
  }],
  uploadedBy: string, // admin userId
  createdAt: timestamp,
  isActive: boolean
}
```

**Conversations Collection**: `conversations/{conversationId}`
```javascript
{
  userId: string,
  lessonId: string,
  messages: [{
    content: string,
    isUser: boolean,
    timestamp: timestamp,
    sources?: string[] // for semantic search results
  }],
  createdAt: timestamp,
  lastUpdatedAt: timestamp
}
```

**Quiz Attempts Collection**: `quizAttempts/{attemptId}`
```javascript
{
  userId: string,
  lessonId: string,
  questions: [{
    question: string,
    options: string[],
    correctAnswer: number,
    userAnswer: number,
    isCorrect: boolean
  }],
  score: number,
  completedAt: timestamp
}
```

**Questions Collection**: `questions/{questionId}`
```javascript
{
  lessonId: string,
  createdBy: string, // teacher userId
  questionType: "fill-in-blank" | "mcq" | "match-following" | "short-answer" | "long-answer",
  questionData: {
    // For MCQ
    question?: string,
    options?: string[],
    correctAnswer?: number,
    
    // For Fill-in-blank
    template?: string, // "The capital of France is ____"
    blanks?: [{ answer: string, position: number }],
    
    // For Match-the-following
    leftColumn?: string[],
    rightColumn?: string[],
    correctMatches?: [{ left: number, right: number }],
    
    // For Short/Long answer
    question?: string,
    sampleAnswer?: string,
    maxWords?: number,
    rubric?: string[]
  },
  tags: string[],
  difficulty: "easy" | "medium" | "hard",
  createdAt: timestamp,
  updatedAt: timestamp,
  isActive: boolean
}
```

**Worksheets Collection**: `worksheets/{worksheetId}`
```javascript
{
  uploadedBy: string, // teacher userId
  originalFileName: string,
  storageUrl: string,
  parsedQuestions: [{
    type: string,
    data: object,
    confidence: number // Gemini's confidence in parsing
  }],
  status: "uploaded" | "parsing" | "review" | "approved" | "rejected",
  reviewedBy?: string,
  createdAt: timestamp,
  processedAt?: timestamp
}
```

**Homework Collection**: `homework/{homeworkId}`
```javascript
{
  grade: number,
  uploadedBy: string, // student who uploaded daily activity PDF
  parsedDate: timestamp, // when PDF was processed
  assignments: [{
    subject: string,
    description: string,
    submissionDate: timestamp,
    originalText: string // raw extracted text
  }],
  sourceFileName: string,
  storageUrl: string,
  isActive: boolean,
  createdAt: timestamp
}
```

**Student Homework Progress**: `studentHomework/{userId_homeworkId}`
```javascript
{
  userId: string,
  homeworkId: string,
  assignmentIndex: number, // which assignment in the homework array
  completed: boolean,
  completedAt?: timestamp,
  notes?: string
}
```

### Infrastructure & Deployment
**Frontend**: **Firebase Hosting**
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Storage**: Firebase Storage
- **AI**: Firebase AI (Gemini integration)

**Backend**: **Minimal FastAPI Service** (for semantic search only)
- **Deployment**: Google Cloud Run or App Engine
- **Vector Storage**: Firebase Vector Store
- **Authentication**: Firebase Admin SDK

**Development Environment**:
```yaml
# docker-compose.yml (backend only)
version: '3.8'
services:
  backend:
    build: ./backend
    ports: ["8000:8000"]
    environment:
      - GOOGLE_APPLICATION_CREDENTIALS=/app/service-account.json
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
    volumes:
      - ./service-account.json:/app/service-account.json:ro
```

**Firebase Configuration**:
```javascript
// firebase.config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Your Firebase config
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### Development Tools
**Code Quality**:
- **Frontend**: ESLint, Prettier, Husky (git hooks)
- **Backend**: Black (formatting), Flake8 (linting), mypy (type checking)

**Testing**:
- **Frontend**: Jest + React Testing Library
- **Backend**: pytest + pytest-asyncio
- **E2E**: Playwright

**Monitoring & Analytics**:
- **Application Monitoring**: Sentry
- **Performance**: New Relic or DataDog
- **Analytics**: Google Analytics 4
- **Logging**: Structured logging with JSON format

## 🗂️ System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌──────────────────┐
│   Frontend      │    │   Firebase       │
│   (React +      │───▶│   - Auth         │
│   Firebase AI)  │    │   - Firestore    │
│                 │    │   - Storage      │
│                 │    │   - Hosting      │
└─────────────────┘    └──────────────────┘
         │                       │
         │ (semantic search)     │
         ▼                       │
┌─────────────────┐              │
│   Backend API   │              │
│   (FastAPI)     │              │
│   - Embeddings  │◀─────────────┘
│   - Vector Store│
│   - RAG Pipeline│
└─────────────────┘
```

### Content Hierarchy Structure
```
Grade (8, 9, 10, 11, 12)
├── Subject (Mathematics, Science, English, etc.)
    ├── Sub-subject (Algebra, Geometry, etc.)
        ├── Lesson_01: Introduction_to_Variables [basics, intro]
        ├── Lesson_02: Linear_Equations [equations, solving]
        └── Lesson_03: Graphing_Lines [graphs, coordinates]
```

### API Structure
**Frontend Direct (Firebase AI)**:
- Chat interactions with Gemini
- Simple Q&A generation
- Basic content queries
- **PDF Worksheet Parsing** (Gemini Flash)
- **Daily Activity PDF Parsing** (Homework extraction)

**Backend REST API** (Semantic Search Only):
```
# Semantic Search
POST /api/search/lessons
POST /api/search/similar-content
GET /api/search/embeddings/{lesson_id}

# Document Processing (Admin)
POST /api/admin/process-document
GET /api/admin/processing-status/{doc_id}
```

## 🔄 RAG Implementation

### Chat with Lesson Content
```javascript
// Student Chat Interface with Split View
const LessonChatInterface = ({ lessonId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [lessonFiles, setLessonFiles] = useState([]);
  
  const sendMessage = async (message) => {
    // Add user message
    setMessages(prev => [...prev, { content: message, isUser: true, timestamp: new Date() }]);
    
    // Get lesson context
    const lessonContext = selectedFile ? await extractTextFromPDF(selectedFile.storageUrl) : '';
    
    const prompt = `Based on this lesson content, please answer the student's question:
    
    Lesson Content: ${lessonContext}
    
    Student Question: ${message}
    
    Please provide a helpful, educational answer that relates to the lesson material.`;
    
    const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    
    // Add AI response
    setMessages(prev => [...prev, { 
      content: result.response.text(), 
      isUser: false, 
      timestamp: new Date() 
    }]);
  };
  
  return (
    <div className="lesson-chat-container">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        <SplitPane split="vertical" minSize={300} defaultSize="50%">
          <div className="lesson-content">
            <FileSelector 
              files={lessonFiles} 
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
            />
            <PDFViewer file={selectedFile} />
          </div>
          <div className="chat-panel">
            <ChatMessages messages={messages} />
            <ChatInput onSendMessage={sendMessage} />
          </div>
        </SplitPane>
      </div>
      
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex flex-col h-screen">
          <div className="tabs">
            <button onClick={() => setActiveTab('content')}>Lesson</button>
            <button onClick={() => setActiveTab('chat')}>Chat</button>
          </div>
          {activeTab === 'content' ? (
            <div className="flex-1">
              <FileSelector files={lessonFiles} onFileSelect={setSelectedFile} />
              <PDFViewer file={selectedFile} />
            </div>
          ) : (
            <div className="flex-1">
              <ChatMessages messages={messages} />
              <ChatInput onSendMessage={sendMessage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// PDF Viewer Component
const PDFViewer = ({ file }) => {
  if (!file) return <div className="flex items-center justify-center h-full text-gray-500">Select a lesson file to view</div>;
  
  return (
    <div className="pdf-viewer h-full">
      <Worker workerSrc="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer fileUrl={file.storageUrl} />
      </Worker>
    </div>
  );
};
```

### Chat with Lesson Content
```javascript
// Student Chat Interface with Split View
const LessonChatInterface = ({ lessonId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [lessonFiles, setLessonFiles] = useState([]);
  
  const sendMessage = async (message) => {
    // Add user message
    setMessages(prev => [...prev, { content: message, isUser: true, timestamp: new Date() }]);
    
    // Get lesson context
    const lessonContext = selectedFile ? await extractTextFromPDF(selectedFile.storageUrl) : '';
    
    const prompt = `Based on this lesson content, please answer the student's question:
    
    Lesson Content: ${lessonContext}
    
    Student Question: ${message}
    
    Please provide a helpful, educational answer that relates to the lesson material.`;
    
    const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    
    // Add AI response
    setMessages(prev => [...prev, { 
      content: result.response.text(), 
      isUser: false, 
      timestamp: new Date() 
    }]);
  };
  
  return (
    <div className="lesson-chat-container">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        <SplitPane split="vertical" minSize={300} defaultSize="50%">
          <div className="lesson-content">
            <FileSelector 
              files={lessonFiles} 
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
            />
            <PDFViewer file={selectedFile} />
          </div>
          <div className="chat-panel">
            <ChatMessages messages={messages} />
            <ChatInput onSendMessage={sendMessage} />
          </div>
        </SplitPane>
      </div>
      
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex flex-col h-screen">
          <div className="tabs">
            <button onClick={() => setActiveTab('content')}>Lesson</button>
            <button onClick={() => setActiveTab('chat')}>Chat</button>
          </div>
          {activeTab === 'content' ? (
            <div className="flex-1">
              <FileSelector files={lessonFiles} onFileSelect={setSelectedFile} />
              <PDFViewer file={selectedFile} />
            </div>
          ) : (
            <div className="flex-1">
              <ChatMessages messages={messages} />
              <ChatInput onSendMessage={sendMessage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// PDF Viewer Component
const PDFViewer = ({ file }) => {
  if (!file) return <div className="flex items-center justify-center h-full text-gray-500">Select a lesson file to view</div>;
  
  return (
    <div className="pdf-viewer h-full">
      <Worker workerSrc="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer fileUrl={file.storageUrl} />
      </Worker>
    </div>
  );
};
```

### Manual Question Creation
1. **Select Lesson**: Teacher chooses lesson from hierarchy
2. **Question Type**: Select from 5 supported types
3. **Question Builder**: Dynamic form based on question type
4. **Preview & Save**: Review question and save to Firestore

### Bulk Question Upload (PDF Parsing)
1. **Upload PDF**: Teacher uploads worksheet PDF
2. **AI Processing**: Frontend uses Gemini Flash to parse content
3. **JSON Generation**: AI extracts questions into structured format
4. **Review Interface**: Teacher reviews and edits parsed questions
5. **Batch Save**: Approved questions saved to Firestore

### Question Management Dashboard
```javascript
// Teacher Dashboard Component
const QuestionManagement = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [questions, setQuestions] = useState([]);
  
  const loadQuestions = async (lessonId) => {
    const q = query(
      collection(db, 'questions'),
      where('lessonId', '==', lessonId),
      where('createdBy', '==', currentUser.uid)
    );
    const snapshot = await getDocs(q);
    setQuestions(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
  };
  
  return (
    <div className="teacher-dashboard">
      <LessonSelector onSelect={setSelectedLesson} />
      <QuestionList questions={questions} />
      <AddQuestionButton lessonId={selectedLesson?.id} />
      <BulkUploadButton lessonId={selectedLesson?.id} />
    </div>
  );
};
```

### Manual Question Creation
1. **Select Lesson**: Teacher chooses lesson from hierarchy
2. **Question Type**: Select from 5 supported types
3. **Question Builder**: Dynamic form based on question type
4. **Preview & Save**: Review question and save to Firestore

### Bulk Question Upload (PDF Parsing)
1. **Upload PDF**: Teacher uploads worksheet PDF
2. **AI Processing**: Frontend uses Gemini Flash to parse content
3. **JSON Generation**: AI extracts questions into structured format
4. **Review Interface**: Teacher reviews and edits parsed questions
5. **Batch Save**: Approved questions saved to Firestore

### Question Management Dashboard
```javascript
// Teacher Dashboard Component
const QuestionManagement = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [questions, setQuestions] = useState([]);
  
  const loadQuestions = async (lessonId) => {
    const q = query(
      collection(db, 'questions'),
      where('lessonId', '==', lessonId),
      where('createdBy', '==', currentUser.uid)
    );
    const snapshot = await getDocs(q);
    setQuestions(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
  };
  
  return (
    <div className="teacher-dashboard">
      <LessonSelector onSelect={setSelectedLesson} />
      <QuestionList questions={questions} />
      <AddQuestionButton lessonId={selectedLesson?.id} />
      <BulkUploadButton lessonId={selectedLesson?.id} />
    </div>
  );
};
```

### Document Processing Pipeline (Admin Upload)
1. **Upload**: Admin uploads lesson PDFs via Firebase Storage
2. **Trigger**: Cloud Function triggers on file upload
3. **Processing**: Backend API processes document:
   - Text extraction using PyPDF2
   - Chunking (1000-token chunks, 200-token overlap)
   - Generate embeddings using OpenAI Ada-002
   - Store in Firebase Vector Store with lesson metadata
4. **Index**: Update Firestore with processing status

### Query Processing (Hybrid Approach)
**Simple Q&A (Firebase AI)**:
1. Student asks basic question about lesson
2. Frontend calls Firebase AI (Gemini) with lesson context
3. Direct response without semantic search

**Complex/Semantic Queries**:
1. Frontend detects need for semantic search
2. Call backend API with query
3. Backend retrieves relevant chunks from Vector Store
4. Return contexts to frontend
5. Frontend uses contexts + Firebase AI for final response

### Firebase AI Integration
```javascript
// Frontend - Basic Q&A
import { getGenerativeModel } from 'firebase/vertexai-preview';

const model = getGenerativeModel(vertexAI, { 
  model: "gemini-1.5-flash" 
});

const prompt = `Based on this lesson content: ${lessonContent}
Question: ${userQuestion}
Please provide a helpful answer.`;

const result = await model.generateContent(prompt);
```

### PDF Worksheet Parsing with Gemini
```javascript
// Frontend - PDF Worksheet Parsing
const parseWorksheet = async (pdfFile) => {
  // Convert PDF to base64 or extract text
  const pdfContent = await extractTextFromPDF(pdfFile);
  
  const prompt = `Parse this worksheet content and extract questions in the following JSON format:
  {
    "questions": [
      {
        "type": "mcq" | "fill-in-blank" | "match-following" | "short-answer" | "long-answer",
        "data": {
          // Question-specific data structure
        },
        "confidence": 0.95
      }
    ]
  }
  
  Worksheet content: ${pdfContent}`;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};

// Question Review Interface
const QuestionReviewComponent = ({ parsedQuestions, onSave }) => {
  const [editedQuestions, setEditedQuestions] = useState(parsedQuestions);
  
  const handleSave = async () => {
    // Save to Firestore questions collection
    const batch = writeBatch(db);
    editedQuestions.forEach(question => {
      const questionRef = doc(collection(db, 'questions'));
      batch.set(questionRef, {
        ...question,
        createdBy: currentUser.uid,
        createdAt: serverTimestamp()
      });
    });
    await batch.commit();
    onSave();
  };
  
  return (
    <div>
      {editedQuestions.map((question, index) => (
        <QuestionEditor 
          key={index} 
          question={question}
          onChange={(updated) => updateQuestion(index, updated)}
        />
      ))}
      <button onClick={handleSave}>Save Questions</button>
    </div>
  );
};
```

### Daily Activity PDF Parsing for Homework
```javascript
// Frontend - Daily Activity PDF Parsing
const parseDailyActivity = async (pdfFile) => {
  const pdfContent = await extractTextFromPDF(pdfFile);
  
  const prompt = `Parse this daily activity/homework PDF and extract assignments in this JSON format:
  {
    "assignments": [
      {
        "subject": "Mathematics",
        "description": "Complete exercises 1-10 from Chapter 5",
        "submissionDate": "2024-12-15",
        "originalText": "Math: Ch5 Ex 1-10 Due: 15/12/24"
      }
    ]
  }
  
  Look for table format with columns like: Subject | Homework Description | Date of Submission
  Extract dates in YYYY-MM-DD format. Handle various date formats (DD/MM/YY, DD-MM-YYYY, etc.)
  
  PDF Content: ${pdfContent}`;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};

// Homework Calendar Component
const HomeworkCalendar = () => {
  const [homework, setHomework] = useState([]);
  const [studentProgress, setStudentProgress] = useState({});
  const { currentUser } = useAuth();
  
  useEffect(() => {
    // Load homework for student's grade
    const loadHomework = async () => {
      const user = await getDoc(doc(db, 'users', currentUser.uid));
      const userGrade = user.data().grade;
      
      const q = query(
        collection(db, 'homework'),
        where('grade', '==', userGrade),
        where('isActive', '==', true)
      );
      const snapshot = await getDocs(q);
      const homeworkData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHomework(homeworkData);
      
      // Load student's progress
      const progressQuery = query(
        collection(db, 'studentHomework'),
        where('userId', '==', currentUser.uid)
      );
      const progressSnapshot = await getDocs(progressQuery);
      const progress = {};
      progressSnapshot.docs.forEach(doc => {
        const data = doc.data();
        progress[`${data.homeworkId}_${data.assignmentIndex}`] = data;
      });
      setStudentProgress(progress);
    };
    
    loadHomework();
  }, [currentUser]);
  
  const toggleHomeworkCompletion = async (homeworkId, assignmentIndex) => {
    const progressKey = `${homeworkId}_${assignmentIndex}`;
    const currentStatus = studentProgress[progressKey]?.completed || false;
    
    const progressRef = doc(db, 'studentHomework', `${currentUser.uid}_${homeworkId}_${assignmentIndex}`);
    await setDoc(progressRef, {
      userId: currentUser.uid,
      homeworkId,
      assignmentIndex,
      completed: !currentStatus,
      completedAt: !currentStatus ? serverTimestamp() : null
    }, { merge: true });
    
    // Update local state
    setStudentProgress(prev => ({
      ...prev,
      [progressKey]: {
        ...prev[progressKey],
        completed: !currentStatus,
        completedAt: !currentStatus ? new Date() : null
      }
    }));
  };
  
  // Convert homework to calendar events
  const calendarEvents = homework.flatMap(hw => 
    hw.assignments.map((assignment, index) => ({
      id: `${hw.id}_${index}`,
      title: `${assignment.subject}: ${assignment.description}`,
      start: assignment.submissionDate.toDate(),
      end: assignment.submissionDate.toDate(),
      resource: {
        homeworkId: hw.id,
        assignmentIndex: index,
        completed: studentProgress[`${hw.id}_${index}`]?.completed || false
      }
    }))
  );
  
  return (
    <div className="homework-calendar">
      <Calendar
        localizer={momentLocalizer(moment)}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={(event) => ({
          className: event.resource.completed ? 'completed-homework' : 'pending-homework'
        })}
        onSelectEvent={(event) => {
          toggleHomeworkCompletion(
            event.resource.homeworkId,
            event.resource.assignmentIndex
          );
        }}
      />
    </div>
  );
};
```

### Backend Semantic Search
```python
# Backend - Semantic search endpoint
@app.post("/api/search/lessons")
async def search_lessons(query: str, grade: int, subject: str):
    # Generate query embedding
    query_embedding = openai.Embedding.create(
        model="text-embedding-ada-002",
        input=query
    )
    
    # Search Firebase Vector Store
    results = await vector_store.similarity_search(
        query_embedding,
        filters={"grade": grade, "subject": subject},
        k=5
    )
    
    return {"contexts": results}
```

## 📊 Performance Requirements

### Response Times
- Chat responses: < 3 seconds
- Worksheet generation: < 10 seconds
- Quiz creation: < 5 seconds
- Page load times: < 2 seconds

### Scalability
- Concurrent users: 100-500 (MVP phase)
- Document storage: Up to 10GB per class
- API rate limits: 1000 requests/hour per user

### Availability
- Uptime target: 99.5%
- Backup frequency: Daily
- Recovery time: < 4 hours

## 🔒 Security Considerations

### Authentication & Authorization
- JWT tokens with 24-hour expiry
- Role-based access control (RBAC)
- API rate limiting
- Input validation and sanitization

### Data Protection
- HTTPS everywhere
- Encrypted data at rest
- Regular security updates
- OWASP compliance

### Privacy
- Basic COPPA compliance preparation
- User data anonymization for analytics
- Opt-in data collection

## 📈 Monitoring & Analytics

### Key Metrics
- User engagement (daily/weekly active users)
- Feature usage (chat, quiz, worksheet generation)
- Performance metrics (response times, error rates)
- Content effectiveness (quiz scores, time spent)

### Health Checks
- API endpoint health monitoring
- Database connection monitoring
- External service availability (OpenAI, OCR)
- Storage capacity monitoring

## 🚀 Deployment Strategy

### Development Workflow
1. **Local Development**: Docker Compose setup
2. **Testing**: Automated tests on PR
3. **Staging**: Deploy to staging environment
4. **Production**: Blue-green deployment

### Environment Configuration
```bash
# Frontend (.env)
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_PROJECT_ID=cogniquest
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_BACKEND_API_URL=https://api.cogniquest.com

# Backend (.env)
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
OPENAI_API_KEY=sk-...
FIREBASE_PROJECT_ID=cogniquest
CORS_ORIGINS=["https://cogniquest.web.app"]
```

## 📅 Development Timeline

### Phase 1 (Months 1-2): Core Infrastructure
- User authentication system
- Document upload and processing
- Basic RAG implementation
- Student chat interface with lesson viewer
- Admin lesson management

### Phase 2 (Months 2-3): AI Features & Teacher Tools
- Enhanced Q&A system
- Teacher question creation and management
- Quiz generation and taking
- Daily activity PDF parsing
- Homework calendar system

### Phase 3 (Month 3-4): Polish & Deploy
- Mobile responsive optimizations
- Performance optimization
- Testing and bug fixes
- Production deployment

## 🎯 Post-MVP Roadmap

### Immediate Enhancements (3-6 months)
- Advanced quiz types
- Better handwriting recognition
- Mobile responsive design
- Enhanced analytics

### Future Features (6+ months)
- Multi-language support
- Advanced worksheet templates
- Teacher dashboard
- Parent portal
- Mobile apps

---

## 📝 Notes for Development Team

### Getting Started
1. Clone repository: `git clone https://github.com/yourusername/cogniquest.git`
2. Setup Firebase project and download service account
3. Configure environment variables
4. Frontend: `npm install && npm start`
5. Backend: `pip install -r requirements.txt && uvicorn main:app --reload`
6. Access frontend at Firebase Hosting URL
7. Backend API available at Google Cloud Run URL

### Code Standards
- Follow conventional commits
- Write tests for all new features
- Update documentation with changes
- Review security implications of new code

This MVP provides a solid foundation while keeping complexity manageable for initial development and user validation.
