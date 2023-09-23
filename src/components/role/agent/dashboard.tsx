import DashboardCard from '@/components/layout/dashboard-card';
import { AGENT_DASHBOARD_CARD } from '@/lib/consts';
import React from 'react';

export default function DashboardAgent(user: IUser) {
	return (
		<div>
			<div className='flex flex-row flex-wrap'>
				{AGENT_DASHBOARD_CARD.map((card: DashboardCardI, i) => (
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
		</div>
	);
}
