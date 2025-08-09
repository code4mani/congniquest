import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/hooks/use-auth-user";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useState } from "react";

export function Header() {
  const { user, role } = useAuthUser();
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  // Menu items by role
  const menu = [];
  if (role === 'admin') {
    menu.push({ label: "Dashboard", to: "/admin/dashboard" });
  } else if (role === "student" || role === "teacher") {
    menu.push({ label: "Home", to: "/" });
  }

  if (role === "teacher") {
    menu.push({ label: "Teacher Tools", to: "/teacher/questions" });
    menu.push({ label: "Learn", to: "/learn" });
    menu.push({ label: "Homework", to: "/homework" });
  }
  if (role === "student") {
    menu.push({ label: "Learn", to: "/learn" });
    menu.push({ label: "Homework", to: "/homework" });
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-accent shadow" />
          <span className="font-semibold">CogniQuest</span>
        </NavLink>

        {user && (
          <nav className="hidden md:flex items-center gap-6">
            {menu.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}

        {user && (
          <div className="flex items-center gap-2 relative">
            <button
              className="rounded-full border w-10 h-10 flex items-center justify-center bg-muted hover:bg-accent"
              onClick={() => setShowProfile((v) => !v)}
              aria-label="Profile menu"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="rounded-full w-9 h-9 object-cover" />
              ) : (
                <span className="text-lg font-bold">{user.displayName?.[0] || "U"}</span>
              )}
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-12 w-64 bg-white border rounded shadow-lg z-50 p-4">
                <div className="flex items-center gap-3 mb-2">
                  {user.photoURL && <img src={user.photoURL} alt="Profile" className="rounded-full w-12 h-12 object-cover" />}
                  <div>
                    <div className="font-semibold">{user.displayName}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                    {user.phoneNumber && <div className="text-xs">📱 {user.phoneNumber}</div>}
                  </div>
                </div>
                <button
                  className="w-full text-left py-2 px-3 rounded hover:bg-accent"
                  onClick={() => { setShowProfile(false); navigate("/profile"); }}
                >
                  Edit Profile
                </button>
                <button
                  className="w-full text-left py-2 px-3 rounded hover:bg-accent text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
