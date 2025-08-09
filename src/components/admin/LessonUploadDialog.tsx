import React, { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "@/firebase.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const LessonUploadDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    grade: "",
    subject: "",
    subsubject: "",
    lessonNumber: "",
    lessonTitle: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fileInputRef.current?.files?.[0]) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const file = fileInputRef.current.files[0];
      const storageRef = ref(storage, `lessons/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const pdfUrl = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "lessons"), {
        ...formData,
        pdfUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setIsOpen(false);
      setFormData({
        grade: "",
        subject: "",
        subsubject: "",
        lessonNumber: "",
        lessonTitle: ""
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast({
        title: "Success",
        description: "Lesson uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading lesson:", error);
      toast({
        title: "Error",
        description: "Failed to upload lesson",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Single Lesson</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Lesson PDF</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="pdfFile">PDF File</Label>
            <Input
              id="pdfFile"
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              required
            />
          </div>
          <div>
            <Label htmlFor="grade">Grade</Label>
            <Input
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="subsubject">Subsubject</Label>
            <Input
              id="subsubject"
              name="subsubject"
              value={formData.subsubject}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lessonNumber">Lesson Number</Label>
            <Input
              id="lessonNumber"
              name="lessonNumber"
              value={formData.lessonNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lessonTitle">Lesson Title</Label>
            <Input
              id="lessonTitle"
              name="lessonTitle"
              value={formData.lessonTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LessonUploadDialog;
