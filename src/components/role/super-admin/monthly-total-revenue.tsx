import React from 'react';
import DashboardCard from './dashboard-card';
import { getDashboard } from '@/lib/get-data';

export default async function MonthlyTotalRevenue() {
	const dashboardDetails = await getDashboard('1M');
	const totalMonthlyRevenue = dashboardDetails?.data.chart.total.revenue;
	return (
		<DashboardCard
			type='positive'
			title='Monthly Total Revenue'
			amount={totalMonthlyRevenue || 0}
			percent={0}
			desc='Month Till Date'
		/>
	);
}
