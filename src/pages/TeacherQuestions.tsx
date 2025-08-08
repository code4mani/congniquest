import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Seo } from "@/components/seo/Seo";
import { toast } from "sonner";

export default function TeacherQuestions() {
  const [mcq, setMcq] = useState({ question: "", a: "", b: "", c: "", d: "", correct: "a" });
  const [fib, setFib] = useState({ template: "The capital of France is ____.", answer: "Paris" });

  const mcqPreview = useMemo(() => (
    <div className="space-y-2">
      <p className="font-medium">{mcq.question || "Your MCQ question"}</p>
      <ul className="list-disc pl-6 text-sm">
        <li>A. {mcq.a || "Option A"}</li>
        <li>B. {mcq.b || "Option B"}</li>
        <li>C. {mcq.c || "Option C"}</li>
        <li>D. {mcq.d || "Option D"}</li>
      </ul>
    </div>
  ), [mcq]);

  const save = () => {
    toast.success("Question saved (stub) — connect Firestore next.");
  };

  return (
    <div className="container mx-auto p-4">
      <Seo
        title="Question Builder"
        description="Create MCQs and Fill‑in‑the‑blanks; PDF parsing comes next."
        canonical="https://cogniquest.app/teacher/questions"
      />
      <Card>
        <CardHeader>
          <CardTitle>Teacher Question Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mcq">
            <TabsList>
              <TabsTrigger value="mcq">MCQ</TabsTrigger>
              <TabsTrigger value="fib">Fill-in-the-blank</TabsTrigger>
            </TabsList>
            <TabsContent value="mcq" className="mt-4 grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Textarea placeholder="Question" value={mcq.question} onChange={(e) => setMcq({ ...mcq, question: e.target.value })} />
                <Input placeholder="Option A" value={mcq.a} onChange={(e) => setMcq({ ...mcq, a: e.target.value })} />
                <Input placeholder="Option B" value={mcq.b} onChange={(e) => setMcq({ ...mcq, b: e.target.value })} />
                <Input placeholder="Option C" value={mcq.c} onChange={(e) => setMcq({ ...mcq, c: e.target.value })} />
                <Input placeholder="Option D" value={mcq.d} onChange={(e) => setMcq({ ...mcq, d: e.target.value })} />
                <Input placeholder="Correct (a|b|c|d)" value={mcq.correct} onChange={(e) => setMcq({ ...mcq, correct: e.target.value })} />
                <Button onClick={save}>Save</Button>
              </div>
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>{mcqPreview}</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="fib" className="mt-4 grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Textarea placeholder="Template" value={fib.template} onChange={(e) => setFib({ ...fib, template: e.target.value })} />
                <Input placeholder="Correct Answer" value={fib.answer} onChange={(e) => setFib({ ...fib, answer: e.target.value })} />
                <Button onClick={save}>Save</Button>
              </div>
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{fib.template}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
