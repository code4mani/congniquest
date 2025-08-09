import React, { useRef, useState } from "react";

interface BulkFile {
  file: File;
  lessonNumber: string;
  lessonTitle: string;
}

const LessonBulkUploadDialog: React.FC = () => {
  // TODO: Connect to dialog/modal state
  const [step, setStep] = useState(1);
  const [bulkFiles, setBulkFiles] = useState<BulkFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [subsubject, setSubsubject] = useState("");

  // Step 1: File selection and metadata
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

  // Step 2: Enter lesson numbers/titles
  const handleBulkFieldChange = (idx: number, field: "lessonNumber" | "lessonTitle", value: string) => {
    setBulkFiles((prev) => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  };

  return (
    <div className="p-4 border rounded bg-white max-w-2xl">
      <h2 className="text-lg font-bold mb-2">Bulk Upload Lessons</h2>
      {step === 1 && (
        <form>
          <div className="mb-2">
            <label className="block mb-1">PDF Files</label>
            <input ref={fileInputRef} type="file" accept="application/pdf" multiple className="border p-1 w-full" onChange={handleFilesSelected} />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Grade</label>
            <input type="text" className="border p-1 w-full" value={grade} onChange={e => setGrade(e.target.value)} />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Subject</label>
            <input type="text" className="border p-1 w-full" value={subject} onChange={e => setSubject(e.target.value)} />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Subsubject</label>
            <input type="text" className="border p-1 w-full" value={subsubject} onChange={e => setSubsubject(e.target.value)} />
          </div>
        </form>
      )}
      {step === 2 && (
        <div>
          <div className="mb-2">Enter Lesson Number and Title for each file:</div>
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
                    <input
                      type="text"
                      className="border p-1 w-full"
                      value={item.lessonNumber}
                      onChange={e => handleBulkFieldChange(idx, "lessonNumber", e.target.value)}
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      className="border p-1 w-full"
                      value={item.lessonTitle}
                      onChange={e => handleBulkFieldChange(idx, "lessonTitle", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="px-4 py-1 bg-blue-600 text-white rounded">Confirm & Upload</button>
        </div>
      )}
    </div>
  );
};

export default LessonBulkUploadDialog;
