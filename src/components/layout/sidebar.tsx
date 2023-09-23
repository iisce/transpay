'use client';
import React from 'react';
import { Button } from '../ui/button';
import { SIDEBAR_LINKS } from '@/lib/consts';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '../dark-mode-toggle';
import { Separator } from '../ui/separator';

export default function Sidebar({ pages }: { pages: IPage[] }) {
	const pathname = usePathname();
	console.log('Pages from side bar', pages);
	return (
		<div className='h-full flex-col px-5 min-w-min bg-secondary hidden sm:flex justify-between'>
			<div className='flex flex-col gap-3 pt-10'>
				{/* {pages.map((link, i) => ( */}
				{SIDEBAR_LINKS.map((link, i) => (
					<Button
						key={i}
						className='justify-start rounded-xl'
						asChild
						variant={
							pathname === link.href ? 'default' : 'ghost'
						}
					>
						<Link
							href={link.href}
							className='shrink-0 whitespace-nowrap'
						>
							<div className='mr-2 h-4 w-4 shrink-0'>
								{link.icon}
							</div>
							{link.title}
						</Link>
					</Button>
				))}
				<Separator />
				<ModeToggle />
			</div>
		</div>
	);
}
