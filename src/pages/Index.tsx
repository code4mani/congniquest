import heroImage from "@/assets/cogniquest-hero.jpg";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/seo/Seo";

const Index = () => {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center bg-background">
      <Seo
        title="AI Learning Platform"
        description="Chat with lessons, generate worksheets, take quizzes, and write answers by hand."
        canonical="https://cogniquest.app/"
      />
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center px-4">
        <section className="relative">
          <div className="absolute -inset-10 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full" aria-hidden />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Learn faster with AI‑powered lessons
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            CogniQuest helps students ask better questions, practice smarter, and get instant feedback.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/learn"><Button variant="hero" size="lg">Start Learning</Button></a>
            <a href="/teacher/questions"><Button variant="outline" size="lg">Teacher Tools</Button></a>
          </div>
          <p className="sr-only">AI chat, worksheets, quizzes, handwriting input</p>
        </section>
        <aside>
          <img src={heroImage} alt="CogniQuest AI learning split view illustration" className="w-full rounded-xl shadow-xl" loading="eager" />
        </aside>
      </div>
    </main>
  );
};

export default Index;
