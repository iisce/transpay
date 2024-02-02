import React from 'react';
import DashboardCard from './dashboard-card';
import { getDashboard } from '@/lib/get-data';

export default async function YearlyTotalRevenue() {
	const dashboardDetails = await getDashboard('1Y');
	const totalRevenueAmount = dashboardDetails?.data.chart.total.revenue;
	return (
		<DashboardCard
			type='positive'
			title='Yearly Total Revenue'
			amount={totalRevenueAmount || 0}
			percent={0}
			desc='Year Till Date'
		/>
	);
}
