'use client';
import React from 'react';
import Link from 'next/link';
import { NavigationMenuLink } from '@radix-ui/react-navigation-menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { notificationIcon, searchIcon } from '@/lib/icons';
import { UserNav } from './user-nav-bar';

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className='text-sm font-medium leading-none'>
						{title}
					</div>
					<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';

export default function NavBar() {
	return (
		<div className='h-16 w-full bg-secondary px-5'>
			<div className='flex items-center justify-between gap-5 h-full'>
				<Link
					href={'/'}
					className='min-w-[180px] '
				>
					<Image
						src={'/logo.png'}
						height={30}
						width={150}
						className='shrink-0'
						alt='Transpay Logo'
					/>
				</Link>
				<div className='w-full hidden sm:block'>
					<div className='max-w-[500px] relative flex  items-center justify-start'>
						<div className='h-6 w-6 left-2 opacity-60 shrink-0 absolute'>
							{searchIcon}
						</div>
						<Input
							className='pl-10'
							placeholder='Search anything here'
						/>
					</div>
				</div>
				<div className='flex'>
					<Button variant='ghost'>
						<div className='h-6 w-6 text-primary'>
							{notificationIcon}
						</div>
					</Button>
					<UserNav />
				</div>
			</div>
		</div>
	);
}
