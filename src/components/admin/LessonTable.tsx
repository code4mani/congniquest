import React from "react";

// TODO: Replace with real lesson data and actions
const mockLessons = [
  { id: "1", grade: "5", subject: "Math", subsubject: "Algebra", lessonNumber: "1", lessonTitle: "Introduction to Algebra", pdfUrl: "#" },
  { id: "2", grade: "5", subject: "Math", subsubject: "Algebra", lessonNumber: "2", lessonTitle: "Variables", pdfUrl: "#" },
];

const LessonTable: React.FC = () => {
  return (
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
        {mockLessons.map((lesson) => (
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
              {/* TODO: Edit/Delete actions */}
              <button className="text-blue-600 hover:underline mr-2">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LessonTable;
