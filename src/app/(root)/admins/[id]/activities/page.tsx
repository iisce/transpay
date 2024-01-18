import { Card } from '@/components/ui/card';
import React from 'react';
import ActivityCard from '@/components/shared/activity-card';
import { getAllActivities } from '@/lib/controllers/activity-controller';
import ActivityList from '@/components/pages/activities/activity-list';
import { notFound } from 'next/navigation';

export default async function Activity() {
	const ACTIVITIES = await getAllActivities();
	if (!ACTIVITIES) return notFound();
	return (
		<div className='w-full h-[90svh] flex flex-col gap-3 mb-8 p-2 xs:p-5 '>
			<div className='flex flex-col gap-2 mb-20'>
				<div className='flex justify-between py-2'>
					<div className='shrink-0 grow-0 text-title1Bold'>
						Activity History
					</div>
				</div>
				<Card className='bg-secondary'>
					<ActivityList allActivities={ACTIVITIES} />
				</Card>
			</div>
		</div>
	);
}
