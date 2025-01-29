"use client";

import type { Student } from "@/types/student";

// Importing utilities.
import { useEffect, useState } from "react";
import makeFetch from "@/lib/makeFetch";

// Importing components.
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

type AttendanceData = { name: string; status: string | null; user_id: string };

const columns: ColumnDef<AttendanceData>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");

            return (
                <span
                    className={`capitalize inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                        status === "present"
                            ? "bg-green-100 text-green-800"
                            : status === "absent"
                            ? "bg-red-100 text-red-800"
                            : ""
                    }`}
                >
                    {status as React.ReactNode}
                </span>
            );
        },
    },
];

export default function MarkAttendance() {
    const [rowSelection, setRowSelection] = useState({});
    const [data, setData] = useState<Student[]>([]);
    const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
    const [date, setDate] = useState<Date>(new Date());

    const table = useReactTable({
        data: attendanceData ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    });

    const fetchClassStudents = async () => {
        const res = await makeFetch("/api/teacher/students");
        const data = await res.json();

        setData(data.students);
    };

    const handleAttendanceMarking = async () => {
        const tid = toast.loading("Marking attendance...");

        const presentStudents = table
            .getSelectedRowModel()
            .flatRows.map((row) => row.original)
            .map((student) => student.user_id);
        const dateMarkingFor = new Date(date).toLocaleDateString("en-CA");

        const res = await makeFetch("/api/teacher/mark-attendance", {
            method: "PUT",
            body: JSON.stringify({
                studentIds: presentStudents,
                date: dateMarkingFor,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success(data.message, { id: tid });
            fetchClassStudents();
        } else {
            data.errors.forEach((error: string) =>
                toast.error(error, { id: tid })
            );
        }
    };

    useEffect(() => {
        fetchClassStudents();
    }, []);

    useEffect(() => {
        if (!data.length || !date) return;

        const getDataForSelectedDate = () => {
            const selectedDate = new Date(date);
            const month = selectedDate
                .toLocaleString("en-US", { month: "long" })
                .toLowerCase();
            const formattedDate = new Date(selectedDate).toLocaleDateString(
                "en-CA"
            );

            const newData = data.map((student) => {
                const records = student.academicRecords.attendance[month];

                if (!records) {
                    return {
                        name: student.name,
                        status: null,
                        user_id: student.user_id,
                    };
                }

                const status = student.academicRecords.attendance[
                    month
                ]?.filter(
                    ({ date }) =>
                        new Date(date).toLocaleDateString("en-CA") ===
                        formattedDate
                )[0];

                return {
                    user_id: student.user_id,
                    name: student.name,
                    status: status ? status.status : null,
                };
            });

            return newData;
        };

        const newData = getDataForSelectedDate();

        setAttendanceData(newData);
    }, [data, date]);

    return (
        <div className="p-4">
            <div className="flex md:flex-row flex-col w-full gap-4">
                <div className="w-full">
                    <div className="px-1 flex md:flex-row flex-col justify-between md:items-center mb-3 text-sm text-gray-600">
                        <p>
                            Attendance -{" "}
                            {new Date(date).toLocaleDateString("en-CA")}
                        </p>
                        <p className="flex gap-2">
                            <span className="text-green-600">
                                Present -{" "}
                                {attendanceData.reduce(
                                    (total, prev) =>
                                        prev.status === "present"
                                            ? total + 1
                                            : total,
                                    0
                                )}
                            </span>
                            <span>•</span>
                            <span className="text-red-600">
                                Absent -{" "}
                                {attendanceData.reduce(
                                    (total, prev) =>
                                        prev.status === "absent"
                                            ? total + 1
                                            : total,
                                    0
                                )}
                            </span>
                        </p>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>

                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={
                                                row.getIsSelected() &&
                                                "selected"
                                            }
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
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

                    <div className="flex items-center justify-between space-x-2 py-4">
                        <Button onClick={handleAttendanceMarking}>
                            Mark Attendance
                        </Button>

                        <div className="flex items-center gap-2">
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

                <Calendar
                    mode="single"
                    selected={date}
                    // @ts-ignore
                    onSelect={setDate}
                    className="rounded-md border shadow w-fit h-fit mx-auto"
                />
            </div>
        </div>
    );
}
