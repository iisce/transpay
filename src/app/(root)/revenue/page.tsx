// 'use client';
import SplitPayment from '@/components/pages/activities/revenue/split-payment';
import { DailyFeesCharts } from '@/components/shared/chats/daily-fees';
import { FinesPaymentCharts } from '@/components/shared/chats/fines-and-penalties';
import { RevenueCharts } from '@/components/shared/chats/revenue-chart';
import { TotalRevenueCharts } from '@/components/shared/chats/total-revenue';
import StatsCard from '@/components/shared/statistics-card';
import { Badge } from '@/components/ui/badge';
import { BANK_RATE, FNTC } from '@/lib/consts';
import { getRevenueStats } from '@/lib/controllers/revenue-controller';
import { downIcon } from '@/lib/icons';
import {
	LAST_YEAR_END_DATE,
	LAST_YEAR_START_DATE,
	NEW_YEAR_START_DATE,
	calculatePercentageDifference,
	calculateTransactionTotals,
	filterTransactionsByDateRange,
} from '@/lib/utils';
import { notFound } from 'next/navigation';

export default async function Revenue() {
	const revenueData = await getRevenueStats();
	console.log(revenueData);

	if (!revenueData) return notFound();
	const revenue = revenueData.transactions.all;

	const lastYearTransactions = filterTransactionsByDateRange(
		revenue,
		LAST_YEAR_START_DATE,
		LAST_YEAR_END_DATE
	);
	const newYearTransactions = filterTransactionsByDateRange(
		revenue,
		NEW_YEAR_START_DATE,
		new Date()
	);

	const lastYearTotals = calculateTransactionTotals(lastYearTransactions);
	const newYearTotals = calculateTransactionTotals(newYearTransactions);
	const revDetails = calculateTransactionTotals(revenue);
	return (
		<div className='p-5 w-full h-full flex flex-col gap-3'>
			<div className='flex justify-between items-center'>
				<div className='shrink-0 grow-0'>Revenue & Stats</div>
			</div>
			<div className='flex flex-col gap-5 '>
				<div className='py-5 flex flex-row flex-wrap'>
					<StatsCard
						desc='All revenue year till date'
						percentage={100}
						type='up'
						title='Total Revenue'
						amount={FNTC.format(revDetails.totalRevenue)}
					>
						<TotalRevenueCharts />
					</StatsCard>
					<StatsCard
						desc='All daily fees year till date'
						percentage={100}
						type='up'
						title='Daily Fees Payment'
						amount={FNTC.format(revDetails.totalDailyFees)}
					>
						<DailyFeesCharts />
					</StatsCard>
					<StatsCard
						desc='All tracker fees year till date'
						percentage={0}
						type='up'
						title='Tracker Fees Payment'
						amount={FNTC.format(revDetails.totalTrackerFees)}
					>
						<FinesPaymentCharts />
					</StatsCard>
					<StatsCard
						desc='All bank charges year till date'
						percentage={100}
						title='Bank Charges'
						amount={FNTC.format(
							revDetails.totalRevenue * BANK_RATE
						)}
						type='up'
					>
						<FinesPaymentCharts />
					</StatsCard>
				</div>
				<SplitPayment />
				<div className='bg-secondary rounded-3xl p-5 flex flex-col mb-20 gap-3'>
					<div className='flex gap-2'>
						<div className='flex text-lg font-bold'>
							{`₦ ${revDetails.totalRevenue.toString()}`}
						</div>
						<Badge
							variant={'awesome'}
							className='gap-1'
						>
							<div className='h-2.5 w-2.5 rotate-180'>
								{downIcon}
							</div>
							{`100%`}
						</Badge>
					</div>
					<RevenueCharts />
				</div>
			</div>
		</div>
	);
}
// ${FNTC.format(revenueData?.chart.total.revenue)}
