import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/seo/Seo";
import { toast } from "sonner";

interface Assignment { subject: string; description: string; date: string; completed?: boolean }

export default function Homework() {
  const [file, setFile] = useState<File | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);

  const parse = async () => {
    if (!file) {
      toast("Please select a PDF first.");
      return;
    }
    setLoading(true);
    // Simulate parsing with Gemini Flash
    setTimeout(() => {
      setAssignments([
        { subject: "Mathematics", description: "Exercises 1-10 from Chapter 5", date: "2025-08-15" },
        { subject: "Science", description: "Read Section 3 and summarize", date: "2025-08-16" },
      ]);
      setLoading(false);
      toast.success("Parsed 2 assignments (stub)");
    }, 900);
  };

  const toggle = (idx: number) => {
    setAssignments((list) => list.map((a, i) => i === idx ? { ...a, completed: !a.completed } : a));
  };

  return (
    <div className="container mx-auto p-4">
      <Seo
        title="Homework Manager"
        description="Upload daily activity PDFs and track assignments in one place."
        canonical="https://cogniquest.app/homework"
      />
      <Card>
        <CardHeader>
          <CardTitle>Daily Activity & Homework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            <Button variant="secondary" onClick={parse} disabled={loading}>{loading ? "Parsing…" : "Parse PDF"}</Button>
          </div>
          <div className="grid gap-3">
            {assignments.length === 0 ? (
              <p className="text-muted-foreground">No assignments yet. Upload a PDF to parse.</p>
            ) : (
              assignments.map((a, idx) => (
                <div key={idx} className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <p className="font-medium">{a.subject}</p>
                    <p className="text-sm text-muted-foreground">{a.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">Due: {a.date}</span>
                    <Button variant={a.completed ? "default" : "outline"} onClick={() => toggle(idx)}>
                      {a.completed ? "Completed" : "Mark done"}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
