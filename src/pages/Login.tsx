import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import heroImage from "@/assets/cogniquest-hero.jpg";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/seo/Seo";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user doc exists, create if not
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          allowed: true,
          role: "student", // New users default to student
          createdAt: new Date(),
        });
      }
      
      navigate(from, { replace: true });

    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-[calc(100vh-4rem)] flex items-center bg-background">
        <Seo
          title="AI Learning Platform"
          description="Chat with lessons, generate worksheets, take quizzes, and write answers by hand."
          canonical="https://cogniquest-v1.web.app/"
        />
        <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center px-4">
          <section className="relative">
            <div className="absolute -inset-10 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full pointer-events-none" aria-hidden />
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
    </>
  );
};

export default LoginPage;
