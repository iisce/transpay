import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import DailyTotalRevenue from './daily-total-revenue';
import DashboardActivities from './dashboard-activities';
import DashboardBlacklisted from './dashboard-blacklisted';
import DashboardEarningRevenue from './dashboard-earning-revenue';
import MonthlyTotalRevenue from './monthly-total-revenue';
import TotalTrackerRevenue from './total-tracker-fee';
import YearlyTotalRevenue from './yearly-total-revenue';

export default function DashboardSuperAdmin(user: { user: IUser }) {
	return (
		<div className='w-full'>
			{/* <pre>{JSON.stringify(dashboardDetails.data.chart, null, 2)}</pre> */}
			<div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
				<Suspense
					fallback={
						<Skeleton className='h-32 rounded-2xl shadow-md w-full bg-secondary p-3 flex flex-col justify-between' />
					}
				>
					<YearlyTotalRevenue />
				</Suspense>
				<Suspense
					fallback={
						<Skeleton className='h-32 rounded-2xl shadow-md w-full bg-secondary p-3 flex flex-col justify-between' />
					}
				>
					<MonthlyTotalRevenue />
				</Suspense>
				<Suspense
					fallback={
						<Skeleton className='h-32 rounded-2xl shadow-md w-full bg-secondary p-3 flex flex-col justify-between' />
					}
				>
					<DailyTotalRevenue />
				</Suspense>
				<Suspense
					fallback={
						<Skeleton className='h-32 rounded-2xl shadow-md w-full bg-secondary p-3 flex flex-col justify-between' />
					}
				>
					<TotalTrackerRevenue />
				</Suspense>
			</div>
			<div className='flex w-full gap-5 mt-5'>
				<div className='w-full flex flex-col gap-5'>
					<Suspense
						fallback={
							<Skeleton className='w-full aspect-[3/2] xl:aspect-[2/1] bg-secondary rounded-xl' />
						}
					>
						<DashboardEarningRevenue />
					</Suspense>
					<Suspense
						fallback={
							<Skeleton className='w-full bg-secondary rounded-xl' />
						}
					>
						<DashboardBlacklisted />
					</Suspense>
				</div>
				<div className='shrink-0 hidden lg:flex flex-col gap-5 max-w-[280px] w-full'>
					<Calendar
						mode='single'
						// selected={date}
						// onSelect={setDate}
						className='rounded-t-xl border bg-secondary'
					/>
					<Suspense
						fallback={
							<Skeleton className='rounded-xl border bg-secondary flex flex-col gap-3 p-2 h-64' />
						}
					>
						<DashboardActivities />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
