import React from 'react';
import { ACTIVITIES } from '../../../../data';
import ActivityCard from '@/components/shared/activity-card';

export default function Activities() {
	return (
		<div>
			{ACTIVITIES.map((activity, k) => (
				<ActivityCard
					key={k}
					id={activity.id}
					name={activity.name}
					time={activity.time}
					date={activity.date}
				/>
			))}
		</div>
	);
}
