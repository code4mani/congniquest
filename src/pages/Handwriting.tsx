import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect } from "fabric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/seo/Seo";
import { toast } from "sonner";

export default function Handwriting() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [color, setColor] = useState("#3b5bdb");
  const [tool, setTool] = useState<"select" | "draw" | "rectangle" | "circle">("draw");

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new FabricCanvas(canvasRef.current, {
      width: 900,
      height: 520,
      backgroundColor: "#ffffff",
    });

    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width = 3;

    setFabricCanvas(canvas);
    toast("Handwriting canvas ready!");

    return () => { canvas.dispose(); };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;
    fabricCanvas.isDrawingMode = tool === "draw";
    if (tool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = color;
      fabricCanvas.freeDrawingBrush.width = 3;
    }
  }, [tool, color, fabricCanvas]);

  const handleTool = (t: typeof tool) => {
    setTool(t);
    if (!fabricCanvas) return;
    if (t === "rectangle") {
      const rect = new Rect({ left: 100, top: 100, fill: color, width: 120, height: 80 });
      fabricCanvas.add(rect);
    }
    if (t === "circle") {
      const circle = new Circle({ left: 150, top: 120, fill: color, radius: 40 });
      fabricCanvas.add(circle);
    }
  };

  const clear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast("Canvas cleared");
  };

  return (
    <div className="container mx-auto p-4">
      <Seo
        title="Handwriting Input"
        description="Write answers on a canvas; OCR and scoring integrate next."
        canonical="https://cogniquest.app/handwriting"
      />
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Button variant={tool === "draw" ? "hero" : "secondary"} onClick={() => handleTool("draw")}>Draw</Button>
        <Button variant={tool === "rectangle" ? "hero" : "secondary"} onClick={() => handleTool("rectangle")}>Rectangle</Button>
        <Button variant={tool === "circle" ? "hero" : "secondary"} onClick={() => handleTool("circle")}>Circle</Button>
        <div className="flex items-center gap-2 ml-2">
          <label className="text-sm text-muted-foreground">Color</label>
          <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-12 h-10 p-1" />
        </div>
        <Button variant="outline" onClick={clear}>Clear</Button>
      </div>
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </div>
  );
}
