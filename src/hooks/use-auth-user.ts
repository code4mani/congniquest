import { useEffect, useState } from "react";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

export function useAuthUser() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    // Handle redirect result
    getRedirectResult(auth)
      .then(async (result) => {
        if (result) {
          const firebaseUser = result.user;
          setUser(firebaseUser);
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          setRole(userDoc.exists() ? userDoc.data().role || "student" : "student");
        }
      })
      .catch((error) => {
        console.error("Error getting redirect result", error);
      })
      .finally(() => {
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  return { user, role, loading };
}
