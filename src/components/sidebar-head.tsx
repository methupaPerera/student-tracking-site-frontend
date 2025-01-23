"use client";

import { useSession } from "@/context/Session";

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarHead() {
    const session = useSession();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                    <div className="flex aspect-square size-8 items-center font-medium justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                        LS
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            Learn<span className="text-primary">Sphere</span>
                        </span>
                        <span className="capitalize truncate text-xs">
                            {session?.user.userType}
                        </span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
