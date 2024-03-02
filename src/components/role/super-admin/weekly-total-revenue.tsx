import React from 'react';
import DashboardCard from './dashboard-card';
import { getDashboard, getDashboardTotalDailyRevenue } from '@/lib/get-data';

export default async function WeeklyTotalRevenue() {
	const weeklyTotalRevenue = await getDashboardTotalDailyRevenue();
	return (
		<DashboardCard
			type='positive'
			title='Weekly Total Revenue'
			amount={weeklyTotalRevenue || 0}
			percent={0}
			desc='Today'
		/>
	);
}
