import React from 'react';
import DashboardCard from './dashboard-card';
import { getDashboard } from '@/lib/get-data';

export default async function TotalTrackerRevenue() {
	const dashboardDetails = await getDashboard('1Y');

	const transactions = dashboardDetails?.data.chart.transactions.all;
	const trackerFees = transactions?.filter(
		(transaction) => transaction.transaction_type === 'TRACKER_FEES'
	);

	const totalTrackerFeesAmount = trackerFees?.reduce(
		(total, transaction) => total + transaction.amount,
		0
	);
	return (
		<DashboardCard
			type='positive'
			title='Tracker Fees'
			amount={totalTrackerFeesAmount || 0}
			percent={0}
			desc='Total tracker fees'
		/>
	);
}
