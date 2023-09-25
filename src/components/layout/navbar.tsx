import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '../ui/input';
import { searchIcon } from '@/lib/icons';
import { UserNav } from '../shared/user-nav-bar';
import { Notification } from '../shared/notification';
import { getUserMe } from '@/lib/get-data';

export default async function NavBar() {
	const user = await getUserMe();
	return (
		<div className='h-16 w-full bg-secondary px-5 shrink-0'>
			<div className='flex items-center justify-between h-full gap-5'>
				<Link
					href={'/'}
					className='min-w-[155px] '
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
							className='pl-10 bg-background'
							placeholder='Search anything here'
						/>
					</div>
				</div>
				<div className='flex gap-3 items-center text-primary-700'>
					<Notification />
					{user && <UserNav user={user} />}
				</div>
			</div>
		</div>
	);
}
