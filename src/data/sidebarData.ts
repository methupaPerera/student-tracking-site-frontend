import { MdDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaUsers } from "react-icons/fa";

const sidebarData = [
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

export default sidebarData;
