"use client";

import type { Admin } from "@/types/admin";

// Importing utilities.
import { useEffect, useState } from "react";
import makeFetch from "@/lib/makeFetch";

// Importing components.
import AdminsTable from "@/components/dashboards/mini-components/tables/admin-table";
import Loader from "@/components/loader";

export default function AdminsPage() {
    const [admins, setAdmins] = useState<Admin[]>([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            const res = await makeFetch("/api/admin");
            const data = await res.json();
            setAdmins(data);
        };

        fetchAdmins();
    }, []);

    if (!admins) return <Loader />;

    return (
        <div className="p-4">
            <AdminsTable data={admins} />
        </div>
    );
}
