import React, { useRef } from "react";

const LessonUploadDialog: React.FC = () => {
  // TODO: Connect to dialog/modal state
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-4 border rounded bg-white max-w-md">
      <h2 className="text-lg font-bold mb-2">Upload Lesson PDF</h2>
      <form>
        <div className="mb-2">
          <label className="block mb-1">PDF File</label>
          <input ref={fileInputRef} type="file" accept="application/pdf" className="border p-1 w-full" />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Grade</label>
          <input type="text" className="border p-1 w-full" />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Subject</label>
          <input type="text" className="border p-1 w-full" />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Subsubject</label>
          <input type="text" className="border p-1 w-full" />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Lesson Number</label>
          <input type="text" className="border p-1 w-full" />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Lesson Title</label>
          <input type="text" className="border p-1 w-full" />
        </div>
        <button type="submit" className="mt-2 px-4 py-1 bg-blue-600 text-white rounded">Upload</button>
      </form>
    </div>
  );
};

export default LessonUploadDialog;
