import ActivityCard from '@/components/shared/activity-card';
import { SuperAdminRevenueCharts } from '@/components/shared/chats/super-admin-revenue-chart';
import { Calendar } from '@/components/ui/calendar';
import { adminsColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getAllActivities } from '@/lib/controllers/activity-controller';
import { getDashboard } from '@/lib/get-data';
import {
	transformTransactionsToDaysData,
	transformTransactionsToMonthsData,
	transformTransactionsToWeeksData,
} from '@/lib/utils';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import DashboardCard from './dashboard-card';

export default async function DashboardSuperAdmin(user: { user: IUser }) {
	const all_activities = await getAllActivities();
	all_activities &&
		all_activities.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
		);
	const dashboardDetails = await getDashboard();
	// console.log(dashboardDetails);
	const blackListed = dashboardDetails?.data.admins.blacklisted || [];

	if (!dashboardDetails) return notFound();
	const transactions = dashboardDetails?.data.chart.transactions.all;
	// const transactions = await getTransactions();
	const totalRevenueAmount = dashboardDetails?.data.chart.total.revenue;
	const totalDailyFeesAmount = dashboardDetails?.data.chart.total.dailyFees;

	const dailyFees = transactions.filter(
		(transaction) => transaction.transaction_type === 'DAILY_FEES'
	);
	const trackerFees = transactions.filter(
		(transaction) => transaction.transaction_type === 'TRACKER_FEES'
	);

	const totalTrackerFeesAmount = trackerFees.reduce(
		(total, transaction) => total + transaction.amount,
		0
	);
	const chartDataMonth = transformTransactionsToMonthsData(transactions);
	const chartDataWeek = transformTransactionsToWeeksData(transactions);
	const chartDataDay = transformTransactionsToDaysData(transactions);

	return (
		<div className='w-full'>
			{/* <pre>{JSON.stringify(dashboardDetails.data.chart, null, 2)}</pre> */}
			<div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
				<DashboardCard
					type='positive'
					title='Yearly Total Revenue'
					amount={totalRevenueAmount}
					percent={0}
					desc='Year Till Date'
				/>
				<DashboardCard
					type='positive'
					title='Monthly Total Revenue'
					amount={totalRevenueAmount}
					percent={0}
				/>
				<DashboardCard
					type='positive'
					title='Daily Fees'
					amount={totalDailyFeesAmount}
					percent={0}
				/>
				<DashboardCard
					type='positive'
					title='Tracker Fees'
					amount={totalTrackerFeesAmount}
					percent={0}
				/>
			</div>
			<div className='flex w-full gap-5 mt-5'>
				<div className='w-full flex flex-col gap-5'>
					<div className='flex flex-col w-full aspect-[3/2] xl:aspect-[2/1] bg-secondary rounded-xl p-3 md:p-5'>
						<div className='text-2xl mb-2'>
							Earning Revenue
							<div className='text-2xl mb-4'>2023</div>
						</div>
						<div className='h-full'>
							<SuperAdminRevenueCharts
								data={chartDataDay}
							/>
						</div>
					</div>
					{blackListed.length > 0 && (
						<div className='w-full bg-secondary rounded-xl p-3 md:p-5'>
							<div className='text-2xl mb-2 px-4'>
								Blacklisted Admin
							</div>
							<DataTable
								showPagination={false}
								columns={adminsColumns}
								data={blackListed?.slice(0, 4) || []}
							/>
						</div>
					)}
				</div>
				<div className='shrink-0 hidden lg:flex flex-col gap-5 max-w-[280px] w-full'>
					<Calendar
						mode='single'
						// selected={date}
						// onSelect={setDate}
						className='rounded-t-xl border bg-secondary'
					/>
					<div className='rounded-xl border bg-secondary flex flex-col gap-3 p-2 h-full'>
						<div className='text-2xl px-3'>Activities</div>
						<div className='grid gap-3'>
							{all_activities &&
								all_activities
									.splice(0, 3)
									.map((activity, k) => (
										<ActivityCard
											key={k}
											id={activity.id}
											name={activity.name}
											activity_id={
												activity.activity_id
											}
											time={format(
												new Date(
													activity.createdAt
												),
												'h:mm a'
											)}
											date={new Date(
												activity.createdAt
											).toLocaleDateString()}
											description={
												activity.description
											}
											user_id={
												activity.user_id
											}
											user_role={
												activity.user_role
											}
										/>
									))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
