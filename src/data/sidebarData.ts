import { MdDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaUsers, FaUserCircle } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";

export const adminSidebarData = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: MdDashboard,
        isActive: true,
        items: [
            {
                title: "Overview",
                url: "/dashboard",
            },
            {
                title: "Events",
                url: "/dashboard/events",
            },
        ],
    },
    {
        title: "Users",
        url: "/dashboard/students",
        icon: FaUsers,
        items: [
            {
                title: "Students",
                url: "/dashboard/users/students",
            },
            {
                title: "Teachers",
                url: "/dashboard/users/teachers",
            },
            {
                title: "Admins",
                url: "/dashboard/users/admins",
            },
        ],
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: IoIosSettings,
        items: [
            {
                title: "General",
                url: "/dashboard/settings",
            },
        ],
    },
];

export const teacherSidebarData = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: MdDashboard,
        isActive: true,
        items: [
            {
                title: "Overview",
                url: "/dashboard",
            },
            {
                title: "My Classes",
                url: "/dashboard/classes",
            },
        ],
    },
    {
        title: "Students",
        url: "/dashboard/students",
        icon: FaUsers,
        items: [
            {
                title: "Student List",
                url: "/dashboard/students/list",
            },
            {
                title: "Performance",
                url: "/dashboard/students/performance",
            },
            {
                title: "Attendance",
                url: "/dashboard/students/attendance",
            },
        ],
    },
    {
        title: "Academic",
        url: "/dashboard/academic",
        icon: GiBookshelf,
        items: [
            {
                title: "Courses",
                url: "/dashboard/academic/courses",
            },
            {
                title: "Assignments",
                url: "/dashboard/academic/assignments",
            },
            {
                title: "Gradebook",
                url: "/dashboard/academic/gradebook",
            },
        ],
    },
    {
        title: "Profile",
        url: "/dashboard/profile",
        icon: FaUserCircle,
        items: [
            {
                title: "Personal Info",
                url: "/dashboard/profile",
            },
            {
                title: "Settings",
                url: "/dashboard/profile/settings",
            },
        ],
    },
];

export const studentSidebarData = [];
