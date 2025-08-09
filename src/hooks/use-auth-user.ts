import { useEffect, useState } from "react";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
          // Check if user doc exists
          const userRef = doc(db, "users", result.user.uid);
          const userDoc = await getDoc(userRef);
          if (!userDoc.exists()) {
            // First login: set role to student
            console.log('[useAuthUser] First login, creating user doc with role=student', result.user.email);
            await setDoc(userRef, {
              email: result.user.email,
              displayName: result.user.displayName,
              allowed: true,
              role: "student",
              createdAt: new Date()
            });
            setRole("student");
          } else {
            // Returning user: update info but preserve role
            console.log('[useAuthUser] Returning user, preserving role:', userDoc.data().role, result.user.email);
            await setDoc(userRef, {
              email: result.user.email,
              displayName: result.user.displayName,
              allowed: userDoc.data().allowed ?? true,
              createdAt: userDoc.data().createdAt ?? new Date()
            }, { merge: true });
            setRole(userDoc.data().role || "student");
          }
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
        // Check if user doc exists
        const userRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          // First login: set role to student
          console.log('[useAuthUser] First login, creating user doc with role=student', firebaseUser.email);
          await setDoc(userRef, {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            allowed: true,
            role: "student",
            createdAt: new Date()
          });
          setRole("student");
        } else {
          // Returning user: update info but preserve role
          console.log('[useAuthUser] Returning user, preserving role:', userDoc.data().role, firebaseUser.email);
          await setDoc(userRef, {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            allowed: userDoc.data().allowed ?? true,
            createdAt: userDoc.data().createdAt ?? new Date()
          }, { merge: true });
          setRole(userDoc.data().role || "student");
        }
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
