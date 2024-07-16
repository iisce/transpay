import { Skeleton } from '@/components/ui/skeleton';
import { TRANSACTION_TYPE } from '@/lib/consts';
import { format, subMonths } from 'date-fns';
import { Suspense } from 'react';
import RevenueChartContainer from './revenue-chart-container';
import RevenueSummary from './revenue-summary';
import SelectDuration from './select-duration';

export default function Revenue({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const today = new Date();
	const oneMonthAgo = subMonths(today, 1);

	const start =
		searchParams['start_date'] ?? format(oneMonthAgo, 'yyyy-MM-dd');
	const end = searchParams['end_date'] ?? format(today, 'yyyy-MM-dd');
	// const type = searchParams['type'] ?? '';
	const duration = searchParams['d'] ?? '1M';

	const revenueDetails = [
		{
			type: TRANSACTION_TYPE.all,
			title: 'Total Revenue',
			description: '(Tracker and Vehicle revenue)',
		},
		{
			type: TRANSACTION_TYPE.daily,
			title: 'Vehicle Revenue',
			description: '(All vehicles revenue)',
		},
		{
			type: TRANSACTION_TYPE.tracker,
			title: 'Tracker Revenue',
			description: '(All trackers revenue)',
		},
	];
	return (
		<div className='p-5 w-full h-full flex flex-col gap-3'>
			<div className='flex justify-between items-center'>
				<div className='shrink-0 grow-0'>Revenue & Stats</div>
				<SelectDuration d={duration} />
			</div>
			<div className='flex flex-col gap-5'>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
					{revenueDetails.map((type, k) => (
						<Suspense
							key={k}
							fallback={
								<Skeleton className='h-32 rounded-2xl shadow-md w-full bg-secondary' />
							}
						>
							<RevenueSummary
								start={start}
								end={end}
								type={type.type}
								title={type.title}
								description={type.description}
							/>
						</Suspense>
					))}
				</div>

				{/* <SplitPayment /> */}
				<div className='bg-secondary rounded-3xl p-5 flex flex-col mb-20 gap-3'>
					<RevenueChartContainer
						start={start}
						end={end}
						title='Revenue Chart'
					/>
				</div>
			</div>
		</div>
	);
}
