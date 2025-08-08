import React from "react";
import heroImage from "@/assets/cogniquest-hero.jpg";
import { Button } from "@/components/ui/button";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Seo } from "@/components/seo/Seo";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    console.log("Login button clicked");
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Top-level test button for overlay/layout debugging */}
      <button
        type="button"
        style={{ position: 'fixed', top: 10, left: 10, zIndex: 9999, padding: 12, background: '#ff0', border: '2px solid #000' }}
        onClick={() => console.log('Top-level test button clicked')}
      >
        Top Test Button
      </button>
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
            {/* Test button to debug click handler */}
            <button
              type="button"
              style={{ marginTop: 16, padding: 12, background: '#eee', border: '1px solid #ccc' }}
              onClick={() => console.log('Test button clicked')}
            >
              Test Plain Button
            </button>
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