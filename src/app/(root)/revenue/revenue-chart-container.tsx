import { RevenueCharts } from '@/components/shared/chats/revenue-chart';
import { TRANSACTION_TYPE } from '@/lib/consts';
import { getRevenueStats } from '@/lib/controllers/revenue.controller';
import { getAllTransactions } from '@/lib/controllers/transactions.controller';
import {
	compareDates,
	transformTransactionsToDaysData,
	transformTransactionsToHoursData,
	transformTransactionsToMonthsData,
	transformTransactionsToWeeksData,
	transformTransactionsToYearsData,
} from '@/lib/utils';
import React from 'react';
export default async function RevenueChartContainer({
	start,
	end,
	title,
}: {
	start: string;
	end: string;
	title: string;
}) {
	const allTransactions = await getAllTransactions(start, end);
	const scope = compareDates(start, end);

	const formattedData =
		scope === 'hourly'
			? transformTransactionsToHoursData(allTransactions?.rows ?? [])
			: scope === 'daily'
			? transformTransactionsToDaysData(allTransactions?.rows ?? [])
			: scope === 'weekly'
			? transformTransactionsToWeeksData(allTransactions?.rows ?? [])
			: scope === 'monthly'
			? transformTransactionsToMonthsData(allTransactions?.rows ?? [])
			: transformTransactionsToYearsData(allTransactions?.rows ?? []);

	console.log({ formattedData });
	return <RevenueCharts data={formattedData} />;
}
