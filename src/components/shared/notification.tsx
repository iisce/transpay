import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { notificationIcon } from '@/lib/icons';
import { ACTIVITIES } from '../../../data';
import ActivityCard from './activity-card';

export function Notification() {
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
				forceMount
			>
				<DropdownMenuLabel className='font-normal'>
					<Link
						href={'/dashboard/activities'}
						className='text-sm font-medium leading-none'
					>
						All Activities
					</Link>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{ACTIVITIES.map((activity, k) => (
						<DropdownMenuItem
							className=''
							asChild
							key={k}
						>
							<Link
								href={`dashboard/activities/${activity.id}`}
							>
								<ActivityCard
									key={k}
									id={activity.id}
									name={activity.name}
									time={activity.time}
									date={activity.date}
								/>
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
