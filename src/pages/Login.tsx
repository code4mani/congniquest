import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LoginPage({ onLogin }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Sign in to CogniQuest</h1>
      <Button onClick={handleGoogleSignIn} disabled={loading} size="lg">
        {loading ? "Signing in..." : "Sign in with Google"}
      </Button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
