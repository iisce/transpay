import DashboardCard from '@/components/layout/dashboard-card';
import WebAgentCard from '@/components/layout/web-agent-card';
import { WEB_AGENT_CARD } from '@/lib/consts';
import React from 'react';

export default function WebAgent() {
	return (
		<div className='h-full p-5 flex flex-col gap-5 '>
			<div className='text-h3Bold py-8'>Welcome Back, Agent ISCE</div>
			<div className='flex flex-row flex-wrap gap-5'>
				{WEB_AGENT_CARD.map((card: DashboardCardI, i) => (
					<WebAgentCard
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
