import heroImage from "@/assets/cogniquest-hero.jpg";
import { Button } from "@/components/ui/button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Seo } from "@/components/seo/Seo";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      let role = "student";
      if (userDoc.exists()) {
        role = userDoc.data().role || "student";
      }
      // Redirect based on role (optional)
      if (role === "admin") navigate("/teacher/questions");
      else if (role === "teacher") navigate("/teacher/questions");
      else navigate("/learn");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center bg-background">
      <Seo
        title="AI Learning Platform"
        description="Chat with lessons, generate worksheets, take quizzes, and write answers by hand."
        canonical="https://cogniquest.app/"
      />
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center px-4">
        <section className="relative">
          <div className="absolute -inset-10 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full" aria-hidden />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Learn faster with AI‑powered lessons
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            CogniQuest helps students ask better questions, practice smarter, and get instant feedback.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant="hero"
              size="lg"
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Signing in..." : "Login with Google"}
            </Button>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <p className="sr-only">AI chat, worksheets, quizzes, handwriting input</p>
        </section>
        <aside>
          <img src={heroImage} alt="CogniQuest AI learning split view illustration" className="w-full rounded-xl shadow-xl" loading="eager" />
        </aside>
      </div>
    </main>
  );
};

export default Index;
