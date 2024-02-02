import ActivityCard from '@/components/shared/activity-card';
import { getAllActivities } from '@/lib/controllers/activity-controller';
import { format } from 'date-fns';
import React from 'react';

export default async function DashboardActivities() {
	const all_activities = await getAllActivities();
	all_activities &&
		all_activities.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
		);
	return (
		<div className='rounded-xl border bg-secondary flex flex-col gap-3 p-2 h-full'>
			<div className='text-2xl px-3'>Activities</div>
			<div className='grid gap-3'>
				{all_activities &&
					all_activities.splice(0, 3).map((activity, k) => (
						<ActivityCard
							key={k}
							id={activity.id}
							name={activity.name}
							activity_id={activity.activity_id}
							time={format(
								new Date(activity.createdAt),
								'h:mm a'
							)}
							date={new Date(
								activity.createdAt
							).toLocaleDateString()}
							description={activity.description}
							user_id={activity.user_id}
							user_role={activity.user_role}
						/>
					))}
			</div>
		</div>
	);
}
