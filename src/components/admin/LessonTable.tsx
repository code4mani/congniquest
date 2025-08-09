import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/firebase.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface Lesson {
  id: string;
  grade: string;
  subject: string;
  subsubject: string;
  lessonNumber: string;
  lessonTitle: string;
  pdfUrl: string;
}

const LessonTable: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsCollection = collection(db, "lessons");
        const lessonsSnapshot = await getDocs(lessonsCollection);
        const lessonsList = lessonsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Lesson));
        setLessons(lessonsList);
      } catch (error) {
        console.error("Error fetching lessons:", error);
        toast({
          title: "Error",
          description: "Failed to fetch lessons",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
  };

  const handleSave = async () => {
    if (!editingLesson) return;

    try {
      const lessonRef = doc(db, "lessons", editingLesson.id);
      await updateDoc(lessonRef, {
        grade: editingLesson.grade,
        subject: editingLesson.subject,
        subsubject: editingLesson.subsubject,
        lessonNumber: editingLesson.lessonNumber,
        lessonTitle: editingLesson.lessonTitle
      });

      setLessons(lessons.map(lesson =>
        lesson.id === editingLesson.id ? editingLesson : lesson
      ));
      setEditingLesson(null);

      toast({
        title: "Success",
        description: "Lesson updated successfully",
      });
    } catch (error) {
      console.error("Error updating lesson:", error);
      toast({
        title: "Error",
        description: "Failed to update lesson",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (lessonId: string, pdfUrl: string) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      // Delete the lesson document
      await deleteDoc(doc(db, "lessons", lessonId));

      // Delete the PDF from storage
      if (pdfUrl) {
        const pdfRef = ref(storage, pdfUrl);
        await deleteObject(pdfRef);
      }

      setLessons(lessons.filter(lesson => lesson.id !== lessonId));

      toast({
        title: "Success",
        description: "Lesson deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast({
        title: "Error",
        description: "Failed to delete lesson",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading…</div>;
  }

  return (
    <div>
      {editingLesson ? (
        <div className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Edit Lesson</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Grade</label>
              <Input
                value={editingLesson.grade}
                onChange={(e) => setEditingLesson({...editingLesson, grade: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <Input
                value={editingLesson.subject}
                onChange={(e) => setEditingLesson({...editingLesson, subject: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subsubject</label>
              <Input
                value={editingLesson.subsubject}
                onChange={(e) => setEditingLesson({...editingLesson, subsubject: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lesson Number</label>
              <Input
                value={editingLesson.lessonNumber}
                onChange={(e) => setEditingLesson({...editingLesson, lessonNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lesson Title</label>
              <Input
                value={editingLesson.lessonTitle}
                onChange={(e) => setEditingLesson({...editingLesson, lessonTitle: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setEditingLesson(null)}>Cancel</Button>
          </div>
        </div>
      ) : null}

      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Grade</th>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Subsubject</th>
            <th className="p-2 border">Lesson #</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">PDF</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id}>
              <td className="p-2 border">{lesson.grade}</td>
              <td className="p-2 border">{lesson.subject}</td>
              <td className="p-2 border">{lesson.subsubject}</td>
              <td className="p-2 border">{lesson.lessonNumber}</td>
              <td className="p-2 border">{lesson.lessonTitle}</td>
              <td className="p-2 border">
                <a href={lesson.pdfUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View</a>
              </td>
              <td className="p-2 border">
                <button
                  className="text-blue-600 hover:underline mr-2"
                  onClick={() => handleEdit(lesson)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(lesson.id, lesson.pdfUrl)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LessonTable;
