import { UpdateAdminForm } from '@/components/forms/update-admin-form';
import { Button } from '@/components/ui/button';
import { getAdminById } from '@/lib/controllers/admin-controller';
import { addIcon } from '@/lib/icons';
import { notFound } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import ActivityCard from '@/components/shared/activity-card';
import { ACTIVITIES } from '../../../../../data';
import { Card } from '@/components/ui/card';

export async function generateMetadata({ params }: { params: { id: string } }) {
	const admin = await getAdminById(params.id);
	return {
		title: `Transpay Admin - ${admin?.name.toLocaleUpperCase()}`,
	};
}

export default async function SingularAdmin({
	params,
}: {
	params: { id: string };
}) {
	const admin = await getAdminById(params.id);
	if (!admin) return notFound();
	else
		return (
			<div className='p-3 xs:p-5 gap-5 w-full h-full flex flex-col'>
				<div className='flex flex-col gap-3 xs:gap-5 '>
					<div className='space-y-6'>
						<div className='h-12 shrink-0 bg-primary w-full rounded-2xl flex overflow-hidden text-white items-center'>
							<div className='h-12 w-12 bg-black p-3'>
								{addIcon}
							</div>
							<div className='pl-1'>
								PERSONAL INFORMATION
							</div>
						</div>
						<UpdateAdminForm admin={admin} />
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
									href={`/admins/${admin.admin_id}/activities`}
								>
									See all
								</Link>
							</Button>
						</div>
						<div>
							<Card className='bg-secondary'>
								{ACTIVITIES.slice(0, 3).map(
									(activity, k) => (
										<ActivityCard
											key={k}
											id={activity.id}
											name={activity.name}
											activity_id={
												activity.activity_id
											}
											time={activity.time}
											date={activity.date}
											description={
												activity.description
											}
										/>
									)
								)}
							</Card>
						</div>
					</div>
				</div>
			</div>
		);
}
