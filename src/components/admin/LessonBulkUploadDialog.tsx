import React, { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "@/firebase.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BulkFile {
  file: File;
  lessonNumber: string;
  lessonTitle: string;
}

const LessonBulkUploadDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [step, setStep] = useState(1);
  const [bulkFiles, setBulkFiles] = useState<BulkFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [subsubject, setSubsubject] = useState("");

  const resetState = () => {
    setIsOpen(false);
    setStep(1);
    setBulkFiles([]);
    setGrade("");
    setSubject("");
    setSubsubject("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArr: BulkFile[] = Array.from(files).map((file) => ({
      file,
      lessonNumber: "",
      lessonTitle: "",
    }));
    setBulkFiles(fileArr);
    setStep(2);
  };

  const handleBulkFieldChange = (idx: number, field: "lessonNumber" | "lessonTitle", value: string) => {
    setBulkFiles((prev) => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  };

  const handleConfirmAndUpload = async () => {
    setIsConfirming(false);
    setIsUploading(true);

    try {
      const uploadPromises = bulkFiles.map(async (item) => {
        try {
          const storageRef = ref(storage, `lessons/${Date.now()}_${item.file.name}`);
          const snapshot = await uploadBytes(storageRef, item.file);
          const pdfUrl = await getDownloadURL(snapshot.ref);

          await addDoc(collection(db, "lessons"), {
            grade,
            subject,
            subsubject,
            lessonNumber: item.lessonNumber,
            lessonTitle: item.lessonTitle,
            pdfUrl,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          return { status: "fulfilled", value: item.file.name };
        } catch (error) {
          console.error(`Failed to upload ${item.file.name}:`, error);
          return { status: "rejected", reason: item.file.name };
        }
      });

      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter((r) => r.status === "fulfilled").map(r => r.value);
      const failedUploads = results.filter((r) => r.status === "rejected").map(r => r.reason);

      if (failedUploads.length > 0) {
        toast({
          title: "Upload Complete with Errors",
          description: `Successfully uploaded: ${successfulUploads.length}. Failed: ${
            failedUploads.length
          } (${failedUploads.join(", ")})`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `${successfulUploads.length} lessons uploaded successfully`,
        });
        resetState();
      }
    } catch (error) {
      console.error("Error during bulk upload process:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during the upload.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (bulkFiles.length === 0) {
      toast({ title: "Error", description: "Please select at least one PDF file", variant: "destructive" });
      return;
    }

    if (!grade || !subject || !subsubject) {
      toast({ title: "Error", description: "Please fill in all metadata fields", variant: "destructive" });
      return;
    }

    setIsConfirming(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Bulk Upload Lessons</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bulk Upload Lessons</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <Label htmlFor="pdfFiles">PDF Files</Label>
                  <Input
                    id="pdfFiles"
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={handleFilesSelected}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="grade">Grade</Label>
                  <Input id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="subsubject">Subsubject</Label>
                  <Input id="subsubject" value={subsubject} onChange={(e) => setSubsubject(e.target.value)} required />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="mb-2">Enter Lesson Number and Title for each file:</div>
                <div className="max-h-96 overflow-auto">
                  <table className="min-w-full border text-sm mb-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">File Name</th>
                        <th className="p-2 border">Lesson Number</th>
                        <th className="p-2 border">Lesson Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkFiles.map((item, idx) => (
                        <tr key={item.file.name}>
                          <td className="p-2 border">{item.file.name}</td>
                          <td className="p-2 border">
                            <Input
                              type="text"
                              value={item.lessonNumber}
                              onChange={(e) => handleBulkFieldChange(idx, "lessonNumber", e.target.value)}
                              required
                            />
                          </td>
                          <td className="p-2 border">
                            <Input
                              type="text"
                              value={item.lessonTitle}
                              onChange={(e) => handleBulkFieldChange(idx, "lessonTitle", e.target.value)}
                              required
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Confirm & Upload"}
                </Button>
              </>
            )}
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to upload {bulkFiles.length} lesson(s). Please confirm that the details are correct before
              proceeding.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAndUpload}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LessonBulkUploadDialog;
