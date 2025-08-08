import { useEffect, useMemo, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PdfViewer } from "@/components/pdf/PdfViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Seo } from "@/components/seo/Seo";
import { toast } from "sonner";

interface Message { content: string; isUser: boolean; timestamp: number }

const samplePdf = "https://arxiv.org/pdf/2203.02155.pdf";

export default function LessonChat() {
  const [pdfUrl, setPdfUrl] = useState<string>(samplePdf);
  const [inputUrl, setInputUrl] = useState<string>(samplePdf);
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState(false);
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) return;
    const userMsg: Message = { content: text.trim(), isUser: true, timestamp: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setText("");
    setPending(true);

    // Mock AI reply
    setTimeout(() => {
      const ai: Message = {
        content: "Thanks! AI responses will use lesson context here.",
        isUser: false,
        timestamp: Date.now(),
      };
      setMessages((m) => [...m, ai]);
      setPending(false);
    }, 600);
  };

  useEffect(() => {
    toast("Welcome to CogniQuest! Paste a lesson PDF URL and start chatting.");
  }, []);

  const rendered = useMemo(() => (
    <div className="hidden lg:flex h-[calc(100vh-4rem)]">
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="p-3 border-b flex gap-2">
              <Input
                placeholder="Paste PDF URL"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <Button variant="secondary" onClick={() => setPdfUrl(inputUrl)}>Load</Button>
            </div>
            <div className="flex-1 min-h-0">
              <PdfViewer fileUrl={pdfUrl} />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className="h-full flex flex-col">
            <Card className="rounded-none border-0 border-b">
              <CardHeader>
                <CardTitle>Lesson Chat</CardTitle>
              </CardHeader>
            </Card>
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {messages.length === 0 && (
                <p className="text-sm text-muted-foreground">Ask a question about the lesson to get started.</p>
              )}
              {messages.map((m, i) => (
                <div key={i} className={m.isUser ? "text-right" : "text-left"}>
                  <div className={
                    m.isUser
                      ? "inline-block rounded-lg bg-primary text-primary-foreground px-3 py-2"
                      : "inline-block rounded-lg bg-muted px-3 py-2"
                  }>
                    {m.content}
                  </div>
                </div>
              ))}
              {pending && <p className="text-xs text-muted-foreground">AI is typing…</p>}
            </div>
            <div className="p-3 border-t flex gap-2">
              <Input
                placeholder="Ask about the lesson…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ), [inputUrl, pdfUrl, messages, pending, text]);

  return (
    <>
      <Seo
        title="Learn with AI"
        description="Split view to read lessons and chat with AI about their content."
        canonical="https://cogniquest.app/learn"
      />
      {/* Desktop */}
      {rendered}

      {/* Mobile */}
      <div className="lg:hidden p-4">
        <Tabs defaultValue="content">
          <TabsList className="w-full">
            <TabsTrigger value="content" className="flex-1">Lesson</TabsTrigger>
            <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <div className="my-3 flex gap-2">
              <Input value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} placeholder="Paste PDF URL" />
              <Button variant="secondary" onClick={() => setPdfUrl(inputUrl)}>Load</Button>
            </div>
            <div className="h-[60vh] border rounded-md">
              <PdfViewer fileUrl={pdfUrl} />
            </div>
          </TabsContent>
          <TabsContent value="chat">
            <Card>
              <CardContent className="p-4 space-y-3 max-h-[60vh] overflow-auto">
                {messages.map((m, i) => (
                  <div key={i} className={m.isUser ? "text-right" : "text-left"}>
                    <div className={
                      m.isUser
                        ? "inline-block rounded-lg bg-primary text-primary-foreground px-3 py-2"
                        : "inline-block rounded-lg bg-muted px-3 py-2"
                    }>
                      {m.content}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="mt-3 flex gap-2">
              <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about the lesson…" />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
