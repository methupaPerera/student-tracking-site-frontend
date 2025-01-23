"use client";

import type { Children } from "@/types";

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
import { IoMailOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";

export default function Page({ children }: Children) {
    const pathname = usePathname();

    let activePage: string = "";

    switch (pathname) {
        case "/dashboard":
            activePage = "Overview";
            break;
        case "/dashboard/events":
            activePage = "Events";
            break;
        case "/dashboard/users/students":
            activePage = "Students";
            break;
        case "/dashboard/users/teachers":
            activePage = "Teachers";
            break;
        case "/dashboard/users/admins":
            activePage = "Admins";
            break;
        case "/dashboard/settings":
            activePage = "Settings";
            break;
    }
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
                                        <BreadcrumbLink href="/dashboard">
                                            Dashboard
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {activePage}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
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
