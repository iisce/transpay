import React from 'react';
import { ACTIVITIES } from '../../../../data';
import ActivityCard from '@/components/shared/activity-card';

export default function Activities() {
	return (
		<div className='px-3 lg:px-5 flex flex-col gap-2'>
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
		</div>
	);
}
