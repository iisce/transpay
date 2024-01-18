import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { notificationIcon } from '@/lib/icons';
import ActivityCard from './activity-card';
import ActivityList from '../pages/activities/activity-list';
import { getAllActivities } from '@/lib/controllers/activity-controller';
import { notFound } from 'next/navigation';

export async function Notification() {
	const ACTIVITIES = await getAllActivities();
	if (!ACTIVITIES) return notFound();
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
				// forceMount
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
					<ActivityList allActivities={ACTIVITIES} />
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
