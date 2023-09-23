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
import Link from 'next/link';
import { MANAGE_SIDEBAR_LINKS, SIDEBAR_LINKS } from '@/lib/consts';
import { USER } from '../../../data';
import { getInitials } from '@/lib/utils';
import { ModeToggle } from '../dark-mode-toggle';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export function UserNav({ pages }: { pages?: IPage[] }) {
	console.log('From user Navigation....', pages);
	const pathName = usePathname();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='flex gap-3 cursor-pointer'>
					<Button
						variant='destructive'
						className='relative h-8 w-8 rounded-full'
					>
						<Avatar className='h-9 w-9'>
							<AvatarImage
								src={USER.user.avatar}
								alt={USER.user.name}
							/>
							<AvatarFallback>
								{getInitials(USER.user.name)}
							</AvatarFallback>
						</Avatar>
					</Button>
					<div className='hidden sm:flex w-32 flex-col'>
						<div className='text-xs font-bold'>
							{USER.user.name}
						</div>
						<div className='text-xs text-primary capitalize'>
							{USER.user.role}
						</div>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-56'
				align='end'
				forceMount
			>
				<DropdownMenuLabel className='font-normal'>
					<Link
						href='/manage/profile'
						className='flex flex-col space-y-1'
					>
						<p className='text-sm font-medium leading-none'>
							{USER.user.name}
						</p>
						<p className='text-xs leading-none text-muted-foreground'>
							ap.oyeniran@gmail.com
						</p>
					</Link>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{pathName !== '/manage'
						? SIDEBAR_LINKS.map((link, k) => (
								<DropdownMenuItem
									className='sm:hidden'
									asChild
									key={k}
								>
									<Link href={link.href}>
										{link.title}
										<DropdownMenuShortcut className='h-4 w-4'>
											{link.icon}
										</DropdownMenuShortcut>
									</Link>
								</DropdownMenuItem>
						  ))
						: MANAGE_SIDEBAR_LINKS.map((link, k) => (
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
					<DropdownMenuItem asChild>
						<Link href='/manage'>
							Manage My Account
							<DropdownMenuShortcut className='h-4 w-4'></DropdownMenuShortcut>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => signOut()}>
					Log out
				</DropdownMenuItem>
				<div className='sm:hidden'>
					<DropdownMenuSeparator />
					<ModeToggle />
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
