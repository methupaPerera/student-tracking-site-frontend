"use client";

import type { Children } from "@/types";

// Importing utilities.
import { usePathname } from "next/navigation";

// Importing components.
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { IoMailOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";

export default function Page({ children }: Children) {
    const pathname = usePathname();

    // Getting breadcrumb text for the current page...
    const getActivePage = () => {
        switch (pathname) {
            case "/dashboard":
                return "Overview";
            case "/dashboard/events":
                return "Events";
            case "/dashboard/users/teachers":
                return "Teachers";
            case "/dashboard/users/admins":
                return "Admins";
            case "/dashboard/settings":
                return "Settings";
            case "/dashboard/students/list":
                return "Student List";
            case "/dashboard/users/teachers/settings":
                return "Settings";
            case "/dashboard/students/attendance":
                return "Mark Attendance";
        }

        if (pathname.includes("/dashboard/users/students")) {
            return "Students";
        }
    };

    const activePage = getActivePage();

    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <div className="flex justify-between items-center border-b-[1px]">
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink asChild>
                                            <Link href="/dashboard">
                                                Dashboard
                                            </Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    
                                    <BreadcrumbSeparator className="hidden md:block" />

                                    <BreadcrumbPage>
                                        {activePage}
                                    </BreadcrumbPage>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>

                    <div className="flex items-center gap-2 text-gray-700 px-6">
                        <div className="p-2 border-[1px] rounded-full relative cursor-pointer bg-muted">
                            <GoBell size={18} />
                            <div className="right-2.5 top-2 size-[5px] rounded-full absolute bg-green-500 animate-ping"></div>
                        </div>
                        <div className="p-2 border-[1px] rounded-full cursor-pointer bg-muted">
                            <IoMailOutline size={20} />
                        </div>
                    </div>
                </div>

                <div>{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
