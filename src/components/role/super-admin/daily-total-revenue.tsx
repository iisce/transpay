import React from 'react';
import DashboardCard from './dashboard-card';
import { getDashboard } from '@/lib/get-data';

export default async function DailyTotalRevenue() {
	const dashboardDetails = await getDashboard('1D');
	const totalDailyRevenue = dashboardDetails?.data.chart.total.revenue;
	return (
		<DashboardCard
			type='positive'
			title='Daily Total Revenue'
			amount={totalDailyRevenue || 0}
			percent={0}
			desc='Today'
		/>
	);
}
