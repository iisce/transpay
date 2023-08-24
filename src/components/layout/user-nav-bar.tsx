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
import { Button } from '../ui/button';
import { ModeToggle } from '../dark-mode-toggle';
import { agentsIcon } from '@/lib/icons';
import Link from 'next/link';
import { SIDEBAR_LINKS } from '@/lib/consts';

export function UserNav() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='destructive'
					className='relative h-8 w-8 rounded-full'
				>
					<Avatar className='h-9 w-9'>
						<AvatarImage
							src='https://github.com/shadcn.png'
							alt='@shadcn'
						/>
						<AvatarFallback>SR</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-56'
				align='end'
				forceMount
			>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>
							Oyeniran Ayobami Paul
						</p>
						<p className='text-xs leading-none text-muted-foreground'>
							ap.oyeniran@gmail.com
						</p>
					</div>
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
					<DropdownMenuItem>Settings</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Log out</DropdownMenuItem>
				{/* <DropdownMenuSeparator />
				<DropdownMenuItem>
					<ModeToggle />
				</DropdownMenuItem> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
