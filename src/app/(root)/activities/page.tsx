import { getAllActivities } from '@/lib/controllers/activity.controller';
import ActivityList from '@/components/pages/activities/activity-list';

export default async function Activities() {
	const all_activities = await getAllActivities();

	return <ActivityList allActivities={all_activities} />;
}
