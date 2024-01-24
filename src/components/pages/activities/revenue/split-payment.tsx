import { Separator } from '@/components/ui/separator';
import { getRevenueStats } from '@/lib/controllers/revenue-controller';
import React from 'react';

export default async function SplitPayment() {
	const revenueData = await getRevenueStats();
	if (!revenueData) return <></>;

	const totRev = revenueData?.chart.total.revenue;
	// const totBc = totRev * 0.043;
	const totBc = 35.8;
	const totSplitable = totRev - totBc;
	return (
		<div className='w-full grid gap-5 px-5'>
			<div className='flex flex-col items-start gap-1'>
				<div className='font-bold text-2xl uppercase text-center'>
					Total Revenue
				</div>
				<div className='font-bold text-awesome-foreground text-4xl'>{`₦${revenueData?.chart.total.revenue}`}</div>
			</div>
			<Separator />
			<div className='flex gap-5'>
				<div className='flex flex-col gap-1 text-2xl '>
					<div className='underline'>Total Sharable</div>
					<div className=' text-3xl'>{`₦ ${totSplitable.toFixed(
						2
					)} `}</div>
				</div>
				<Separator orientation='vertical' />
				<div className='flex flex-col gap-1 text-2xl'>
					<div className='underline'>AIRS (92%)</div>
					<div className=' text-3xl'>{`₦ ${(
						totSplitable * 0.92
					).toFixed(2)} `}</div>
				</div>
				<Separator orientation='vertical' />
				<div className='flex flex-col gap-1 text-2xl'>
					<div className='underline'>Transpay (8%)</div>
					<div className=' text-3xl'>{`₦ ${(
						totSplitable * 0.08
					).toFixed(2)} `}</div>
				</div>
				<Separator orientation='vertical' />
				<div className='flex flex-col gap-1 text-2xl '>
					<div className='underline'>Total Bank Charges</div>
					<div className='text-destructive-foreground text-3xl'>{`₦ 35.8 `}</div>
				</div>
			</div>
			<Separator />
		</div>
	);
}
