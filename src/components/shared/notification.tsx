import { getAllActivities } from '@/lib/controllers/activity.controller';
import { notificationIcon } from '@/lib/icons';
import Link from 'next/link';
import ActivityList from '../pages/activities/activity-list';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export async function Notification() {
	const all_activities = await getAllActivities();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='h-8 w-8 text-primary'>
					{notificationIcon}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-72'
				align='end'
			>
				<DropdownMenuLabel className='font-normal'>
					<Link
						href={'/activities'}
						className='text-sm font-medium leading-none'
					>
						All Activities
					</Link>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<ActivityList allActivities={all_activities} />
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
