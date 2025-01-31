"use client";

import type { Student } from "@/types/student";

// Importing utilities.
import { useEffect, useState } from "react";
import makeFetch from "@/lib/makeFetch";

// Importing components.
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "user_id",
        header: "Student Id",
        cell: ({ row }) => <div>{row.getValue("user_id")}</div>,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "class",
        header: "Class",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("class")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => <div className="capitalize">Email</div>,
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "dateOfBirth",
        header: () => <div className="text-right">Date Of Birth</div>,
        cell: ({ row }) => {
            return (
                <div className="text-right font-medium">
                    {new Date(row.getValue("dateOfBirth")).toLocaleDateString(
                        "en-CA"
                    )}
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const student = row.original;

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
                        <Link
                            className="w-full"
                            href={`/dashboard/users/students/${student.user_id}`}
                        >
                            <Button
                                className="w-full"
                                size="sm"
                                variant="secondary"
                            >
                                Student Profile
                            </Button>
                        </Link>
                        <Link
                            className="w-full"
                            href={`/dashboard/students/list/${student.user_id}`}
                        >
                            <Button
                                className="w-full"
                                size="sm"
                                variant="outline"
                            >
                                Manage Details
                            </Button>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function StudentsTable() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const [data, setData] = useState<Student[]>([]);

    useEffect(() => {
        makeFetch("/api/teacher/students")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data.students);
            });
    }, []);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    });

    // console.log(table.getSelectedRowModel().flatRows.map((row) => row.original));

    return (
        <div className="w-full px-4">
            <div className="flex items-center justify-between py-4">
                <Input
                    type="text"
                    placeholder="Filter emails..."
                    value={
                        (table
                            .getColumn("email")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("email")
                            ?.setFilterValue(event.target.value)
                    }
                    className="w-96"
                />

                <p className="text-sm text-gray-500">
                    Students of Class {data?.[0]?.["class"]}
                </p>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
