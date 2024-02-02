import { SuperAdminRevenueCharts } from '@/components/shared/chats/super-admin-revenue-chart';
import { getDashboard } from '@/lib/get-data';
import {
	transformTransactionsToDaysData,
	transformTransactionsToMonthsData,
	transformTransactionsToWeeksData,
} from '@/lib/utils';
import React from 'react';

export default async function DashboardEarningRevenue() {
	const dashboardDetails = await getDashboard('1Y');

	const transactions = dashboardDetails?.data.chart.transactions.all;

	const chartDataMonth = transformTransactionsToMonthsData(
		transactions || []
	);
	const chartDataWeek = transformTransactionsToWeeksData(transactions || []);
	const chartDataDay = transformTransactionsToDaysData(transactions || []);
	return (
		<div className='flex flex-col w-full aspect-[3/2] xl:aspect-[2/1] bg-secondary rounded-xl p-3 md:p-5'>
			<div className='text-2xl mb-2'>
				Earning Revenue
				<div className='text-2xl mb-4'>2023</div>
			</div>
			<div className='h-full'>
				<SuperAdminRevenueCharts data={chartDataDay} />
			</div>
		</div>
	);
}
