# Student Tracking System

## 📌 Project Overview

The **Student Tracking System** is designed to efficiently manage and track student records, attendance, and performance. It provides a user-friendly interface for school administrators and teachers to interact with relevant data.

## 🚀 Main Features

-   Attendance tracking.
-   Performance and grades tracking.
-   User authentication and role-based access.
-   Protected routes both in frontend and backend.
-   Reporting and analytics dashboard.

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

## 📞 Contact

For any queries or issues, contact me at methupaperera48@gmail.com or send whatsapp message at +94 76 943 7742.
