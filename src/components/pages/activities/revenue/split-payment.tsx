import { Separator } from '@/components/ui/separator';
import { AIRS, BANK_RATE, FNTC, TRANSPAY } from '@/lib/consts';
import { getRevenueStats } from '@/lib/controllers/revenue.controller';
import React from 'react';

export default async function SplitPayment() {
	const revenueData = await getRevenueStats();
	if (!revenueData) return <></>;

	// const totRev = revenueData?.total.revenue;
	const totRev = revenueData;
	const totBc = totRev * BANK_RATE;
	// const totBc = 35.8;
	const totSplitable = totRev - totBc;
	return (
		<div className='w-full grid gap-5 px-5'>
			<div className='flex flex-col items-start gap-1'>
				<div className='font-bold text-2xl uppercase text-center'>
					Total Revenue Split
				</div>
				<Separator />
			</div>
			<div className='flex gap-5'>
				<div className='flex flex-col gap-1 text-2xl '>
					<div className='underline'>Total Sharable</div>
					<div className=' text-3xl'>{`${FNTC.format(
						totSplitable
					)} `}</div>
				</div>
				<Separator orientation='vertical' />
				<div className='flex flex-col gap-1 text-2xl'>
					<div className='underline'>AIRS (92%)</div>
					<div className=' text-3xl'>{`${FNTC.format(
						totSplitable * AIRS
					)}`}</div>
				</div>
				<Separator orientation='vertical' />
				<div className='flex flex-col gap-1 text-2xl'>
					<div className='underline'>Transpay (8%)</div>
					<div className=' text-3xl'>{`${FNTC.format(
						totSplitable * TRANSPAY
					)}`}</div>
				</div>
				<Separator orientation='vertical' />
				<div className='flex flex-col gap-1 text-2xl '>
					<div className='underline'>Total Bank Charges</div>
					<div className='text-destructive-foreground text-3xl'>{`${FNTC.format(
						totBc
					)} `}</div>
				</div>
				<Separator orientation='vertical' />
				<div className='flex flex-col gap-1 text-2xl text-awesome-foreground'>
					<div className='underline'>Total Revenue</div>
					<div className=' text-3xl'>{`${FNTC.format(
						totRev
					)} `}</div>
				</div>
			</div>
			<Separator />
		</div>
	);
}

// {`₦ ${revenueData?.chart.total.revenue}`}
