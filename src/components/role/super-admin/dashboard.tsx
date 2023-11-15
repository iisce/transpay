import React from 'react';
import DashboardCard from './dashboard-card';
import { SuperAdminRevenueCharts } from '@/components/shared/chats/super-admin-revenue-chart';
import { Calendar } from '@/components/ui/calendar';
import { ACTIVITIES, TRANSACTIONS } from '../../../../data';
import ActivityCard from '@/components/shared/activity-card';
import { DataTable } from '@/components/ui/table/data-table';
import { adminsColumns } from '@/components/ui/table/columns';
import { getAdmins } from '@/lib/controllers/admin-controller';
import { getTransactions } from '@/app/api/transactions/transactions';

export default async function DashboardSuperAdmin(user: { user: IUser }) {
	const admins = await getAdmins();
	const blackListed =
		admins?.filter((admin) => admin.blacklisted === true) || [];

	const transactions = await getTransactions();
	const dailyFees = transactions.filter(
		(transaction) => transaction.transaction_type === 'DAILY_FEES'
	);
	const trackerFees = transactions.filter(
		(transaction) => transaction.transaction_type === 'TRACKER_FEES'
	);

	const totalRevenueAmount = TRANSACTIONS.reduce(
		(total, transaction) => total + transaction.amount,
		0
	);
	const totalDailyFeesAmount = dailyFees.reduce(
		(total, transaction) => total + transaction.amount,
		0
	);
	const totalTrackerFeesAmount = trackerFees.reduce(
		(total, transaction) => total + transaction.amount,
		0
	);

	return (
		<div className='w-full'>
			<div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5'>
				<DashboardCard
					type={
						totalRevenueAmount < 0
							? 'negative'
							: totalRevenueAmount === 0
							? 'neutral'
							: 'positive'
					}
					title='Total Revenue'
					amount={totalDailyFeesAmount}
					percent={10}
				/>
				<DashboardCard
					type={
						totalDailyFeesAmount < 0
							? 'negative'
							: totalDailyFeesAmount === 0
							? 'neutral'
							: 'positive'
					}
					title='Daily Fees'
					amount={totalDailyFeesAmount}
					percent={10}
				/>
				<DashboardCard
					type={
						totalTrackerFeesAmount < 0
							? 'negative'
							: totalTrackerFeesAmount === 0
							? 'neutral'
							: 'positive'
					}
					title='Tracker Fees'
					amount={totalTrackerFeesAmount}
					percent={10}
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
							<SuperAdminRevenueCharts />
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
							{ACTIVITIES.map((activity, k) => (
								<ActivityCard
									key={k}
									id={activity.id}
									name={activity.name}
									activity_id={activity.activity_id}
									time={activity.time}
									date={activity.date}
									description={activity.description}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
