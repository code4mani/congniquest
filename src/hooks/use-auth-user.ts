import { useEffect, useState } from "react";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

export function useAuthUser() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First, handle redirect result (for signInWithRedirect)
    getRedirectResult(auth)
      .then(async (result) => {
        if (result && result.user) {
          setUser(result.user);
          const userDoc = await getDoc(doc(db, "users", result.user.uid));
          setRole(userDoc.exists() ? userDoc.data().role || "student" : "student");
          // After login, redirect to intended page if present
          const urlParams = new URLSearchParams(window.location.search);
          const redirectTo = urlParams.get("redirectTo");
          if (redirectTo) {
            window.history.replaceState({}, '', redirectTo);
          }
        }
      })
      .catch((error) => {
        console.error("[useAuthUser] Error getting redirect result", error);
      })
      .finally(() => {
        setLoading(false);
      });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch role from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        setRole(userDoc.exists() ? userDoc.data().role || "student" : "student");
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, role, loading };
}
