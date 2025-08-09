import React from "react";
import LessonTable from "../components/admin/LessonTable";
import LessonUploadDialog from "../components/admin/LessonUploadDialog";
import LessonBulkUploadDialog from "../components/admin/LessonBulkUploadDialog";

const AdminLessons: React.FC = () => {
  // TODO: Protect this page (admin only)
  // TODO: Integrate LessonTable, LessonUploadDialog, LessonBulkUploadDialog
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lessons Management</h1>
      <div className="mb-6">
        <LessonTable />
      </div>
      <div className="mb-6">
        <LessonUploadDialog />
      </div>
      <div>
        <LessonBulkUploadDialog />
      </div>
    </div>
  );
};

export default AdminLessons;
