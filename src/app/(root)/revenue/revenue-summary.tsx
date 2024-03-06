import StatsCard from '@/components/shared/statistics-card';
import { getRevenueStats } from '@/lib/controllers/revenue-controller';
import React from 'react';

export default async function RevenueSummary() {
	const revenueData = await getRevenueStats();
	return (
		<div className='py-5 flex flex-row flex-wrap'>
			<StatsCard
				desc='All revenue year till date'
				percentage={100}
				type='up'
				title='Total Revenue'
				amount={String(revenueData!.total)}
			/>
		</div>
	);
}
