import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LessonChat from "./pages/LessonChat";
import Handwriting from "./pages/Handwriting";
import TeacherQuestions from "./pages/TeacherQuestions";
import Homework from "./pages/Homework";
import LoginPage from "./pages/Login";
import { Header } from "./components/layout/Header";
import { HelmetProvider } from "react-helmet-async";
import { useAuthUser } from "./hooks/use-auth-user";

const queryClient = new QueryClient();



const ProtectedRoute = ({ children }) => {
  const { user, role, loading } = useAuthUser();
  const location = useLocation();
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading…</div>;
  if (!user || !role) {
    // Redirect to login with intended destination
    return <LoginPage redirectTo={location.pathname + location.search} />;
  }
  return children;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Header />
          <Routes>
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage redirectTo="" />} />
            <Route path="/learn" element={<ProtectedRoute><LessonChat /></ProtectedRoute>} />
            <Route path="/handwriting" element={<ProtectedRoute><Handwriting /></ProtectedRoute>} />
            <Route path="/teacher/questions" element={<ProtectedRoute><TeacherQuestions /></ProtectedRoute>} />
            <Route path="/homework" element={<ProtectedRoute><Homework /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
