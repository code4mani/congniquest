import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  const navLink = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground";

  return (
    <header className="sticky top-0 z-40 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-accent shadow" />
          <span className="font-semibold">CogniQuest</span>
        </NavLink>

  {/* Top navigation menu removed as requested */}

  {/* Removed 'Get started' button from navigation */}
      </div>
    </header>
  );
}
