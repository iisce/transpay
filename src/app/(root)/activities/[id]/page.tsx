import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { unslugify } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { getAllActivities } from '@/lib/controllers/activity-controller';

export default async function Activity({ params }: { params: { id: string } }) {
	const all_activities = await getAllActivities();

	const activity = all_activities
		? all_activities.find(
				(activity) => activity.activity_id === params.id
		  )
		: undefined;
	if (!activity) return notFound();
	return (
		<div className='grid place-items-center w-full h-full'>
			<div className='flex flex-col items-center justify-center'>
				<div className='text-2xl mb-10'>
					Activity {unslugify(activity?.name)}
				</div>
				<div className=''>
					<div className=''>Activity: {activity?.name}</div>
					<div className=''>
						Activity ID: {activity?.activity_id}
					</div>
					<div className=''>
						Activity Description: {activity?.description}
					</div>
					<div className=''>
						Activity Date:{' '}
						{new Date(
							activity.createdAt
						).toLocaleDateString()}
					</div>
					<div className=''>
						Activity Time:{' '}
						{new Date(
							activity.createdAt
						).toLocaleTimeString()}
					</div>
				</div>
				<Button
					asChild
					className='w-full mt-10 uppercase'
				>
					<Link href='/activities'>Back To Activities</Link>
				</Button>
			</div>
		</div>
	);
}
