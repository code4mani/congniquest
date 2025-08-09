# Lessons Management UI Design (Admin Only)

## Overview
A protected admin interface for uploading, editing, and managing lesson PDFs and their metadata. Supports both single and bulk uploads.

## Features
- Upload single lesson PDF with metadata:
  - Grade
  - Subject
  - Subsubject
  - Lesson Number
  - Lesson Title
  - (Optional) Description, Tags
- List/search lessons by metadata
- Edit lesson details
- Bulk upload:
  - Step 1: Upload multiple PDFs for a specific Grade-Subject-Subsubject
  - Step 2: Enter/edit Lesson Number and Lesson Title for each file in a table before confirming upload
  - Validate and confirm before saving

## UI Flow
1. **Admin Dashboard**: Link to "Manage Lessons"
2. **Lessons List Page**: Table of lessons, filter/search by metadata, buttons for single/bulk upload
3. **Single Upload Dialog**: Form for PDF + metadata
4. **Bulk Upload Dialog**:
   - Step 1: File picker for multiple PDFs, select Grade/Subject/Subsubject
   - Step 2: Table with one row per file, editable fields for Lesson Number and Title
   - Step 3: Confirm and upload

## Data Model (Firestore)
- Collection: `lessons`
- Fields:
  - `grade`: string
  - `subject`: string
  - `subsubject`: string
  - `lessonNumber`: string or int
  - `lessonTitle`: string
  - `description`: string (optional)
  - `tags`: array (optional)
  - `pdfUrl`: string (Storage URL)
  - `createdAt`, `updatedAt`: timestamp
  - `uploadedBy`: user id/email

## Access Control
- Only users with `role: admin` can access lessons management UI and perform uploads/edits.

## Validation
- All metadata fields required except description/tags
- Lesson Number and Title required for each file in bulk upload

---

# User & Role Management UI Design (Admin Only)

## Overview
A protected admin interface for managing users, roles, and access.

## Features
- List all users (table)
- Search/filter by email, role, allowed
- Edit user roles (admin, teacher, student)
- Set allowed status
- Add/remove users

## UI Flow
1. **Admin Dashboard**: Link to "Manage Users"
2. **Users List Page**: Table of users, inline edit for role/allowed, add/remove buttons

## Data Model (Firestore)
- Collection: `users`
- Fields:
  - `email`: string
  - `displayName`: string
  - `role`: string (admin, teacher, student)
  - `allowed`: boolean
  - `createdAt`, `updatedAt`: timestamp

## Access Control
- Only users with `role: admin` can access user management UI

## Validation
- Email required, role required
- Only admin can change roles/allowed status
