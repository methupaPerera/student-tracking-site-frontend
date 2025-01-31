# Student Tracking System

## 🧭 Navigation

-   [Guide - You should read this. :)](#guide-for-exploring-the-features)
-   [Project Scope](#-project-scope)
-   [Main Features](#-main-features)
-   [Technologies Used](#-technologies-used)
-   [Folder Structure](#-folder-structure)
-   [User Interfaces](#-user-interfaces)
    -   [General UIs](#general)
    -   [Admin UIs](#admin)
    -   [Teacher UIs](#teacher)
    -   [Student Profile UI](#student-profile-ui)
-   [Contact](#-contact)

> **Note:** You can read the documentation of backend API [here](https://github.com/methupaPerera/student-tracking-site-backend)...

> **Just letting you know:** Basic security features are implemented but not tested well due to time constraints.

## 📌 Project Scope

The **Student Tracking System** is designed to efficiently manage and track student records, attendance, and performance. It provides a user-friendly interface for school administrators and teachers to interact with relevant data.

## 🚀 Main Features

-   Attendance tracking.
-   Student performance, activities and grades tracking.
-   Reporting and analytics dashboard.
-   Students, Teacher & Admins Management for Admins.
-   User authentication and role-based access.
-   Protected routes both in frontend and backend.

## 🛠️ Technologies Used

-   **Frontend**: Next.js (React.js)
-   **Backend**: Express.js (Node.js)
-   **Database**: MongoDB
-   **Authentication**: JWT
-   **Styling**: Tailwind CSS
-   **Version Control**: Git & GitHub
-   **Hosting**: Vercel
-   **UI Library**: ShadCN

## 🎨 User Interfaces

> **Note:** The required UIs for your task have been made, and some of my own ideas have been included. One or two of them are still under development due to time constraints.

### General

-   **Login Page**: Provides secure role based authentication using JWT.

### Admin

-   **Dashboard**: Displays an overview of students, teachers, attendance, and school events providing some general statistics with charts and tables.

    > **Note:** Some details are not fetched from the backend.

-   **Events Page**: Allows administrators to create, manage, and schedule school events.

-   **Students Page**: Allows administrators to register, edit, and manage student profiles.

-   **Teachers Page**: Allows administrators to register, edit, and manage teacher profiles.

-   **Admins Page**: Allows existing administrators to create new admins.

-   **Settings Page**: Allows existing administrators to manage their account settings.

### Teacher

-   **Student List Page**: Allows teachers to view and manage student profiles.

-   **Attendance Tracking**: Enables marking and reviewing student attendance records.

-   **Manage Details**: This UI let's teachers to add extra curricular activities to the student profile and manage their exam marks for terms.

> **Note:** As teachers should mark attendance for their students, they can only access this features.

> **Try it:** You can test marking student attendance by clicking the checkboxes and saving it. If there are no attendance data for a day, the table status column will be empty.

### Student Profile UI

-   This UI has 3 tabs which shows the student personal information, attendance and performance.
-   The performance tab shows the student academic performance across terms, their ranking in class and their extra curricular activities.
-   The attendance tab shows the student attendance rate, which could be useful for ALs. (80%)

## 📂 Folder Structure

```bash
./
├── public/                  # Static assets (Images, etc.)
├── src/                     # Source code.
│   ├── app/                 # Application logic and pages.
│   │   ├── dashboard/       # Dashboard-related pages.
│   │   │   ├── events/      # Events management. (admin only)
│   │   │   ├── settings/    # Dashboard settings. (admin only)
│   │   │   ├── students/    # Student-related pages. (teacher only)
│   │   │   │   ├── attendance/   # Attendance tracking page.
│   │   │   │   └── list/         # Student listing for logged in teacher.
│   │   │   │       ├── [studentId]/   # Dynamic student details page.
│   │   │   ├── users/         # User management. (admin only)
│   │   │   │   ├── admins/    # Admins.
│   │   │   │   ├── students/  # Students.
│   │   │   │   │   ├── [studentId]/  # Dynamic student details page.
│   │   │   │   ├── teachers/  # Teacher.
│   │   │   │   │   ├── [teacherId]/  # Dynamic teacher details page.
│   │   ├── login/            # Login page.
│   ├── components/           # Reusable UI components.
│   │   ├── dashboards/       # Components related to dashboards.
│   │   │   ├── mini-components/   # Small reusable parts.
│   │   │   │   ├── carousel/  # Carousel for events.
│   │   │   │   ├── charts/    # Chart components.
│   │   │   │   ├── events/    # Event-related components.
│   │   │   │   ├── forms/     # Form components.
│   │   │   │   ├── tables/    # Table components.
│   │   ├── ui/               # UI library files.
│   ├── context/              # Context API state management.
│   ├── data/                 # Data for components.
│   ├── hooks/                # Custom React hooks.
│   ├── lib/                  # Utility functions.
│   ├── types/                # Type definitions for typescript.
```

## Guide for exploring the features.

> **Note:** Use a desktop for better experience.

1. Log in using the guest login buttons.
2. Once logged in as an admin, you will see a stunning dashboard.
3. Click the buttons on the dashboard cards to navigate through different pages designed for admins.
4. Visit the events page, which includes carousels, forms, and modals for creating, editing, and managing events.
5. Check out the students' page, click the action button, and then navigate to the student profile page. (Mock data is available for a student with the email 'nadeeshaperera@example.com.')
6. Admins can register, edit, and manage students, teachers, and other admins.
7. Explore the other admin-related pages accordingly.
8. After that, log out and log in as a teacher.
9. Teachers can view student details, add term test marks and activities, and mark attendance.
10. On the attendance marking page, teachers can select a date and mark present students using checkboxes.
11. You can test the attendance feature by selecting a date and clicking the 'Mark Attendance' button. It is fully functional with the backend.
12. On the student list page, click the 'Manage Details' button to update the student profile, including adding term test marks and activities.

## 📞 Contact

For any queries or issues, contact me at methupaperera48@gmail.com or send whatsapp message at `+94 76 943 7742`

> Check out my portfolio website [here...](https://methupa.vercel.app)

> Also check out my github profile [here...](https://github.com/methupaPerera)
