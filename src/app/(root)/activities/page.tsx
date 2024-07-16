import { getAllActivities } from '@/lib/controllers/activity.controller';
import ActivityList from '@/components/pages/activities/activity-list';

export default async function Activities({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const page = searchParams['page'] ?? '1';
	const limit = searchParams['limit'] ?? '15';
	const all_activities = await getAllActivities({
		page: page,
		limit: limit,
	});

	return (
		<ActivityList
			allActivities={all_activities}
			page={page}
			limit={limit}
		/>
	);
}
