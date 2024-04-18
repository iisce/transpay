import ActivityCard from '@/components/shared/activity-card';
import { getDashboardActivities } from '@/lib/get-data';

export default async function DashboardActivities() {
	const all_activities = await getDashboardActivities('3');
	return (
		<div className='rounded-xl border bg-secondary flex flex-col gap-3 p-2 h-full'>
			<div className='text-2xl px-3'>Activities</div>
			<div className='grid gap-3'>
				{all_activities &&
					all_activities.map((activity, k) => (
						<ActivityCard
							key={k}
							id={activity.id}
							name={activity.name}
							activity_id={activity.id}
							description={activity.description}
							// time={format(
							// 	new Date(activity.createdAt),
							// 	'h:mm a'
							// )}
							// date={new Date(
							// 	activity.createdAt
							// ).toLocaleDateString()}
						/>
					))}
			</div>
		</div>
	);
}
