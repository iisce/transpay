'use client';
import React from 'react';
import DashboardCard from './dashboard-card';
import { SuperAdminRevenueCharts } from '@/components/shared/chats/super-admin-revenue-chart';
import { Calendar } from '@/components/ui/calendar';

export default function DashboardSuperAdmin(user: USERI) {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	return (
		<div className='w-full'>
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
			<div className='flex gap-5 mt-10'>
				<div className='w-full aspect-video bg-secondary rounded-xl py-5 px-2'>
					<div className='text-2xl mb-2'>Earning Revenue</div>
					<div className='text-2xl mb-4'>2023</div>
					<SuperAdminRevenueCharts />
				</div>
				<div className='shrink-0 grow-0 hidden md:block '>
					<Calendar
						mode='single'
						selected={date}
						onSelect={setDate}
						className='rounded-t-xl border bg-secondary'
					/>
				</div>
			</div>
		</div>
	);
}
