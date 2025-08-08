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

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/learn" className={navLink} end>
            Learn
          </NavLink>
          <NavLink to="/teacher/questions" className={navLink}>
            Teacher Tools
          </NavLink>
          <NavLink to="/homework" className={navLink}>
            Homework
          </NavLink>
          <NavLink to="/handwriting" className={navLink}>
            Handwriting
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <NavLink to="/learn">
            <Button variant="hero" size="lg">Get started</Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
