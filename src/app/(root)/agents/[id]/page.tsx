import { UpdateAgentForm } from '@/components/forms/update-agent-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { getAgentById } from '@/lib/controllers/agent-controller';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import ActivityCard from '@/components/shared/activity-card';
import { getAllActivities } from '@/lib/controllers/activity-controller';
import ActivityList from '@/components/pages/activities/activity-list';

export async function generateMetadata({ params }: { params: { id: string } }) {
	const agent = await getAgentById(params.id);
	return {
		title: `Transpay Agent - ${agent?.name.toLocaleUpperCase()}`,
	};
}

export default async function SingularAgent({
	params,
}: {
	params: { id: string };
}) {
	const agent = await getAgentById(params.id);
	if (!agent) return notFound();

	const all_activities = await getAllActivities();
	if (!all_activities) return notFound();
	return (
		<div className='p-3 xs:p-5 gap-5 w-full h-full flex flex-col'>
			<div className='flex justify-between items-center'>
				<div className='shrink-0 grow-0'>
					{agent?.name.toLocaleUpperCase()}
				</div>
				<div className='shrink-0 grow-0'>
					<Button
						asChild
						variant={'default'}
					>
						<div className='justify-start rounded-xl flex gap-2'>
							<Checkbox className='border-secondary text-primary bg-secondary' />
							Make Admin
						</div>
					</Button>
				</div>
			</div>
			<div className='flex flex-col gap-3 xs:gap-5'>
				<div className='space-y-6'>
					<div className='h-12 shrink-0 bg-primary w-full rounded-2xl flex overflow-hidden text-white items-center'>
						<div className='h-12 w-12 bg-black p-3'>
							{addIcon}
						</div>
						<div className='pl-1'>PERSONAL INFORMATION</div>
					</div>
					<UpdateAgentForm agent={agent} />
				</div>
				<div className='flex flex-col gap-2 mb-20'>
					<div className='flex justify-between py-2'>
						<div className='shrink-0 grow-0 text-title1Bold'>
							Recent Activities
						</div>
						<Button
							asChild
							variant='link'
						>
							<Link
								href={`/admins/${agent.agent_id}/activities`}
							>
								See all
							</Link>
						</Button>
					</div>
					<div>
						<Card className='bg-secondary'>
							<ActivityList
								allActivities={all_activities.slice(
									0,
									3
								)}
							/>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
