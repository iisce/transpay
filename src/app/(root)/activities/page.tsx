import { getAllActivities } from '@/lib/controllers/activity-controller';
import ActivityList from '@/components/pages/activities/activity-list';
import { notFound } from 'next/navigation';

export default async function Activities() {
	const all_activities = await getAllActivities();
	if (!all_activities) return notFound();

	return <ActivityList allActivities={all_activities} />;
}
