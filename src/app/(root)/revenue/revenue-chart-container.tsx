import { RevenueCharts } from '@/components/shared/chats/revenue-chart';
import { TRANSACTION_TYPE } from '@/lib/consts';
import { getRevenueStats } from '@/lib/controllers/revenue-controller';
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
	const revenueData = await getRevenueStats(
		start,
		end,
		TRANSACTION_TYPE.daily
	);
	const scope = compareDates(start, end);

	const formattedData =
		scope === 'hourly'
			? transformTransactionsToHoursData(
					revenueData?.transactions ?? []
			  )
			: scope === 'daily'
			? transformTransactionsToDaysData(
					revenueData?.transactions ?? []
			  )
			: scope === 'weekly'
			? transformTransactionsToWeeksData(
					revenueData?.transactions ?? []
			  )
			: scope === 'monthly'
			? transformTransactionsToMonthsData(
					revenueData?.transactions ?? []
			  )
			: transformTransactionsToYearsData(
					revenueData?.transactions ?? []
			  );

	console.log({ scope, formattedData });
	return <RevenueCharts data={formattedData} />;
}
