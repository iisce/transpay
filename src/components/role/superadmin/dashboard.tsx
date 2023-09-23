'use client';
import React from 'react';
import DashboardCard from './dashboard-card';
import { SuperAdminRevenueCharts } from '@/components/shared/chats/super-admin-revenue-chart';
import { Calendar } from '@/components/ui/calendar';
import { ACTIVITIES } from '../../../../data';
import ActivityCard from '@/components/shared/activity-card';
import { DataTable } from '@/components/ui/table/data-table';
import { agentsColumns } from '@/components/ui/table/columns';
import { AGENT_TABLE } from '@/lib/consts';

export default function DashboardSuperAdmin(user: IUser) {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	return (
		<div className='w-full mb-14'>
			<div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5'>
				<DashboardCard
					type='positive'
					title='Total Revenue'
					amount={200000}
					percent={10}
				/>
				<DashboardCard
					type='negative'
					title='Daily Fees'
					amount={200000}
					percent={10}
				/>
				<DashboardCard
					type='negative'
					title='Fines And Penalties'
					amount={200000}
					percent={10}
				/>
			</div>
			<div className='flex gap-5 mt-5'>
				<div className='w-full flex flex-col gap-5'>
					<div className='flex flex-col w-full aspect-[2/1] bg-secondary rounded-xl p-3 md:p-5'>
						<div className='text-2xl mb-2'>
							Earning Revenue
							<div className='text-2xl mb-4'>2023</div>
						</div>
						<div className='h-full'>
							<SuperAdminRevenueCharts />
						</div>
					</div>
					<div className='w-full bg-secondary rounded-xl p-3 md:p-5'>
						<div className='text-2xl mb-2 px-4'>
							Blacklisted Admin
						</div>
						<DataTable
							showPagination={false}
							columns={agentsColumns}
							data={AGENT_TABLE.slice(0, 3)}
						/>
					</div>
				</div>
				<div className='shrink-0 grow-0 hidden md:flex flex-col gap-5 max-w-[280px]'>
					<Calendar
						mode='single'
						selected={date}
						onSelect={setDate}
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
									time={activity.time}
									date={activity.date}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
