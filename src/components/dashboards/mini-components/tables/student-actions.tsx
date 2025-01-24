"use client";

import type { Student } from "@/types/student";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default function StudentActions({ student }: { student: Student }) {
    const clearStudent = () => {
        // pass
    };

    const editStudent = () => {
        // pass
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-36 flex flex-col -mt-1 gap-1.5"
            >
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Link href={`/dashboard/users/students/${student.user_id}`}>
                    <Button size="sm" variant="secondary">
                        Student Profile
                    </Button>
                </Link>
                <Button size="sm" variant="secondary">
                    Edit Details
                </Button>
                <Button size="sm" variant="destructive">
                    Clear Profile
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
