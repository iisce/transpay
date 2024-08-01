import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
     getAgentsOverview,
     getDriversOverview,
     getVehiclesOverview,
} from "@/lib/controllers/overview.controller";
import { format, subMonths, subWeeks, subYears } from "date-fns";
import { Suspense } from "react";
import DailyTotalTracker from "./daily-total-tracker";
import { DashboardAgentSummary } from "./dashboard-agent-summary";
import { DashboardDriverSummary } from "./dashboard-driver-summary";
import { DashboardVehicleSummary } from "./dashboard-vehicle-summary";
import MonthlyTotalTracker from "./monthly-total-tracker";
import TotalRevenueCard from "./total-revenue-card";
import WeeklyTotalTracker from "./weekly-total-tracker";
import YearlyTotalTracker from "./yearly-total-tracker";
import TotalTrackerCard from "./total-tracker-card";

export default async function DashboardSuperAdmin() {
     const today = new Date();
     const date_range = [
          {
               title: "Yearly Total",
               description: "Year Till Date",
               start: subYears(today, 1),
               end: today,
          },
          {
               title: "Monthly Total",
               description: "Month Till Date",
               start: subMonths(today, 1),
               end: today,
          },
          {
               title: "Weekly Total",
               description: "Week Till Date",
               start: subWeeks(today, 1),
               end: today,
          },
          {
               title: "Daily Total",
               description: "Today",
               start: today,
               end: today,
          },
     ] as const;

     const vehicleOverview = await getVehiclesOverview();
     const DriverOverview = await getDriversOverview();
     const AgentOverview = await getAgentsOverview();

     const sampleVehicle = {
          total: 0,
          active: 0,
          owing: 0,
          cleared: 0,
          onWaivers: 0,
     };
     const sampleDriver = { total: 0, active: 0, inactive: 0 };
     const sampleAgent = { total: 0, active: 0, inactive: 0 };
     return (
          <div className="w-full">
               <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {date_range.map(({ start, end, title, description }, b) => (
                         <Suspense
                              key={b}
                              fallback={
                                   <Skeleton className="flex h-24 w-full flex-col justify-between rounded-2xl bg-secondary p-3 shadow-md" />
                              }
                         >
                              <TotalRevenueCard
                                   startDate={format(start, "yyyy-MM-dd")}
                                   endDate={format(end, "yyyy-MM-dd")}
                                   title={`${title} Revenue`}
                                   desc={description}
                              />
                         </Suspense>
                    ))}
                    {date_range.map(({ start, end, title, description }, b) => (
                         <Suspense
                              key={b}
                              fallback={
                                   <Skeleton className="flex h-24 w-full flex-col justify-between rounded-2xl bg-secondary p-3 shadow-md" />
                              }
                         >
                              <TotalTrackerCard
                                   start_date={format(start, "yyyy-MM-dd")}
                                   end_date={format(end, "yyyy-MM-dd")}
                                   title={`${title} Tracker`}
                                   desc={description}
                              />
                         </Suspense>
                    ))}
               </div>
               <Separator className="my-5" />
               <div className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <DashboardVehicleSummary
                         info={vehicleOverview ?? sampleVehicle}
                    />
                    <DashboardDriverSummary
                         info={DriverOverview ?? sampleDriver}
                    />
                    <DashboardAgentSummary
                         info={AgentOverview ?? sampleAgent}
                    />
               </div>
          </div>
     );
}
