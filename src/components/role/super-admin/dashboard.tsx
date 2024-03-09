import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import DailyTotalRevenue from './daily-total-revenue';
import DashboardActivities from './dashboard-activities';
import DashboardBlacklisted from './dashboard-blacklisted';
import DashboardEarningRevenue from './dashboard-earning-revenue';
import MonthlyTotalRevenue from './monthly-total-revenue';
import TotalTrackerRevenue from './yearly-total-tracker';
import YearlyTotalRevenue from './yearly-total-revenue';
import WeeklyTotalRevenue from './weekly-total-revenue';
import YearlyTotalTracker from './yearly-total-tracker';
import MonthlyTotalTracker from './monthly-total-tracker';
import WeeklyTotalTracker from './weekly-total-tracker';
import DailyTotalTracker from './daily-total-tracker';
import { Separator } from '@/components/ui/separator';
import { DashboardVehicleSummary } from './dashboard-vehicle-summary';
import { DashboardDriverSummary } from './dashboard-driver-summary';
import { DashboardAgentSummary } from './dashboard-agent-summary';

export default function DashboardSuperAdmin(user: { user: IUser }) {
	return (
		<div className='w-full'>
			<div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
				<Suspense
					fallback={
						<Skeleton className='h-24 rounded-2xl shadow-md w-full bg-secondary p-3 flex flex-col justify-between' />
					}
				>
					<YearlyTotalRevenue />
				</Suspense>
				<Suspense
					fallback={
						<Skeleton className='h-24 rounded-2xl shadow-md w-full bg-secondary p-3 flex flex-col justify-between' />
					}
				>
					<MonthlyTotalRevenue />
				</Suspense>
				<Suspense
					fallback={
						<Skeleton className='h-24 rounded-2xl shadow-md w-full bg-secondary p-3 flex flex-col justify-between' />
					}
				>
					<WeeklyTotalRevenue />
				</Suspense>
				<Suspense
					fallback={
						<Skeleton className='h-24 rounded-2xl shadow-md w-full bg-secondary p-3 flex flex-col justify-between' />
					}
				>
					<DailyTotalRevenue />
				</Suspense>
				<Suspense
					fallback={
						<Skeleton className='h-24 rounded-2xl shadow-md w-full bg-secondary p-3 flex flex-col justify-between' />
					}
				>
					<YearlyTotalTracker />
				</Suspense>
				<Suspense
					fallback={
						<Skeleton className='h-24 rounded-2xl shadow-md w-full bg-secondary p-3 flex flex-col justify-between' />
					}
				>
					<MonthlyTotalTracker />
				</Suspense>
				<Suspense
					fallback={
						<Skeleton className='h-24 rounded-2xl shadow-md w-full bg-secondary p-3 flex flex-col justify-between' />
					}
				>
					<WeeklyTotalTracker />
				</Suspense>
				<Suspense
					fallback={
						<Skeleton className='h-24 rounded-2xl shadow-md w-full bg-secondary p-3 flex flex-col justify-between' />
					}
				>
					<DailyTotalTracker />
				</Suspense>
			</div>
			<Separator className='my-5' />
			<div className='w-full gap-5 grid md:grid-cols-2 lg:grid-cols-3'>
				<DashboardVehicleSummary />
				<DashboardAgentSummary />
				<DashboardDriverSummary />
			</div>
		</div>
	);
}
