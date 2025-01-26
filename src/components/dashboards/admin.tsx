// Importing components.
import { EventsTable } from "./mini-components/events-table";
import AdminDashboardCards from "./mini-components/admin-dashboard-cards";
import AttendanceChart from "./mini-components/attendance-chart";
import { Button } from "../ui/button";
import { MdOutlineFileDownload } from "react-icons/md";

export default function Admin() {
    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AdminDashboardCards />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AttendanceChart />
                <EventsTable />
            </div>

            <div className="mt-4 flex justify-end">
                <Button>
                    Download Report <MdOutlineFileDownload />
                </Button>
            </div>
        </div>
    );
}
