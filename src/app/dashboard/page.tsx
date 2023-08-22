import DashboardCard from '@/components/layout/dashboard-card';
import { DASHBOARD_CARD } from '@/lib/consts';
import Image from 'next/image';
import React from 'react';

export default function DashboardPage() {
	return (
		<div className='p-5 flex flex-col gap-5 overflow-y-scroll'>
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
				<div className=''>
					<Image
						src='/graph.png'
						alt='Graph'
						width={900}
						height={600}
						className=''
					/>
				</div>
			</div>
		</div>
	);
}
