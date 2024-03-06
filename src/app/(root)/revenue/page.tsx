// 'use client';
import SplitPayment from '@/components/pages/activities/revenue/split-payment';
import { Badge } from '@/components/ui/badge';
import { getRevenueStats } from '@/lib/controllers/revenue-controller';
import { downIcon } from '@/lib/icons';
import { notFound } from 'next/navigation';
import RevenueSummary from './revenue-summary';

export default async function Revenue() {
	const revenueData = await getRevenueStats();

	if (!revenueData) return notFound();
	// const revenue = revenueData.transactions.all;

	// const lastYearTransactions = filterTransactionsByDateRange(
	// 	revenue,
	// 	LAST_YEAR_START_DATE,
	// 	LAST_YEAR_END_DATE
	// );
	// const newYearTransactions = filterTransactionsByDateRange(
	// 	revenue,
	// 	NEW_YEAR_START_DATE,
	// 	new Date()
	// );

	// const lastYearTotals = calculateTransactionTotals(lastYearTransactions);
	// const newYearTotals = calculateTransactionTotals(newYearTransactions);
	// const revDetails = calculateTransactionTotals(revenue);
	return (
		<div className='p-5 w-full h-full flex flex-col gap-3'>
			<div className='flex justify-between items-center'>
				<div className='shrink-0 grow-0'>Revenue & Stats</div>
			</div>
			<div className='flex flex-col gap-5 '>
				<RevenueSummary />
				<SplitPayment />
				<div className='bg-secondary rounded-3xl p-5 flex flex-col mb-20 gap-3'>
					<div className='flex gap-2'>
						{/* <div className='flex text-lg font-bold'>
							{`₦ ${revDetails.totalRevenue.toString()}`}
						</div> */}
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
					{/* <RevenueCharts /> */}
				</div>
			</div>
		</div>
	);
}
// ${FNTC.format(revenueData?.chart.total.revenue)}
