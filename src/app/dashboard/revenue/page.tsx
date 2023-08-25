'use client';
import { TotalRevenueCharts } from '@/components/shared/chats/total-revenue';
import { RevenueCharts } from '@/components/shared/chats/revenue-chart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { addIcon, filterIcon } from '@/lib/icons';
import React from 'react';
import { DailyFeesCharts } from '@/components/shared/chats/daily-fees';
import { FinesPaymentCharts } from '@/components/shared/chats/fines-and-penalties';
import StatsCard from '@/components/shared/statistics-card';

export default function Revenue() {
	return (
		<div className='p-5 w-full h-full flex flex-col'>
			<div className='flex justify-between'>
				<div className='shrink-0 grow-0'>Revenue & Stats</div>
				<div className='flex gap-4'>
					<div className='shrink-0 grow-0'>
						<Select defaultValue='this-week'>
							<SelectTrigger className=''>
								<div className='mr-2 h-4 w-4 shrink-0'>
									{filterIcon}
								</div>
								<SelectValue placeholder='Theme' />
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
							className='justify-start rounded-xl'
							variant={'default'}
							onClick={() => alert('Hello Button')}
						>
							<div className='mr-2 h-4 w-4 shrink-0'>
								{addIcon}
							</div>
							Generate Report
						</Button>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-5 overflow-y-scroll'>
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
					<StatsCard
						percentage={0}
						title='Fines & Penalties Payment'
						amount='9,090,278'
					>
						<FinesPaymentCharts />
					</StatsCard>
				</div>
				<div className='w-96'>
					<RevenueCharts />
				</div>
			</div>
		</div>
	);
}
