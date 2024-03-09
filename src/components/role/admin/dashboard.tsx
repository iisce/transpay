import DashboardCard from '@/components/layout/dashboard-card';
import { RevenueCharts } from '@/components/shared/chats/revenue-chart';
import { DASHBOARD_CARD } from '@/lib/consts';
import React from 'react';

export default function DashboardAdmin(user: { user: IUser }) {
	return (
		<div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full'>
				{DASHBOARD_CARD.map((card: DashboardCardI, i) => (
					<DashboardCard
						key={i}
						name={card.name}
						image={card.image}
						href={card.href}
						description={card.description}
						number={card.number}
						icon={card.icon}
					/>
				))}
			</div>
			<div className='flex flex-col gap-2 mb-20'>
				<div className=' text-title1Bold md:text-h4Bold'>
					Revenue & Statistics
				</div>
				<div className='bg-secondary rounded-3xl p-2 md:p-5'>
					{/* <RevenueCharts /> */}
				</div>
			</div>
		</div>
	);
}
