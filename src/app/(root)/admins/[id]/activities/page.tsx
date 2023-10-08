import { Card } from '@/components/ui/card';
import React from 'react';
import { ACTIVITIES } from '../../../../../../data';
import ActivityCard from '@/components/shared/activity-card';

export default function Activity() {
	return (
		<div className='w-full flex flex-col gap-3 mb-8 p-2 xs:p-5 '>
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
							time={activity.time}
							date={activity.date}
						/>
					))}
				</Card>
			</div>
		</div>
	);
}
