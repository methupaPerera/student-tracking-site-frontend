import { MdDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaUsers, FaUserCircle } from "react-icons/fa";

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
        isActive: true,
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
        isActive: true,
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
        title: "Students",
        url: "/dashboard/students",
        isActive: true,
        icon: FaUsers,
        items: [
            {
                title: "My Student List",
                url: "/dashboard/students/list",
            },
            {
                title: "Mark Attendance",
                url: "/dashboard/students/attendance",
            },
        ],
    },
    {
        title: "Actions",
        url: "/dashboard/students/actions",
        isActive: true,
        icon: FaUsers,
        items: [
            {
                title: "Update Profile",
                url: "/dashboard/students/actions",
            },
        ],
    },
];
