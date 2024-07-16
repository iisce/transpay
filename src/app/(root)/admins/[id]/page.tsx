import { UpdateAdminForm } from '@/components/forms/update-admin-form';
import ActivityList from '@/components/pages/activities/activity-list';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getAllActivities } from '@/lib/controllers/activity.controller';
import { getUser } from '@/lib/controllers/users.controller';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
	const admin = await getUser(params.id);
	return {
		title: `Transpay Admin - ${admin?.name.toLocaleUpperCase()}`,
	};
}

export default async function SingularAdmin({
	params,
}: {
	params: { id: string };
}) {
	const all_activities = await getAllActivities();
	const admin = await getUser(params.id);

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
									href={`/admins/${admin.id}/activities`}
								>
									See all
								</Link>
							</Button>
						</div>
						<div>
							<Card className='bg-secondary'>
								<ActivityList
									allActivities={all_activities}
									page={'1'}
									limit={'5'}
								/>
							</Card>
						</div>
					</div>
				</div>
			</div>
		);
}
