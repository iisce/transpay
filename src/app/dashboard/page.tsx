import DashboardCard from '@/components/layout/dashboard-card';
import { Charts } from '@/components/shared/chats/charts';
import { DASHBOARD_CARD } from '@/lib/consts';
import React from 'react';

export default function DashboardPage() {
	return (
		<div className='h-full p-5 flex flex-col gap-5 overflow-y-scroll'>
			<div className='text-h3Bold'>Welcome Back, Admin ISCE</div>
			<div className='flex flex-row flex-wrap gap-5'>
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
				<div className='text-h4Bold'>Revenue & Statistics</div>
				<div className='bg-secondary rounded-3xl p-5'>
					<Charts />
				</div>
			</div>
		</div>
	);
}
