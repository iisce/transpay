import React from 'react';
import ActivityCard from '@/components/shared/activity-card';
import { getAllActivities } from '@/lib/controllers/activity.controller';
import ActivityCardGS from '@/components/pages/activities/activity-card-google-style';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { isEmpty } from '@/lib/utils';

export default function ActivityList({
	allActivities,
}: {
	allActivities:
		| {
				rows: IActivity[];
				meta: {
					total: number;
					total_pages: number;
					page: number;
				};
		  }
		| undefined;
}) {
	const empty = !allActivities || allActivities.meta.total < 1;

	const activitiesByDate: Record<string, IActivity[]> | undefined =
		allActivities?.rows.reduce((acc, activity) => {
			const date = new Date(activity.created_at);
			const dateString = format(date, 'yyyy-MM-dd');

			if (!acc[dateString]) {
				acc[dateString] = [];
			}

			acc[dateString].push(activity);
			return acc;
		}, {} as Record<string, IActivity[]>);

	// Convert the organized data into an array for rendering
	const activityGroups = activitiesByDate
		? Object.entries(activitiesByDate).map(([date, activities]) => ({
				date,
				activities,
		  }))
		: [];

	activityGroups.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
	return (
		<div className='px-3 lg:px-5 flex flex-col gap-2'>
			<Accordion
				type='single'
				collapsible
				className='w-full'
			>
				{!empty &&
					activityGroups.map((group) => (
						<AccordionItem
							value={group.date}
							key={group.date}
							className='max-w-3xl'
						>
							<AccordionTrigger>
								{format(
									new Date(group.date),
									'MMMM d, yyyy'
								)}
							</AccordionTrigger>
							<AccordionContent>
								{group.activities.map((activity) => (
									<ActivityCardGS
										key={activity.id}
										id={activity.id}
										name={activity.name}
										activity_id={activity.id}
										time={format(
											new Date(
												activity.created_at
											),
											'h:mm a'
										)}
										date={new Date(
											activity.created_at
										).toLocaleDateString()}
										description={
											activity.description
										}
										user_id={
											activity.meta.user.id
										}
										user_role={
											activity.meta.user.role
										}
									/>
								))}
							</AccordionContent>
						</AccordionItem>
					))}
				{empty && <div>No Activities yet</div>}
			</Accordion>
		</div>
	);
}
