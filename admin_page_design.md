# Admin Page Design & Use Cases

## Overview
The Admin page allows privileged users to manage access, roles, and key data for the CogniQuest platform. Admins can control who can use the app, assign roles (admin/teacher/student), and monitor user activity.

---

## Admin Use Cases

### 1. User Management
- View all registered users (list with email, name, role, allowed status)
- Add a new user (by email)
- Approve or deny access (toggle `allowed` field)
- Assign or change user roles (admin, teacher, student)
- Remove users from the platform

### 2. Role Management
- Promote/demote users to admin, teacher, or student
- Filter users by role
- Prevent self-demotion for the last admin

### 3. Access Control
- Maintain an allowlist of emails (or domains)
- Bulk import/export allowed users
- View pending access requests (if implemented)

### 4. Activity Monitoring (Optional)
- View user login history
- See recent activity (e.g., lessons accessed, questions posted)
- Flag or block suspicious accounts


### 6. Document & Worksheet Management
- Upload/delete lesson documents (PDFs) to Firebase Storage
- Upload worksheets (PDFs), parse to JSON, and show for admin review/edit
- After admin accepts, store parsed questions in Firestore for student access

---

## Example Admin Page Layout

```
-------------------------------------------------
| [Admin Dashboard]                              |
-------------------------------------------------
| [Users] [Roles] [Access] [Activity] [Content]  |
-------------------------------------------------
| [User List Table]                              |
| Email | Name | Role | Allowed | Actions        |
|-----------------------------------------------|
| user1@... | Alice | student | ✅ | [Edit][Remove] |
| user2@... | Bob   | teacher | ✅ | [Edit][Remove] |
| ...                                           |
-------------------------------------------------
| [Add User] [Bulk Import] [Export]              |
-------------------------------------------------
```

---

## UI/UX Notes
- Use tables with sorting/filtering for user lists
- Inline editing for roles and allowed status
- Confirmation dialogs for destructive actions
- Responsive design for mobile admin access
- Show clear status messages for actions (e.g., "User promoted to teacher")

---

## Data Model (Firestore Example)
- Collection: `users`
  - Document ID: user UID
  - Fields: `email`, `displayName`, `role`, `allowed`, `createdAt`, etc.

---

## Security Notes
- Only users with `role: admin` can access the admin page
- Prevent accidental lockout (always keep at least one admin)
- Log all admin actions for audit
