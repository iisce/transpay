import { getDashboardTotalTracker } from "@/lib/controllers/revenue.controller";
import DashboardCard from "./dashboard-card";

export default async function TotalTrackerCard({
     start_date,
     end_date,
     title,
     desc,
}: {
     start_date: string;
     end_date: string;
     title: string;
     desc: string;
}) {
     const total = await getDashboardTotalTracker(start_date, end_date);
     return <DashboardCard title={title} amount={total || 0} desc={desc} />;
}
