import { Card } from '@/components/ui/card';
import React from 'react';
import { ACTIVITIES } from '../../../../../../data';
import ActivityCard from '@/components/shared/activity-card';

export default function Activity() {
	return (
		<div className='w-full h-[90svh] flex flex-col gap-3 mb-8 p-2 xs:p-5 '>
			<div className='flex flex-col gap-2 mb-20'>
				<div className='flex justify-between py-2'>
					<div className='shrink-0 grow-0 text-title1Bold'>
						Activity History
					</div>
				</div>
				<Card className='bg-secondary'>
					{ACTIVITIES.map((activity, k) => (
						<ActivityCard
							key={k}
							id={activity.id}
							name={activity.name}
							activity_id={activity.activity_id}
							time={activity.time}
							date={activity.date}
							description={activity.description}
						/>
					))}
				</Card>
			</div>

			{/* <div className='bg-red-200 rounded-3xl h-full w-full p-5 grid grid-cols-12 gap-5'>
				<div className='col-span-9 flex flex-col gap-5'>
					<div className='bg-red-900 text-white rounded-2xl h-48 shrink-0'>
						First Div
					</div>
					<div className='h-24 grid grid-cols-4 gap-5  shrink-0'>
						<div className='rounded-xl bg-red-700'>Div 1</div>
						<div className='rounded-xl bg-red-700'>Div 2</div>
						<div className='rounded-xl bg-red-700'>Div 3</div>
						<div className='rounded-xl bg-red-700'>Div 4</div>
					</div>
					<div className='grid grid-cols-9 gap-5 h-full'>
						<div className='bg-red-300 col-span-6 rounded-xl'>
							Div 1
						</div>
						<div className='bg-red-300 col-span-3 rounded-xl'>
							Div 2
						</div>
					</div>
				</div>
				<div className='bg-red-400 rounded-3xl col-span-3 p-5'>
					Recent
				</div>
			</div> */}
		</div>
	);
}
