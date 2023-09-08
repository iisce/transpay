import React from 'react';
import DashboardCard from './dashboard-card';
import { SuperAdminRevenueCharts } from '@/components/shared/chats/super-admin-revenue-chart';

export default function DashboardSuperAdmin(user: USERI) {
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
			<div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-10'>
				<div className='w-full aspect-video col-span-3 sm:col-span-2 bg-secondary rounded-xl py-5 px-2'>
					<div className='text-2xl mb-2'>Earning Revenue</div>
					<div className='text-2xl mb-4'>2023</div>
					<SuperAdminRevenueCharts />
				</div>
				<div className='col-span-3 sm:col-span-2'></div>
			</div>
		</div>
	);
}
