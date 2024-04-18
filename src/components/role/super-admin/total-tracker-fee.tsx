import React from 'react';
import DashboardCard from './dashboard-card';
import { getDashboard, getDashboardTotalTrackerFees } from '@/lib/get-data';

export default async function TotalTrackerRevenue() {
	const trackerFeesTotal = await getDashboardTotalTrackerFees();
	return (
		<DashboardCard
			title='Tracker Fees'
			amount={trackerFeesTotal || 0}
			desc='Total tracker fees'
		/>
	);
}
