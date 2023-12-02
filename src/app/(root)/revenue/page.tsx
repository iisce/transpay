// 'use client';
import { TotalRevenueCharts } from '@/components/shared/chats/total-revenue';
import { RevenueCharts } from '@/components/shared/chats/revenue-chart';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { addIcon, downIcon, filterIcon } from '@/lib/icons';
import React from 'react';
import { DailyFeesCharts } from '@/components/shared/chats/daily-fees';
import { FinesPaymentCharts } from '@/components/shared/chats/fines-and-penalties';
import StatsCard from '@/components/shared/statistics-card';
import { Badge } from '@/components/ui/badge';
import { getRevenueStats } from '@/lib/controllers/revenue-controller';
import { REVENUE_CHART_DATA } from '../../../../data';

export default async function Revenue() {
	// const revenue = await getRevenueStats();
	const revenue = REVENUE_CHART_DATA;
	console.log(revenue);
	return (
		<div className='p-5 w-full h-full flex flex-col gap-3'>
			<div className='flex justify-between items-center'>
				<div className='shrink-0 grow-0'>Revenue & Stats</div>
				<div className='flex gap-4'>
					<div className='shrink-0 grow-0'>
						<Select defaultValue='this-week'>
							<SelectTrigger className=''>
								<div className='mr-2 h-4 w-4 shrink-0'>
									{filterIcon}
								</div>
								<div className='hidden xs:flex'>
									<SelectValue placeholder='Theme' />
								</div>
							</SelectTrigger>
							<SelectContent className='w-40'>
								<SelectItem value='this-week'>
									This Week
								</SelectItem>
								<SelectItem value='last-week'>
									Last Week
								</SelectItem>
								<SelectItem value='this-month'>
									This Month
								</SelectItem>
								<SelectItem value='last-month'>
									Last Month
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className='shrink-0 grow-0'>
						<Button
							className='justify-start rounded-xl h-12'
							variant={'default'}
							// onClick={() => console.log('Hello Button')}
						>
							<div className='h-4 w-4 shrink-0'>
								{addIcon}
							</div>
							<div className='ml-2 hidden xs:flex'>
								Generate Report
							</div>
						</Button>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-5 '>
				<div className=' py-5 flex flex-row flex-wrap'>
					<StatsCard
						percentage={9.26}
						type='up'
						title='Total Revenue'
						amount='21,974,278'
					>
						<TotalRevenueCharts />
					</StatsCard>
					<StatsCard
						percentage={4.72}
						type='down'
						title='Daily Fees Payment'
						amount='7,500,278'
					>
						<DailyFeesCharts />
					</StatsCard>
					{/* <StatsCard
						percentage={0}
						title='Fines & Penalties Payment'
						amount='9,090,278'
					>
						<FinesPaymentCharts />
					</StatsCard> */}
					<StatsCard
						percentage={1}
						title='Bank Charges'
						amount='90,278'
						type='up'
					>
						<FinesPaymentCharts />
					</StatsCard>
				</div>
				<div className='bg-secondary rounded-3xl p-5 flex flex-col mb-20 gap-3'>
					<div className='flex justify-between items-center'>
						<div className=''>Net</div>
						<div className='flex'>
							<div className='p-1'>1D</div>
							<div className='p-1'>1D</div>
							<div className='p-1'>1D</div>
							<div className='p-1'>1D</div>
							<div className='p-1'>1D</div>
						</div>
					</div>
					<div className='flex gap-2'>
						<div className='flex text-lg font-bold'>
							₦1,783,933
						</div>
						<Badge
							variant={'awesome'}
							className='gap-1'
						>
							<div className='h-2.5 w-2.5'>{downIcon}</div>
							{`9.54%`}
						</Badge>
					</div>
					<RevenueCharts />
				</div>
			</div>
		</div>
	);
}
