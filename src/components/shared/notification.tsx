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
import { SIDEBAR_LINKS } from '@/lib/consts';
import { notificationIcon } from '@/lib/icons';

export function Notification() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='h-8 w-8 text-primary'>
					{notificationIcon}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-56'
				align='end'
				forceMount
			>
				<DropdownMenuLabel className='font-normal'>
					<p className='text-sm font-medium leading-none'>
						All Notifications
					</p>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{SIDEBAR_LINKS.map((link, k) => (
						<DropdownMenuItem
							className='sm:hidden'
							asChild
							key={k}
						>
							<Link href={link.href}>
								{link.name}
								<DropdownMenuShortcut className='h-4 w-4'>
									{link.icon}
								</DropdownMenuShortcut>
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
